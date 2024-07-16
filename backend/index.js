const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()

app.use(cors())
app.use(express.json());

// routers imported from router
app.use("/api/auth", require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));

// Server is running on port 5000 because we run react js on 3000, that's why we use 5000 port
app.listen(5000, () => {
    console.log('iNotebook backend listening at http://localhost:5000');
})
  
