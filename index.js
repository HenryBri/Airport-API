require("dotenv").config()
const app = require('express')()
const port = process.env.APP_PORT
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

require("./routes/app_routes")(app)

// app.get("/flights", async(req, res)=>{
//     let connection
//     try {
//         connection = await pool.getConnection()
//         const rows = await connection.query("SELECT id, flight_nr FROM flights")
//         res.send(rows)
//     } catch (error) {
//         throw error
//     } finally {
//         if (connection) return connection.end()
//     }
// })

app.listen(port, async () => {
    await require("./db").sync()
    console.log(`API up at: http://localhost:${port}`)
})