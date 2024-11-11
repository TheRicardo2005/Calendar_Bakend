/*
    localhost:3001/api/events
*/
const { Router } = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validartJWT } = require('../middleware/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();


router.use( validartJWT) ;

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Eliminar evento
router.delete('/:id', eliminarEvento);


module.exports = router;