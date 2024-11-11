const { response } = require('express');
const usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {
    // console.log(req.body)
    const { email, password } = req.body;
    try {
        let user = await usuario.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        user = new usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        return res.status(201).json({
            ok: true,
            msg: 'registro',
            uid: user.id,
            name: user.name
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin',
        });
    }


}

const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        console.log('Email recibido:', email);

        const user = await usuario.findOne({ email });
        console.log('Usuario encontrado:', user);

        if ( !user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );
        console.log('Password validado:', validPassword);

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( user.id, user.name );
        console.log('Token generado:', token);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log('Error en loginUsuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}



const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;
    const newToken = await generarJWT( uid, name );
    // console.log(req)
    res.json({
        ok: true,
        msg: 'review token',
        uid: uid,
        name: name,
        token: newToken
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}