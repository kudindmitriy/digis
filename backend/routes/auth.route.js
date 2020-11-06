module.exports = function (app) {
    const controller = require("../controllers/auth.controller");

    app.route("/register").post(controller.create);
    app.route("/login").post(controller.auth);
};
