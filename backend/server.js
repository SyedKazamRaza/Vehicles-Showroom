const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('I am server');
})

const port = 5000 || process.env.port;
app.listen(port,()=>{
    console.log('Server is running at port ' + port);
})