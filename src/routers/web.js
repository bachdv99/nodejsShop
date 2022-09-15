const express = require("express");
const router = express.Router();
const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const AuthMiddleware = require ("../apps/middlewares/auth");
const UploadMidware = require ("../apps/middlewares/upload");
const ChatController = require("../apps/controllers/chat");

const multer = require('multer');
const site = require("../apps/controllers/site");
const upload = multer({
    dest: __dirname+"/../../tmp",
})
//router comment
router.post("/product-:slug.:id", site.comment);


//router api
router.get("/api/comment/:id",ProductController.getCommentAPI);
router.get("/api/Categories",ProductController.getCategoriesAPI)
router.get("/images/:id-:thumbnail",ProductController.getImg);
router.get("/api/FeaturedProducts",ProductController.getAPIFeaturedProducts);
router.get("/api/LatestProducts",ProductController.getLatestProducts);
router.get("/api/products",ProductController.getapi);
router.get("/api/:id",ProductController.searchAPI);







//

//
// router.get("/test",(req,res,next)=>{
//     next();
// }, TestController.test);
// router.get("/test2", TestController.test2);
// router.get("/test3", TestController.test3);

// router.get("/form", (req, res)=>{
//     res.send(`
//         <form method=post>
//             <input type=text name=mail />
//             <input type=text name=pass />
//             <input type=submit name=sbm value=Login />
//         </form>
//     `);
// });
// router.post("/form", (req, res)=>{
//     const mail = req.body.mail;
//     const pass = req.body.pass;
//     console.log(mail+"-"+pass);
// });
// router.get("/search",(req,res)=>{
//     const content = req.query.
// })

router.get("/upload", TestController.frmUpload)
router.post("/upload", upload.single("file_upload"), TestController.fileUpload)

router.get("/admin/login",AuthMiddleware.checkLogin, AuthController.login);
router.post("/admin/login",AuthMiddleware.checkLogin, AuthController.postLogin);

router.get("/admin/logout", AuthMiddleware.checkAdmin, AdminController.logout);
router.get("/admin",AuthMiddleware.checkAdmin, AdminController.index);
////////////////////////////////////////////////////////////
router.get("/admin/products", AuthMiddleware.checkAdmin, ProductController.index);
router.get("/admin/products/create", AuthMiddleware.checkAdmin,ProductController.create);
router.post("/admin/products/store", UploadMidware.single("thumbnail"), AuthMiddleware.checkAdmin,ProductController.store);
router.get("/admin/products/edit/:id", AuthMiddleware.checkAdmin, ProductController.edit);
router.post("/admin/products/update/:id", UploadMidware.single("thumbnail"), AuthMiddleware.checkAdmin, ProductController.update);
router.get("/admin/products/delete/:id", AuthMiddleware.checkAdmin, ProductController.del);
router.get("/",site.home);
router.get("/product-:slug.:id",site.product);
router.get("/search",site.search);
router.get("/success",site.success);
router.get("/category-:slug.:id",site.category);
router.get("/cart",site.cart)
router.post("/add-to-cart",site.addToCart)
router.post("/update-cart",site.updateCart);
router.get("/del-cart-:id",site.delCart);
router.post("/order",site.order);


//chat room
router.get("/chat",AuthMiddleware.checkUser, ChatController.chat)

module.exports = router;