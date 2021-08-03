const mongoose = require('mongoose');
const Msg = require('./models/messages'); 
const mongoDB = 'mongoDB://localhost:27017/mydbase';
mongoose.connect(mongoDB,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log('db is connected');
}).catch((err)=>{
    console.log(err)
})
const express = require('express');
const app = express();
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000;


http.listen(PORT,() =>{
    console.log(`server is running ${PORT}`);
});

app.use(express.static(__dirname + '/public'))


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');    //sending html file to server
    console.log(req.url);
});


const io = require('socket.io')(http)   //socket.io

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

