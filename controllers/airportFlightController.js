const { db } = require("../db")
const Flight = db.flights
const Airport = db.airports
const AirportFlight = db.airportflights
const Sequelize = require("sequelize")

AirportFlight.belongsTo(Airport, { foreignKey: 'airportId' })
AirportFlight.belongsTo(Flight, { foreignKey: 'flightId' })

exports.getAll = async (req, res) => {
    try {
        const airports = await Airport.findAll();
        const flights = await Flight.findAll();
        const airportFlightPromises = [];

        for (const airport of airports) {
            for (const flight of flights) {
                if (airport.IATA_code === flight.departure_airport) {
                    airportFlightPromises.push(AirportFlight.findOrCreate({
                        where: {
                            airportId: airport.id,
                            flightId: flight.id
                        },
                        defaults: {
                            airportId: airport.id,
                            flightId: flight.id
                        }
                    }));
                }
            }
        }

        await Promise.all(airportFlightPromises);

        const airportFlights = await AirportFlight.findAll({
            include: { all: true },
            logging: console.log
        })

        const result = airportFlights.map((af) => {
            return {
                "name": af.airport.name,
                "flight_nr": af.flight.flight_nr
            }
        })

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while retrieving airport flights." });
    }
}


