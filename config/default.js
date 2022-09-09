const { static } = require("express");
module.exports = {
    app: {
        port: 80,
        views_folder: __dirname+"/../src/apps/views",
        view_engine: "ejs",
        static_folder: __dirname+"/../src/public",
        session_key: "random",
        session_secure: false,
        tmp:__dirname+"/../tmp",
        url: "http://localhost:80",
    },
    mail: {
        host: "smtp.gmail.com",
        post: 587,
        secure: false,
        auth: {
            user: "vietpro.shop28@gmail.com",
            pass: "rnqqtpbwsivtqopl",
        }
    }
    
}