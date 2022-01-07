const multer = require("multer"),
      path = require("path");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        let folder = null
        if(req.body.productCategory === "Procesadores" && req.body.productBrand === "amd"){
            folder = path.resolve(__dirname, "../../public/images/productos-assets/procesadores-amd")
        }
        if(req.body.productCategory === "Procesadores" && req.body.productBrand === "intel"){
            folder = path.resolve(__dirname, "../../public/images/productos-assets/procesadores-intel")
        }
        if(req.body.productCategory === "PlacasVideo"){
            folder = path.resolve(__dirname, "../../public/images/productos-assets/Placa-de-video")
        }
        cb(null,folder)
    },
    filename: (req,file,cb) => {
        let imageName = Date.now() + "-" + file.originalname
        cb(null,imageName)
    }
})

const uploadProducts = multer({storage})

module.exports = uploadProducts