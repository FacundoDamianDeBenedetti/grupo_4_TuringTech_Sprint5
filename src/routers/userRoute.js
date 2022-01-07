const express = require('express'),
      router = express.Router();
// Solicito todas las funcionalidades del userController
const userController = require('../controllers/userController');

//Require de middlewares de ruta
const uploadUsers = require("../middlewares/multerUsersMiddleware")

//Require y uso de express-validator
const {body} = require("express-validator")

const validationScheme = [
    body("registroNombre").notEmpty(),
    body("registroApellido").notEmpty(),
    body("registroUsuario").notEmpty(),
    body("registroEmail").notEmpty().isEmail(),
    body("registroLock").notEmpty(),
    body("registroLockRepeat").notEmpty(),
    body("registroAvatar").optional(),
    body("registroRol").notEmpty()
]

/* Con readAll - LISTADO DE PRODUCTOS, RENDERIZA CATALOGO DE PRODUCTOS*/
//Ayuda
router.get('/ayuda', userController.ayuda);

//Login
router.get('/login', userController.login);

//Registro
router.get('/register', userController.registerGet);
router.post('/register',uploadUsers.single("registroAvatar"),validationScheme, userController.registerPost);

//Restablecer
router.get('/restablecer', userController.restablecer);

/* Con readDetail - LEE PRODUCTO SEGUN ID */
//router.get('/detalle/:menuId', productController.readDetail);

module.exports = router;
