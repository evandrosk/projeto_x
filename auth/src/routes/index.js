'use strict';

const router = new (require('restify-router')).Router();
const authController = require('../controllers/auth.js');

router.get('/', async (req, res, next) => {
    res.json({
        msg: 'Bem vindo ao Auth'
    });
    next();
});

router.get('/robots.txt', async (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    // eslint-disable-next-line quotes
    res.send(200, `User-agent: *\nDisallow: /`);
    next();
});

router.get('/favicon.ico', async (req, res, next) => {
    res.json(404, { error: true, message: 'Arquivo não encontrado.' });
    next();
    return;
    res.setHeader('Content-Type', 'image/webp');
    // eslint-disable-next-line max-len
    res.send('... base64 image ...');
    next();
});

router.post('/login', async (req, res, next) => {
    res.json(401, { error: true, message: 'Sessão inválida.' });
    next();
});

router.post('/forgot', async (req, res, next) => {
    res.json(401, { error: true, message: 'Sessão inválida.' });
    next();
});

router.get('/check', async (req, res, next) => {
    res.json(401, { error: true, message: 'Sessão inválida.' });
    next();
});

router.get('/history', async (req, res, next) => {
    res.json(401, { error: true, message: 'Sessão inválida.' });
    next();
});

module.exports = router;
