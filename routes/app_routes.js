const airportsController = require("../controllers/AirportsController.js")
const flightsController = require("../controllers/FlightsController.js")

module.exports = (app) => {
    app.route("/airports")
        .get(airportsController.getAll)
         .post(airportsController.createNew)
     app.route("/airports/:id")
         .get(airportsController.getById)
         .put(airportsController.updateById)
         .delete(airportsController.deleteById)
}

module.exports = (app) => {
    app.route("/flights")
        .get(flightsController.getAll)
        .post(flightsController.createNew)
    app.route("/flights/:id")
        .get(flightsController.getById)
        .put(flightsController.updateById)
        .delete(flightsController.deleteById)
}