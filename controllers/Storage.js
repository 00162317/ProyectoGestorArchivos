const path = require("path");

const multer = require("multer");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let email = JSON.parse(req.session.user).correo;
      cb(null, './public/almacenamiento/'+email+'/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage}).single("file");

module.exports = upload;   