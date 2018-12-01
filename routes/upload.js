var express = require('express');
var fs = require('fs');
const upload = require("../controllers/Storage");
const File = require("../models/files");
var router = express.Router();

router.post("/inicioNormal", (req, res, next)=>{
    upload(req, res, function (err) {
        if(req.file == null || req.file == undefined || req.file == ""){         
            res.redirect("/drive/inicioNormal");
        }
        else{
            if (err) {
                console.log(err);
            }
            else{
                console.log(req.file);
                let file = new File();
                file.file = req.file.filename;
                file.tipoArchivo = req.file.filename.split('.').pop();
                file.dueño = JSON.parse(req.session.user).correo;
                let p = fs.statSync(`./public/almacenamiento/${file.dueño}/${file.file}`);
                file.size = Math.round((p['size']/1048576.0)*100)/100;
                file.originalName = req.file.originalname;
                file.save(()=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect("/drive/inicioNormal");
                    }
                });
            }
        }
    }); 
});

router.delete('/:id',function (req, res) {
    // intentar eliminar
    File.findByIdAndRemove(req.params.id, function(err, eleminado){
        if (err) {
            res.status(500);
            res.json({code:500, err});
        } else {
            res.json({ok: true, eleminado});
        }
    });
    // noitifcar resultado 
});

router.get('/', function(req, res ,err){
    File.find({},(err,files) =>{
        if(err){
            res.status(500);
            res.json({code:500,err});
        }
        else{
            res.json({
                ok:true,
                files
            })
        }
    })
});

module.exports = router;