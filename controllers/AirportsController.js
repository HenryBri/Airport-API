const {db} = require("../db")
const Airport = db.airports

exports.getAll = async(req, res)=>{
    const airports = await Airport.findAll()
    res.send(airports)
}

exports.getById = async (req, res) => {
    const airports = await Airport.findByPk(req.params.id)
    if (airports === null) {
      res.status(404).send({ error: "Airport not found" })
      return
    }
    res.send(airports)
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
          .send({ error: "Something went wrong on our side. Sorry :(" })
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
      res.status(500).send({ error: "Something went wrong on our side. Sorry :(" })
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
    } catch (error) {
      console.log("AirportsUpdate: ",error)
      res.status(500).send({ error: "Something went wrong on our side. Sorry :(" })
      return
    }
    if (result === 0) {
      res.status(404).send({ error: "Airport not found" })
      return
    }
    const airport = await Airport.findByPk(req.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/airports/${airport.id}`)
        .json(airport)  
  }
  
  getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )
  }