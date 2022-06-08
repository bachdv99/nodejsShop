const express = require("express");
const app = express();
// const config = require("../../config/default");
const session = require('express-session');
const config = require('config');



// Config View Engine
app.set("views", config.get("app").views_folder);
app.set("view engine", config.get("app").view_engine);

// Config Static Folder

app.use("/static", express.static(config.get("app").static_folder));
// Config Get Form Data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//config session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("app").session_key,
  resave: false,
  saveUninitialized: true,
  cookie: false
}))

//use Cart
app.use(require("../apps/middlewares/cart"));

//share
app.use(require('./middlewares/share'));


// always put at end of file
// Using Router
app.use(require("../routers/web"));

module.exports = app;