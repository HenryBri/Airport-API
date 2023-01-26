const {db} = require("../db")
const Airport = db.airports

exports.getAll = async(req, res)=>{
    const airports = await Airport.findAll()
    res.send(airports)
}