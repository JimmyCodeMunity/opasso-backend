const express = require('express');

require('dotenv').config();


const app = express();

const cors = require('cors');


app.use(cors())


//allow json requests to be sent to the server
app.use(express.json())

//allow url encoded for from input
app.use(express.urlencoded({extended:false}))


if(process.env.NODE_ENV !== 'PRODUCTION'){
    require("dotenv").config({
      path:"./.env"
    })
  }


  const port = process.env.PORT;

app.listen(port,(req,res) => {
    console.log(`Server running on port ${port}`)
})


app.get('/',(req,res)=>{
    res.send('Server started')
})
