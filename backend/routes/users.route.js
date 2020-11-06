const auth = require("../middlewares/auth.middleware")

module.exports = function (app) {
    const controller = require("../controllers/users.controller");

    app.post("/add_point", auth, controller.addPoint);
    app.get("/get_points", auth, controller.getPoints);
};
