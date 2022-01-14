const jsonDB = require("../model/jsonDatabase"),
      modelController = jsonDB("users"),
      {validationResult} = require("express-validator"),
      bcryptjs = require("bcryptjs");

const userController = {
    ayuda: (req,res) => {
        res.render("users/ayuda")
    },
    login: (req,res) => {
        res.render("users/login")
    },
    registerGet: (req,res) => {
        res.render("users/register")
    },
    registerPost:(req,res) => {
        //Imágen y carga de datos
        let image;

        if(req.file){
            image = req.file.filename
        }else{
            image = "default-image.png"
        }

        let user = {
            userNombre: req.body.registroNombre,
            userApellido: req.body.registroApellido,
            userUsuario:req.body.registroUsuario,
            userEmail: req.body.registroEmail,
            userLock:bcryptjs.hashSync(req.body.registroLock,10),
            userLockRepeat:bcryptjs.hashSync(req.body.registroLockRepeat,10),
            userAvatar:image,
            userRol:req.body.registroRol
        }

        //Validaciones correspondientes
        let errors = validationResult(req)
        if(errors.isEmpty()){
            const registerUser = modelController.create(user)

            res.redirect("/")
        }else{
            res.render("users/register", {
                errors:errors.mapped(),
                old: req.body
            })
        }
        console.log(errors);
    },
    restablecer: (req,res) => {
        res.render("users/restablecer")
    }
}

module.exports = userController;