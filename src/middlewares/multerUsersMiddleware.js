const multer = require("multer"),
      path = require("path");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        let folder = path.resolve(__dirname, "../../public/images/users-assets")
        cb(null,folder)
    },
    filename: (req,file,cb) => {
        let imageName = "userImage-" + Date.now() + path.extname(file.originalname)
        cb(null,imageName)
    }
})

const uploadUsers = multer({storage})

module.exports = uploadUsers