const ProductsModel = require("../models/product");
const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");
const fs = require("fs");
const slug = require("slug");
const path = require("path")
const index  = async (req, res)=>{
    
    // const page = await ProductsModel.find().populate({path: "cat_id"});
    // console.log(products);
    const page = parseInt(req.query.page)|| 1;
    const limit = 10;
    skip = page * limit - limit;

    const total = await ProductsModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit)
    // paginate(page,totalPage);

    const products = await ProductsModel.find().populate({path:"cat_id"}).skip(skip).limit(limit).sort({"_id":-1});
    res.render("admin/products/product", {
        products:products,
        pages: paginate(page,totalPage),
        totalPage:totalPage,
        page: page
    });
}
// const create  = async (req, res)=>{
//     const categories = await CategoryModel.find();
    // console.log(categories);
    // const categories = await CategoryModel.find().populate({path:"title"-id});
    // console.log(categories+"nothing was find");

//     res.render("admin/products/add_product",{categories:categories});
// }

const store = (req,res)=>{
    const body = req.body;
    const file = req.file;
    const product = {
        // thumbnail: body.thumbnail,
        description: body.description,
        cat_id: body.cat_id,
        price: body.price,
        status: body.status,
        featured: body.featured,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name),
        promotion: body.promotion
    }
    if(file){
        const thumbnail = "product/"+file.originalname;
        product["thumbnail"]=thumbnail;
        fs.renameSync(file.path, path.resolve("src/public/images",thumbnail))
    }
    // new ProductsModel(product).save;
    res.redirect("/admin/products");
}

const create = async (req, res) => {
    
    const categories = await CategoryModel.find();
    // console.log(categories);
    res.render("admin/products/add_product", {categories:categories});
}

const edit  = (req, res)=>{
    res.send("edit");
}
const del  = (req, res)=>{
    res.send("del");
}
module.exports = {
    index:index,
    create:create,
    edit:edit,
    del:del,
    store:store,
}