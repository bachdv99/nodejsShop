const checkLogin = (req, res, next)=>{
    if(req.session.mail && req.session.pass){
        return res.redirect("/admin");
    }
    next();
}

const checkAdmin = (req, res, next)=>{
    if(!req.session.mail || !req.session.pass){
        return res.redirect("/admin/login");
    }
    next();
}

const checkUser = (req, res, next)=>{
    if(!req.session.mail || !req.session.pass){
        return res.redirect(`/admin/login?redirect=${req.originalUrl}`);
    }
    next();
}

module.exports = {
    checkLogin:checkLogin,
    checkAdmin:checkAdmin,
    checkUser:checkUser,
}