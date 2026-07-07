const express = require('express');
const app = express();
const PORT = 4000;
require('./conn');
app.use(express.json());
const UserRoutes = require('./Routes/user')
app.use('/api/user',UserRoutes)
app.listen(PORT,()=>{
    console.log('backend is running on port',PORT)
})