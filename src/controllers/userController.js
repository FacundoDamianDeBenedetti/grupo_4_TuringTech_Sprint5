const jsonDB = require("../model/jsonDatabase"),
      modelController = jsonDB("users"),
      {validationResult} = require("express-validator"),
      bcryptjs = require("bcryptjs");

const userController = {
    ayuda: (req,res) => {
        res.render("users/ayuda")
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
    },
    restablecer: (req,res) => {
        res.render("users/restablecer")
    },
    loginGet: (req,res) => {
        res.render("users/login")
    },
    loginPost:(req,res) => {
        let errors = validationResult(req)
        
        let userToLogin = modelController.findByField("userEmail",req.body.userEmail)

        if(userToLogin){
            let comparePassword = bcryptjs.compareSync(req.body.userLock, userToLogin.userLock)
            
            if(comparePassword){
                delete userToLogin.userLock
                delete userToLogin.userLockRepeat
                req.session.userLogged = userToLogin
                
                if(req.body.remember){
                    res.cookie("userEmail", req.body.userEmail,{maxAge: 1000 * 60})
                }
                return res.redirect("/pageProfile")
            }
        }

        return res.render("users/login",{
            errors:errors.mapped(),
            old:req.body
        })
    },
    logout:(req,res) => {
        res.clearCookie("userEmail")
        req.session.destroy()
        return res.redirect("/")
    },
    pageProfile:(req,res) => {
        res.render("users/pageProfile",{userLogged: req.session.userLogged})
    }
}

module.exports = userController;