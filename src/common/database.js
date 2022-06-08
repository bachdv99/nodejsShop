const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect('mongodb://localhost/vietpro_mongodb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    return mongoose;
}