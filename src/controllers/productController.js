// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');
const path = require("path")

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

const productController = {
    index: (req,res) => {
        res.render("products/index")
    },
    productCart: (req,res) => {
        res.render("products/productCart")
    },
    productDetail: (req,res) => {
        const productDetail = productModel.find(req.params.id)

		res.render("products/productDetail",{productDetail})
    },
    productos: (req,res) => {
        // leo todo el array de products en el controlador productController
        const products = productModel.all();
        // envio el array product a la vista para que la recorra EJS
        res.render('products/productos', { products });
    },
    productAddGet: (req,res) => {
        res.render("products/productAdd")
    },
    productAddPost: (req,res) => {
        let sliced = req.file.path.slice(req.file.path.indexOf("productos-assets"), req.file.path.length)

        const product = {
			productCategory: req.body.productCategory,
			productBrand: req.body.productBrand,
			productName: req.body.productName,
			productDescription: req.body.productDescription,
			productDescriptionLong: req.body.productDescriptionLong,
			productPrice: req.body.productPrice,
			productStock: req.body.productStock,
			productFees: req.body.productFees,
			productDiscount: req.body.productDiscount,
			productImage1: req.file.filename,
			productVisibility: req.body.productVisibility,
			productImportant: req.body.productImportant,
            ruta: sliced
		}

        console.log(product.ruta);

		const productCreate = productModel.create(product)

		res.redirect(`/products/${req.body.productCategory}`)
    },
    productEdit: (req,res) => {
        const productEdit = productModel.find(req.params.id)

		res.render("products/productEdit",{productEdit})
    },
    productPut: (req,res) => {
        const product = productModel.find(req.params.id)
        let sliced = req.file.path.slice(req.file.path.indexOf("productos-assets"), req.file.path.length)

		let productUpdate = {
			id: req.params.id,
			productCategory: req.body.productCategory,
			productBrand: req.body.productBrand,
			productName: req.body.productName,
			productDescription: req.body.productDescription,
			productDescriptionLong: req.body.productDescriptionLong,
			productPrice: req.body.productPrice,
			productStock: req.body.productStock,
            productFees: req.body.productFees,
			productDiscount: req.body.productDiscount,
			productImage1: req.file.filename,
			productVisibility: req.body.productVisibility,
			productImportant: req.body.productImportant,
            ruta: sliced
		   }

		const productUpdated = productModel.update(productUpdate)	

		res.redirect("/products/Procesadores")
    },
    productDelete: (req,res) => {
        const productDestroy = productModel.delete(req.params.id)

        res.redirect("/products/Procesadores")
    },
    productCategory: (req,res) => {
        const products = productModel.all()
        let productsFiltered = []

        for (let i = 0; i < products.length; i++) {
            if(products[i].productCategory === req.params.productCategory){
                productsFiltered.push(products[i])
            }
        }

        res.render("products/productos",{productsFiltered})
    },
    search: (req,res) => {
        let searched = req.query.search.toLowerCase()

		const products = productModel.all()

		let productsResults = []

		for(let i = 0; i < products.length;i++){
			if(products[i].productName.toLowerCase().includes(searched)){
				productsResults.push(products[i])
			}
		}

        res.render("products/results",{productsResults})
    }
}

module.exports = productController;

