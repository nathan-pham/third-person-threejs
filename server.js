const {Server} = require("socket.io")
const express = require("express")

const http = require("http")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = 8080

app.get('/', (req, res) => {
    res.send("Hello World")
})

server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})