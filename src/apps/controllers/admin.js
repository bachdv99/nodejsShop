const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const index = async (req, res)=>{

    const users = await UserModel.find();
    const totalUsers = users.length;
    const products = await ProductModel.find();
    const totalProducts = products.length;

    res.render("admin/dashboard", {totalUsers:totalUsers, totalProducts:totalProducts});
    console.log(totalUsers);
}

const logout = (req, res)=>{
    req.session.destroy();
    return res.redirect("/admin/login");
}

module.exports = {
    index:index,
    logout:logout,
}