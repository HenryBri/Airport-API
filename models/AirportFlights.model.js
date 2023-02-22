module.exports = (sequelize, Sequelize, Airport, Flight) => {
    const AirportFlight = sequelize.define("airportFlight", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        airportId: {
            type: Sequelize.INTEGER,
            references: {
                model: Airport,
                key: "id",
            },
        },
        FlightId: {
            type: Sequelize.INTEGER,
            references: {
                model: Flight,
                key: "id",
            },
        }
    })
    Airport.belongsToMany(Flight, {through: AirportFlight})
    Flight.belongsToMany(Airport, {through: AirportFlight})
    Airport.hasMany(AirportFlight)
    AirportFlight.belongsTo(Airport)
    Flight.hasMany(AirportFlight)
    AirportFlight.belongsTo(Flight)
    return AirportFlight
}