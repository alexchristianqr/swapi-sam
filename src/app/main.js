require("dotenv").config({ path: "./.env.local" })

/**
 * Express
 */
const { Environment } = require("../config.env.js")
const express = require("express")
const app = express()
const morgan = require('morgan')

/**
 * Middleware
 */
app.use(morgan('tiny'))
app.set("trust proxy", true)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(express.static("public"))

/**
 * Router
 */
app.get("/sayhello", (req, res) => {
  return res.status(500).send({ message: "Hola mundo..." })
})

/**
 * Listen port
 */
const port = Environment.PORT
app.listen(port, () => {
  console.log(`Server nodejs started in ${Environment.HOST}:${Environment.PORT}`)
})

/**
 * Logs
 */
if (Environment.NODE_ENV === "production") {
  console.log = function () {}
}

module.exports = app
