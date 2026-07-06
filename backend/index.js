const express = require('express');
const app = express();
const PORT = 4000;
require('./conn');

app.get('/',(req,res)=>{
    res.send({
        message: "Hi Welcome to our backend"
    })
})

app.listen(PORT,()=>{
    console.log('backend is running on port',PORT)
})