
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pmahi1627_db_user:olkIclZgqxQR4dBp@cluster0.nipbtch.mongodb.net/?appName=Cluster0').then((res)=>{
    console.log('Database connected successfully')
}).catch(err =>{
    console.log('Error',err)
})



//olkIclZgqxQR4dBp

//pmahi1627_db_user

//mongodb+srv://pmahi1627_db_user:<db_password>@cluster0.nipbtch.mongodb.net/?appName=Cluster0