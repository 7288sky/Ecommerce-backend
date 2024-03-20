import express from "express";

import formidable from "express-formidable";

const router=express.Router()

import { authenticate,authorizedAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
//Controllers
import {
     addProduct,
     updateProductDetails,
     removeProduct,
     fetchProducts,
     fetchProductById,
     fetchAllProducts,
     addProductReview,
     fetchTopProducts,
     fetchNewProduct,
     filterProducts
    } from "../controllers/productController.js";

router.route('/')
.get(fetchProducts)
.post(authenticate,authorizedAdmin,formidable(),addProduct);




router.route('/:id/fetch')// 👺👺👺🙈🙈🙈👽👽👽👽👽👽👽👽 BLUNDER ERROR I HAVE GOT HERE AS I WAS USING '/:id' THIS WAS MAKING A ERROR WITH MY '/allproduct' AND '/top' AS IT WAS TREATING 'allProduct' AND 'top' AS id  
.get(fetchProductById)
.put(authenticate,authorizedAdmin,formidable(),updateProductDetails)
.delete(authenticate,authorizedAdmin,formidable(),removeProduct);

router.route("/allproducts").get(fetchAllProducts);

router.route('/:id/reviews').post(authenticate,checkId,addProductReview);

router.get("/top", fetchTopProducts);
router.get('/new',fetchNewProduct)
router.route('/filtered-products').post(filterProducts)

export default router;
