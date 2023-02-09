const airportsController = require("../controllers/AirportsController.js")

module.exports = (app) => {
    app.route("/airports")
        .get(airportsController.getAll)
//         .post(airportsController.createNew)
//     app.route("/airports/:id")
//         .get(airportsController.getById)
//         .put(airportsController.updateById)
//         .delete(airportsController.deleteById)
}