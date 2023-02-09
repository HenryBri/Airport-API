const {db} = require("../db")
const Flight = db.flights

exports.getAll = async(req, res)=>{
    const flights = await Flight.findAll()
    res.send(flights)
}