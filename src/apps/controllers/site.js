
const CategoryModel = require('../models/category');
const ProductModel = require('../models/product');
const CommentModel = require('../models/comment');
const moment = require('moment');
// const { update } = require('../models/category');
const transporter = require('../../common/transporter');
const config = require('config');
const ejs = require('ejs');
const path = require('path');

const home = async (req,res)=>{
    const LatestProducts = await ProductModel.find({
        is_stock:true,
    }).sort({_id:-1}).limit(6);
    const FeaturedProducts = await ProductModel.find({
        featured:true,
    }).sort({_id:-1}).limit(6);
    // console.log(LatestProducts);
    // console.log(FeaturedProducts);
    res.render("site/index",{
        LatestProducts:LatestProducts,
        FeaturedProducts:FeaturedProducts
    });
};

const category = async (req,res)=>{
    const slug = req.params.slug;
    const id = req.params.id;
    const category = await CategoryModel.findById(id);
    const products = await ProductModel.find({
        cat_id: id,
    }).sort({_id:-1});
    const title = category.title;
    const total = products.length
    // console.log(slug);
    // console.log(id);
    // console.log(title);
    res.render("site/category", {title, products,total});

    //destrucstring assigment
};


const product = async(req,res)=>{
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    const comments = await CommentModel.find({prd_id:id})
    const time = comments.map((index,value)=>{
        return value = moment(index.createdAt).fromNow();
    })
    // console.log(time);
    res.render("site/product",{product,comments,time});
};
const comment = async (req, res)=>{
    const id = req.params.id;
    const comment = {
        prd_id: id,
        full_name: req.body.full_name,
        email: req.body.email,
        body: req.body.body,
    }
    await new CommentModel(comment).save();
    res.redirect(req.path);
}

const addToCart = async (req,res)=>{
    const body = req.body;
    let items = req.session.cart;

    let isUpdate = false;
    //Mua l???i s???n ph???m ???? c?? trong gi??? h??ng
    items.map((item)=>{
        if(item.id === body.id){
            isUpdate = true;
            item.qty += parseInt(body.qty)
        }
        return item;
    })
    //Mua m???i s???n ph???m
    if(!isUpdate){
        const product = await ProductModel.findById(body.id)
        items.push({
            id:product.id,
            name:product.name,
            price:product.price,
            img:product.thumbnail,
            qty:parseInt(body.qty)
        })
    }
    req.session.cart = items;
    res.redirect("/cart")
}

const search =(req,res)=>{
    res.render("site/search");
};

const success =(req,res)=>{
    res.render("site/success");
};

const cart =(req,res)=>{
    const products = req.session.cart;

    res.render("site/cart",{products,totalPrice:0});
    /*  
    b1: l???y danh s??ch s???n ph???m trong gi??? h??ng
    b2: ?????y danh s??ch sang view
    b3: hi???n th??? danh s??ch s???n ph???m ra view
    */

};

const updateCart = (req,res)=>{
    const products = req.body.products;
    const items = req.session.cart;
    items.map((item) => {
        if (products[item.id]) {
            item.qty = parseInt(products[item.id]["qty"]);
        }
        return item;
    });
    res.redirect("/cart");    
}

const delCart = (req,res)=>{
    const id = req.params.id;
    const items = req.session.cart;
    items.map((item,value)=>{
        if (item.id == id){
            items.splice(value,1);
        }
        return item
    });
    req.session.cart = items;
    res.redirect("/cart");
}

const order = async (req,res)=>{
    const items = req.session.cart;
    const body = req.body;
    //l???y ???????ng d???n ?????n view
    const viewPath = req.app.get('views');
    //compile ejs sang html
    const html = await ejs.renderFile(
        path.join(viewPath,'site/email-order.ejs'),
        {
            name:body.name,
            phone:body.phone,
            // mail:body.mail,
            add:body.add,
            // url: config.get("app.url"),
            totalPrice:0,
            items,
        }
    );
    //send mail
    await transporter.sendMail({
        to:body.mail,
        from:"Vietpro Shop",
        subject:"X??c nh???n ????n h??ng t??? Vietpro shop",
        html,
    })

    req.session.cart = [];
    res.redirect("/success")
}

module.exports ={
    home:home,
    category:category,
    product:product,
    search:search,
    cart:cart,
    success:success,
    comment:comment,
    addToCart:addToCart,
    updateCart:updateCart,
    delCart:delCart,
    order:order,
};