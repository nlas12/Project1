const port = 6789

const fs = require("fs")
const express = require("express")
const app = express()
app.use(express.static("public"))
const server = app.listen(port)

console.log(`Webserver is running on port ${port}.`)

const socket = require("socket.io")
const io = socket(server)

io.sockets.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`)

    let disconnect = () => {
        console.log(`Client ${socket.id} disconnected.`)
        }

        let getData = () => {
            fs.readFile("./data/boardgames_40.json", "utf8", (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            socket.emit("data",data)
            })
        }

    
    socket.on("disconnect", disconnect)

    socket.on("getData", getData)
})
