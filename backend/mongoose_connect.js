const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.MONGO_SECRET;


module.exports = function () {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    });

    const connection = mongoose.connection;
    connection.once("open", () => {
        console.log("MongoDB database connection established successfully");
    });
};
