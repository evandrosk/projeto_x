'use strict';

const router = new (require('restify-router')).Router();

router.get('/', async (req, res, next) => {
    res.json({
        msg: 'Bem vindo ao Services'
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

module.exports = router;
