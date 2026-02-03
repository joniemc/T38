const express = require('express');
const app = express();
const PORT = 3000;

const users = [{usuario:'Jonie Miralda', edad:'33'},{usuario:'Hugo Duron', edad:'35'},{usuario:'Oscar Ucles', edad:'40'}];
app.get('/usuarios',(req, res)=>{
    
    res.json({status:200,message:'Success', data: users});
});

app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});