/* 
Rutas de Usuarios / Auth
host + /api/auth
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validartJWT } = require('../middleware/validar-jwt');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
// const { Router } = require('express');
// const router = Router();


router.post(
    '/new',
    [// middlewares de express-validator
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [// middleware
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validartJWT, revalidarToken);

module.exports = router;