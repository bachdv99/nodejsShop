const UserModel = require("../models/user");
const login = (req, res)=>{
    res.render("admin/login", {data: {}});
}
const postLogin = async (req, res)=>{
    const mail = req.body.mail;
    const pass = req.body.pass;

    const {redirect} = req.query;
    let error;
    const users = await UserModel.find({email: mail, password: pass});
    if(mail == "" || pass == ""){
        error = "Thông tin không được để trống !";
    }
    else if(users.length > 0){
        req.session.mail = mail;
        req.session.pass = pass;
        req.session._id = users[0]._id;
        res.redirect(redirect ? redirect: "/admin");
    }
    else{
        error = "Tài khoản không hợp lệ !"
    }
    res.render("admin/login", {data: {error: error}});
}


module.exports = {
    login:login,
    postLogin:postLogin,
}