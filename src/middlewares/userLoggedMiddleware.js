const model = require("../model/jsonDatabase")
const modelController = model("users")

function userLoggedMiddleware(req,res,next){
    let emailInCookie = req.cookies.userEmail
    let userFromCookie = modelController.findByField("userEmail",emailInCookie)

    if(userFromCookie){
        req.session.userLogged = userFromCookie
    }

    if(req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }else{
        res.locals.isLogged = false
    }

    next()
}

module.exports = userLoggedMiddleware