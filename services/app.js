'use strict';

const config = require('config');
const restify = require('restify');
const diretory = require('require-dir');

const server = restify.createServer({
    name: 'services',
    version: '1.0.0'
});

const auth = require('./src/component/auth.js');

server.use(restify.plugins.throttle({
    burst: 100, // Max 10 concurrent requests (if tokens)
    rate: 2,    // Steady state: 2 request / 1 seconds
    ip: true    // throttle per IP
}));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());

server.use(async (req, res, next) => {
    // Identifica se o usuário tem acesso
    req.user = {};
    try {
        if (req.headers['x-access-token']) {
            // Utiliza uma função para autenticar pelo x-access-token
        } else if (req.headers['x-api-key']) {
            // Utiliza uma função para autenticar pela x-api-key
        } else if (
            req.authorization
            && req.authorization.basic
            && req.authorization.basic.username
            && req.authorization.basic.password
        ) {
            // Utiliza uma função para autenticar pelo authorization basic
        }
    } catch (e) {
        console.log('Auth error:', e);
        req.user = {}; // Invalida o login
    }
    next();
});

const router = new (require('restify-router')).Router();

const routes = diretory('./src/routes');
for (const route in routes) {
    if (route === 'index') {
        router.add('/', routes[route]);
    } else {
        router.add(`/${route}`, routes[route]);
    }
}

router.applyRoutes(server);

server.listen(config.get('server.port'), config.get('server.bind'), function () {
    console.log(server.name, 'listening at', server.url);
});

server.on('pre', (req, res) => {
    req.env = process.env.NODE_ENV;
    // Identificar IP do usuário, tanto utilizando proxy/waf/cdn ou conexão direta
    req.ip = (req.connection.remoteAddress || '').trim();
    if (req.headers['x-real-ip'] && ['127.0.0.1', '::ffff:127.0.0.1'].includes(req.ip)) {
        req.ip = req.headers['x-real-ip'];
        if (req.headers['x-forwarded-for']) {
            const forwarded = req.headers['x-forwarded-for'].split(',').reverse();
            for (const f in forwarded) {
                if (forwarded[f].trim() !== req.headers['x-real-ip']) {
                    req.ip = forwarded[f].trim();
                    break;
                }
            }
        }
    }
});

server.on('after', restify.plugins.metrics({ server: server }, (err, metrics, req, res, route)  => {
    if (err) {
        console.log(`[ERROR] after (${metrics.path}):`, err);
    }
    const resp = {};
    if (metrics) {
        resp.metrics = metrics;
    }
    if (err) {
        resp.error = err;
    }
    if (res._header) {
        resp.headers = res._header;
    }
    if (res._body) {
        resp.body = res._body;
    }
    // Registro de log das requisições
}));

server.on('InternalServer', (req, res, err, callback) => {
    if (err) {
        console.log('[ERROR] InternalServer:', err);
    }
    return callback();
});

server.on('restifyError', (req, res, err, callback) => {
    if (err) {
        console.log('[ERROR] restifyError:', err);
    }
    return callback();
});

server.on('uncaughtException', (req, res, route, err) => {
    if (err) {
        console.log('[ERROR] uncaughtException:', err);
    }
});

// CronJobs Service
var CronJob = require('cron').CronJob;
const crons = diretory('./crons');
for (const c in crons) {
    try {
        const cronFunc = crons[c];
        if (cronFunc.executionTime) {
            var job = new CronJob(cronFunc.executionTime, () => {
                try {
                    cronFunc.run();
                } catch (e) {
                    console.log('[JOB RUN ERROR]', e);
                }
            }, null, true, 'America/Sao_Paulo');
            job.start();
        }
    } catch (e) {
        console.log('[JOB ERROR]', e);
    }
}
