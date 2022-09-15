const CategoriesModel = require("../models/category");
const ProductsModel = require("../models/product");
const paginate = require("../../common/paginate");
const slug = require("slug");
const path = require("path");
const fs = require("fs");
const CommentModel = require("../models/comment");
const index = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    skip = page * limit - limit;

    const total = await ProductsModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);

    const products = await ProductsModel.find()
                                        .populate({ path: "cat_id" })
                                        .skip(skip)
                                        .limit(limit)
                                        .sort({"_id": -1});
    res.render("admin/products/product", 
    { 
        products: products,
        pages: paginate(page, totalPage),
        page: page,
        totalPage: totalPage,
    });
}

const getLatestProducts = async (req,res)=>{
    const latestProductsAPI = await ProductsModel.find({
        is_stock:true,
    }).sort({_id:-1}).limit(6);
    res.json(latestProductsAPI);

}

const getAPIFeaturedProducts = async(req,res)=>{
    const products = await ProductsModel.find({
        featured:true,
    }).sort({_id:1}).limit(6);
    res.json(products);
}


const getCommentAPI = async(req,res)=>{
        const id = req.params.id;
        const product = await CommentModel.findById({
            prd_id:id,
        });
        res.json(product);
    }

const getImg = async (req,res)=>{
    const id = req.params.id;
    const product = await ProductsModel.findById(id);
    const thumbnail= product.thumbnail;
    res.sendfile("src/public/images/"+thumbnail);
}

const getCategoriesAPI = async (req,res)=>{
    const categories = await CategoriesModel.find();
    res.json(categories);
}

const create = async (req, res) => {
    const categories = await CategoriesModel.find();
    res.render("admin/products/add_product", {categories:categories});
}

const getapi = async(req,res)=>{
    const products = await ProductsModel.find();
    res.json(products);
}



const update = async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const file = req.file;
    const product = {
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        status: body.status,
        featured: body.featured ==="on",
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name),
    };

    // console.log(id);
    // console.log(body);
    if(file){
        product["thumbnail"] = "products/"+file.originalname;
        fs.renameSync(file.path,path.resolve("src/public/images/products",file.originalname));
    }
    await ProductsModel.updateOne({_id:id},{$set: product})
    res.redirect("/admin/products");
}

const store = async (req, res)=>{
    const body = req.body;
    const file = req.file;
    const product = {
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        status: body.status,
        featured: body.featured ==="on",
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name),
    };
    if(file){
        product["thumbnail"] = "products/"+file.originalname;
        fs.renameSync(file.path,path.resolve("src/public/images/products",file.originalname));
    }
    await new ProductsModel(product).save();
    // console.log(product);
    res.redirect("/admin/products");
}

const searchAPI = async(req,res)=>{
    const id = req.params.id;
    const product = await ProductsModel.findById(id);
    res.json(product);
}

const edit = async (req, res) => {
    const categories = await CategoriesModel.find();
    const id = req.params.id;
    const product = await ProductsModel.findById(id);
    res.render("admin/products/edit_product", {categories:categories, product: product});

}
const del = async (req, res) => {
    const id = req.params.id; // lấy giá trị id ở đường dẫn
    await ProductsModel.deleteOne({_id:id});
    res.redirect("/admin/products");
}


module.exports = {
    getCommentAPI:getCommentAPI,
    getapi: getapi,
    searchAPI:searchAPI,
    getImg:getImg,
    getAPIFeaturedProducts:getAPIFeaturedProducts,
    getLatestProducts:getLatestProducts,
    getCategoriesAPI:getCategoriesAPI,
    index: index,
    create: create,
    store: store,
    edit: edit,
    del: del,
    update:update,
}