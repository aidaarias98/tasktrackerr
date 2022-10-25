import fs from "fs"; //importing fs
import express from "express"; //importing express

const app = express();
const port = 5000; //setting up port

//creating routes 

app.get("/", (req, res) => {
    res.writeHead(200, {"Content-Type":"text/html"});//allowing js to get our content 
    fs.readFile("./index.html", (err,data)=>{ //reading the enitre contents of the file
       res.write(data); //writing back a response to the client
        res.end(); //ending thie response
    });
});

app._router.get("/main.css", (req,res) => {
    res.writeHead(200, {"Content-Type":"text/css"});
    fs.readFile("./main.css", (err,data)=>{
       res.write(data);
        res.end();
    });
});

app._router.get("/app.js", (req,res) => {
    res.writeHead(200, {"Content-Type":"application/javascript"});
    fs.readFile("./app.js", (err,data)=>{
        res.write(data);
        res.end();
    });
});


//listening to the port server
app.listen(port,(err) => {
    if(err) throw err;
    console.log(`listening on port ${port}`);
});