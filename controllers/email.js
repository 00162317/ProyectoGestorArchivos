var nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function (req, res) {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'lopezeduardo220@gmail.com',
            pass: 'proyectoexpo'
        }
    });
    
    // Retorna un número aleatorio entre min (incluido) y max (excluido)
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    var num = Math.floor(getRandomArbitrary(1, 100000));

    // Definimos el email
    var mailOptions = {
        from: 'lopezeduardo220@gmail.com',
        to: req.body.email,
        subject: 'Codigo de confirmacion',
        text: 'Numero aleatorio'
    };

    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.redirect('/drive/pedirCorreo/');
        }
    });
};