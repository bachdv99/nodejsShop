const CategoryModel = require('../models/category')

module.exports = async (req,res, next)=>{
    res.locals.categories = await CategoryModel.find();
    res.locals.totalCartItems = req.session.cart.reduce((total,product)=>total + product.qty, 0);
    res.locals.userID = req.session._id;
    next();
}

