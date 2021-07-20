const {Server} = require("socket.io")
const express = require("express")

const http = require("http")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = 3000

app.use(require("./render"))
app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render("index.html", {name: "Nathan"})
})

io.on("connection", (socket) => {
    console.log("a user connected")

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})

server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})