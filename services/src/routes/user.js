'use strict';

const router = new (require('restify-router')).Router();
const authComponent = require('../component/auth.js');
const scoreController = require('../controller/score.js');

routeConcint.use(async (req, res, next) => {
    if (!req.user) {
        res.json(401, {
            erro: true,
            messagem: 'Você deve está logado com um usuário válido.'
        });
        return next(false);
    }
    next();
});

router.get('/', async (req, res, next) => {
    res.json({
        msg: 'Bem vindo aos dados do Usuário'
    });
    next();
});

module.exports = router;
