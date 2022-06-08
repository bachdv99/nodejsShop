const UserModel = require("../models/user");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const { request, response } = require("../app");
const path = require('path')
const fs = require('fs')
const slug = require('slug');
const test = async (req, res)=>{
    
    // ProductModel.find().populate({path: "cat_id"}).exec((err, docs)=>{
    //     console.log(docs[0].cat_id.title);
    // });

    // const products = await ProductModel.find().populate({path: "cat_id"});
    // console.log(products);
    // req.session.data = "session defined";
    // res.send("test")

    const title ="Điện Thoại IPHONE giá rẻ";
    console.log(title);
    console.log(slug(title,{lower:true}));
}
const frmUpload = (req,res)=>{
    res.send(`
    <form method="post" enctype="multipart/form-data">
    <input type="file" name="file_upload"/>
    <button type="submit">upload</button>
    </form>
    `)
}
const fileUpload=(req,res)=>{
    console.log("fileUpload");
    const file = req.file;
    fs.renameSync(file.path,path.resolve("src/public/images/products",file.originalname));
}

const test2 = (req,res)=>{

    if(req.session.data){
        res.send(req.session.data)
    } else res.send("session not defined")
}

const test3 = (req,res)=>{

    if(req.session.data){
        res.send(req.session.data)
    } 
    res.send("session defined")
}


module.exports = {
    test:test,
    test2:test2,
    test3:test3,
    frmUpload:frmUpload,
    fileUpload:fileUpload

}


