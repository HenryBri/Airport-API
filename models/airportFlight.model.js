module.exports = (sequelize, Sequelize, Flight, Airport) => {
    const airportFlight = sequelize.define("airportflight", {
      
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
        flightId: {
            type: Sequelize.INTEGER,
            references: {
                model: Flight,
                key: "id",
            },
        },
    })
  
    Flight.belongsToMany(Airport, { through: airportFlight })
    Airport.belongsToMany(Flight, { through: airportFlight })

    Flight.hasMany(airportFlight)
    airportFlight.belongsTo(Flight)
    Airport.hasMany(airportFlight)
    airportFlight.belongsTo(Airport)
  
    return airportFlight
  }