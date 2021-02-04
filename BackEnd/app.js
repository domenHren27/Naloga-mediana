require('dotenv').config()
const express = require('express')
const cors = require('cors')
//Vzpostavitev povezave z DB-jem
const db = require('./app/models/db')
const apiRoutes = require('./app/routes/api')

var corsOptions = {
    origin: "http://localhost:3000"
  };

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

//checkConnection;
db.checkConnection().then(result => console.log(result), app.listen(process.env.PORT || 3001))
.catch(err => console.log(err))

//api route
app.use('/api', apiRoutes);


app.use((req, res) => {
    res.status(404)
})