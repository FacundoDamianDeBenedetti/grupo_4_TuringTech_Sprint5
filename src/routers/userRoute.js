const express = require("express"),
  router = express.Router();
// Solicito todas las funcionalidades del userController
const userController = require("../controllers/userController");

//Require de middlewares de ruta
const uploadUsers = require("../middlewares/multerUsersMiddleware");

//Require y uso de express-validator
const { body } = require("express-validator");

//Require de middlewares de aplicación para el control del comportamiento del usuario
const authMiddleware = require("../middlewares/authMiddleware") //FAlTA PERFIL USUARIO
const guestMiddleware = require("../middlewares/guestMiddleware")

const validationScheme = [
  body("registroNombre").notEmpty(),
  body("registroApellido").notEmpty(),
  body("registroUsuario").notEmpty(),
  body("registroEmail").notEmpty().isEmail(),
  body("registroLock").notEmpty(),
  body("registroLockRepeat").notEmpty(),
  body("registroAvatar").optional(),
  body("registroRol").notEmpty(),
];

/* Con readAll - LISTADO DE PRODUCTOS, RENDERIZA CATALOGO DE PRODUCTOS*/
//Ayuda
router.get("/ayuda", userController.ayuda);

//Login
router.get('/login', guestMiddleware,userController.loginGet);
router.post("/login", userController.loginPost);

//Logout
router.get("/out",userController.logout)

//Registro
router.get('/register', guestMiddleware,userController.registerGet);
router.post('/register',uploadUsers.single("registroAvatar"),validationScheme, userController.registerPost);

//Restablecer
router.get("/restablecer", userController.restablecer);

//PageProfile
router.get("/pageProfile", userController.pageProfile);

//pageProfile

router.get('/pageProfile',userController.pageProfile );

/* Con readDetail - LEE PRODUCTO SEGUN ID */
//router.get('/detalle/:menuId', productController.readDetail);

module.exports = router;
