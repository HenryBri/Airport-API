const {db} = require("../db")
const FlightModel = require("../models/Flight.model")
const Airport = db.airports

exports.getAll = async(req, res)=>{
    const airports = await Airport.findAll({attributes:["id","name"]})
    res.send(airports)
}

exports.getById = async (req, res) => {
    const airport = await Airport.findByPk(req.params.id)
    if (airport === null) {
      res.status(404).send({ error: "Airport not found" })
      return
    }
    res.send(airport)
  }

  exports.getByIATA_code = async (req, res) => {
    const airport = await Airport.findOne({
      where: {
        IATA_code: req.params.IATA_code
      },
      attributes: ["name", "IATA_code", "ICAO_code"]
    })
    if (airport === null) {
      res.status(404).send({ error: "Airport code not found" })
      return
    }
    res.send(airport)
  }

  exports.getByICAO_code = async (req, res) => {
    const airport = await Airport.findOne({
    where: {
      ICAO_code: req.params.ICAO_code
    },
    attributes: ["name", "ICAO_code", "IATA_code"]
  })
  if (airport === null) {
    res.status(404).send({ error: "Airport code not found" })
    return
  }
  res.send(airport)
  }
  
  exports.createNew = async (req, res) => {
    let airport
    try {
        airport = await Airport.create(req.body)
    } catch (error) {
      if (error instanceof db.Sequelize.ValidationError) {
        res.status(400).send({ error: error.errors.map((item) => item.message) })
      } else {
        console.log("AirportsCreate: ", error)
        res
          .status(500)
          .send({ error: "Something went wrong on our side. Sorry" })
      }
      return
    }
    res
      .status(201)
      .location(`${getBaseUrl(req)}/airports/${airport.id}`)
      .json(airport)
  }
  
  exports.deleteById = async (req, res) => {
    let result
    try {
      result = await Airport.destroy({ where: { id: req.params.id } })
    } catch (error) {
      console.log("AirportsDelete: ",error)
      res.status(500).send({ error: "Something went wrong on our side. Sorry" })
      return
    }
    if (result === 0) {
      res.status(404).send({ error: "Airport not found" })
      return
    }
    res.status(204).send()
  }
  
  exports.updateById = async (req,res) => {
    let result
    delete req.body.id
    try {
      result = await Airport.update(req.body,{ where: { id: req.params.id } })
      if (result[0] === 0) {
          res.status(404).send({ error: "Airport not found" })
          return
      }
      const airport = await Airport.findByPk(req.params.id)
      res.status(200)
          .location(`${getBaseUrl(req)}/airports/${airport.id}`)
          .json(airport)
  } catch (error) {
      console.log("AirportsUpdate: ",error)
      if (error instanceof db.Sequelize.ValidationError) {
          res.status(400).send({ error: error.errors.map((item) => item.message) })
          return
      }
      res.status(500).send({ error: "Something went wrong on our side. Sorry" })
  }
}
  
  exports.getFlightsAll = async(req, res)=>{
    const airports = await Airport.findAll({attributes:["id","name"], include:[FlightModel]})
    res.send(airports)
}

  getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )
  }