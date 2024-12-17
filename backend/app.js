const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

const mongodb = require("./db/mongodb");

const routes = require("./routes/router")

mongodb();

app.use("/api", routes);

app.listen(3000, function(){
  console.log('Server is ONLINE running on port 3000.')
})

