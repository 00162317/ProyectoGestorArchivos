const mongoose = require('mongoose'); //libreria para el manejo a la conexion de bases de datos
const User = require("../models/users"); //modelo usuarios.
const AuthController = {}; // objeto que tendra la logica de nuestra web
const bcrypt = require('bcrypt'); //libreria para encriptar
const fs = require('fs');

/*nos devuelve la vista signin que es para ingresar al sistema */
AuthController.inicio = function (req, res, next) {
    res.render('inicioNormal'); //
}

/*nos devuelve la vista signin que es para ingresar al sistema */
AuthController.login = function (req, res, next) {
    res.render('login'); //
}

/*nos devuelve la vista signiup para crear al usuario*/
AuthController.create = function (req, res, next) {
    res.render('registrar')
}

/*nos devuelve la vista pedirCorreo para crear al usuario*/
AuthController.formCorreo = function (req, res, next) {
    res.render('pedirCorreo')
}

/*nos devuelve la vista pedriClave para crear al usuario*/
AuthController.formClave = function (req, res, next) {
    res.render('pedirClave')
}

/*nos devuelve la vista cambiarContra para crear al usuario*/
AuthController.formContra = function (req, res, next) {
    res.render('cambiarContra')
}

AuthController.inicioAdmin = function (req, res, next) {
    res.render('inicioAdmin'); //
}

/*Para crear el usuario*/
AuthController.store = async function (req, res) {
    //obteniendo los datos del usuario
    var data = {};
    var capacidad1;
    if (req.body.group1 == 'Normal') {
        capacidad1 = 10;
    } else if (req.body.group1 == 'Premium') {
        capacidad1 = 50;
    }
    let user = {
        nombres: req.body.name,
        apellidos: req.body.last,
        correo: req.body.email,
        pass: req.body.pass,
        tipo: req.body.group1,
        numTarjeta: req.body.numT,
        codSeguridad: req.body.codT,
        fechaVencimiento: req.body.fechaT,
        tipoPago: req.body.group2,
        capacidad: capacidad1,
        ruta: `./public/almacenamiento/${req.body.email}/`,
        tipoUsuario: 'Normal'
    }
    var email = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    if (req.body.pass != req.body.pass2) {
        let dato1 = {
            error: 'Las contraseñas deben coincidir',
            pagina: 'registrar'
        }
        //parseamos el objeto json a cadena y lo alamcenamos en la variable session
        req.session.user = JSON.stringify(dato1);
        return res.render('error');
    } else if (!email.test(req.body.email)) {
        let dato1 = {
            error: 'El correo tiene formato incorrecto!!!!',
            pagina: 'registrar'
        }
        //parseamos el objeto json a cadena y lo alamcenamos en la variable session
        req.session.user = JSON.stringify(dato1);
        return res.render('error');
    } else {
        /*alamcenando el usuario*/
        await User.create(user, (error, user) => {
            if (error) // si se produce algun error
                //Devolvemos una vista con los mensajes de error
                return res.render('signup', { err: error, correo: user.correo });
            else {
                fs.mkdirSync(user.correo);
                fs.rename(`./${user.correo}`, `./public/almacenamiento/${user.correo}`, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("listo");
                    }
                });
                data.idUsuario = user._id.toString(),
                data.correo = user.correo,
                data.pass = user.pass,
                data.nombre = user.nombres,
                data.apellido = user.apellidos,
                data.apellido = user.tipo
            
                req.session.user = JSON.stringify(data);
                return res.redirect('/drive/inicioNormal');
            }
        })
    }

};

/*nos dirigira al inicio del usuario normal (NORMAL O PREMIUM) */
AuthController.profile = function (req, res) {
    return res.render('inicioNormal');
}

AuthController.mostrarUsuario = async function (req, res, next) {
    let users = await User.find();
    return res.status(200).json(users);
}

AuthController.findUser = async function (req, res, next) {
    let correo = req.params.correo;
    try{
        let user = await User.find({correo: correo});
        if(user.length != 0){
            console.log('Lo encontre!');
            return res.status(200).json({message : "encontrado", user:user});
        } else{
            return res.render('error');
        }
    } catch(err){
        return res.status(400).json({message : err})
    }
    
}

/*Para ingresar al sistema*/
AuthController.signin = function (req, res, next) {
    var data = {};
    //user autentication es el metodo que nos permitira ingresar al sistema
    User.authenticate(req.body.email, req.body.pass, (error, user) => {
        if (error || !user) {
            let dato1 = {
                error: 'El usuario o contraseña son incorrectas!!',
                pagina: '/'
            }
            //parseamos el objeto json a cadena y lo almacenamos en la variable session
            req.session.user = JSON.stringify(dato1);
            return res.render('error');
        }
        else {
                data.idUsuario = user._id.toString(),
                data.correo = user.correo,
                data.pass = user.pass,
                data.nombre = user.nombres,
                data.apellido = user.apellidos,
                data.tipo = user.tipo

                req.session.user = JSON.stringify(data);
                if(user.tipoUsuario == "Normal"){
                    return res.redirect('/drive/inicioNormal');
                } else if(user.tipoUsuario == "Administrador"){
                    return res.redirect('/drive/inicioAdmin');
                }

        }
    });
};


AuthController.logout = function (req, res, next) {
    if (req.session) { //si la session existe
        req.session.destroy(function (err) { // destruimos la sesion
            if (err) { // si produce un error
                next(err);
            }
            else { //si la sesion se destruyo nos dirigira al index
                res.redirect('/');
            }
        });
    }
}


module.exports = AuthController;
