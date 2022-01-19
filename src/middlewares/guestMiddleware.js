//El guest middleware evitará que se pueda acceder al formulario de registro y login una vez estando logueados en el sistema

function guestMiddleware(req,res,next){
    if(req.session.userLogged){
        res.redirect("/")
    }

    next()
}

module.exports = guestMiddleware