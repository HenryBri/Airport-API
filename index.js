require("dotenv").config()
const app = require('express')()
const mariadb = require('mariadb')
const port = process.env.APP_PORT
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
})

app.get("/airports", async(req, res)=>{
    let connection
    try {
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT id, name FROM airports")
        res.send(rows)
    } catch (error) {
        throw error
    } finally {
        if (connection) return connection.end()
    }
})

app.get("/flights", async(req, res)=>{
    let connection
    try {
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT id, name FROM flights")
        res.send(rows)
    } catch (error) {
        throw error
    } finally {
        if (connection) return connection.end()
    }
})

app.get("/customers", async(req, res)=>{
    let connection
    try {
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT * FROM customers")
        console.log(rows)
        res.send(rows)
    } catch (error) {
        throw error
    } finally {
        if (connection) return connection.end()
    }
})

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})