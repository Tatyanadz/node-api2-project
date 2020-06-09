const express = require("express")
const cors = require("cors")
const posts = require("./data/db")
const routers = require("./posts/routers")

const server = express()
const port = 4000

server.use(express.json())
server.use(cors())
server.use("/posts", routers)



server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})


// create endpoint that returns all the posts for a user
// create endpoint for adding a new post for a user

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})