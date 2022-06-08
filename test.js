const express = require("express");
const router = express.Router();
const app = express();

router.get("/users/:userId/products/:prdId", (req, res)=>{
    
    console.log(req.params);
    res.send("<h1>Vietpro Academy</h1>");
});

app.use("/static", express.static(__dirname+"/src/public"));

app.use(router);
app.listen(port=3000, ()=>{
    console.log("Server running on port "+port);
});