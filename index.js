require("dotenv").config()
const app = require('express')()
const port = process.env.APP_PORT
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

require("./routes/app_routes")(app)

app.listen(port, async () => {
    await require("./db").sync()
    console.log(`API up at: http://localhost:${port}`)
})