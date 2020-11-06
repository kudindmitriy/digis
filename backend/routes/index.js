module.exports = (app) => {
    const auth = require("./auth.route");
    auth(app);

    const users = require("./users.route");
    users(app);
}
