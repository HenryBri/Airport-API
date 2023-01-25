require("dotenv").config()
const app = require('express')()
const port = process.env.APP_PORT
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');

app.get('/airports', (req, res) => {
    res.send(["Arlanda","Heathrow"])
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})