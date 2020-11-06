const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const mongoose_connect = require('./mongoose_connect');
const routes = require("./routes");
const cors = require("cors");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

cors(app);
routes(app);
mongoose_connect();

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
