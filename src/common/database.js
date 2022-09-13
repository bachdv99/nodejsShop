const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect('mongodb://127.0.0.1/vietpro_mongodb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    return mongoose;
}

