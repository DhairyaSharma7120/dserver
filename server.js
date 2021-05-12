const express = require('express');
const cors = require("cors");
const path = require('path')
require('dotenv').config();
const mongoose = require('mongoose');
const doc = require('./config/schema'); // importing schema of document
const app = express()
const port = process.env.PORT || 8000; 
var fs = require('fs')
var multer  = require('multer')

var filename = './url-id.json'
var jsonData = require('./url-id.json')
app.use(express.json());
app.use(cors());

// importing database connection file
const { conn } = require('./config/dbConnection');
const { json } = require('express');
conn(); //calling function to connect db


var con = mongoose.connection;
app.get('/', (req,res)=>{
    res.send("hello Api is Working", Math.random())
})





app.get('/req', (req,res) => {
  
    doc.find({},function(err, data) {
      if(err){
          console.log(err);
      } 
      else{
          res.send(data);
      }
  });  
    // res.send("working")
});






app.post('/delete',(req,res)=>{
  // console.log(req.body.shortUrl);  
  doc.deleteOne({ user: req.query.shortUrl }, function (err) {
    if (err) return handleError(err);
    res.send({success:true})
    // deleted at most one tank document
  });
  
})

const handleError = (err)=>{
  return { success:false,error:err } 
}





app.post('/writeJson',(req,res)=>{
  res.send("Done")
  console.log(jsonData['url-id'])

  jsonData['url-id']+=1;
fs.writeFile(filename, JSON.stringify(jsonData), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(jsonData));
  console.log('writing to ' + filename);
  console.log('---Done----- ' + filename);
  
});
})

app.get(`/@`,(req,res)=>{
  let p = req.query.p
  // res.send(`this is the p ${p}`)
  res.redirect(`https://app.example.io/${p}`);
})



//Inserting Data in the database
app.post('/insert', (req, res) => {
  // console.log(req.body," this is req we are getting")
    var newDoc = new doc({
      url: req.body.url,
      shortUrl: `dshort@?id=${jsonData['url-id']}.com`,
    })
    console.log(newDoc)
    newDoc.save((err,data)=>{
      if(err) console.log(err);
      else console.log("Data inserted")
    })
    // console.log(newDoc)
    res.json(jsonData['url-id']); 
  });

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      var extensionArray = file.originalname.split('.')
      var extension = extensionArray[extensionArray.length-1]
      console.log()
      callback(null, Date.now()+"-"+"personalUpload"+"."+extension);
    }
  });
  var upload = multer({ storage : storage }).array('file',10);
  app.post('/uploadFile',function(req,res){
    upload(req,res,function(err) {
        // console.log(req.body);
        console.log(req.files);
        if(err) {
            return res.send({success: false});
        }
        console.log("working")
        res.send({success: true});
    });
});



app.listen(port,()=>{
    console.log(`Server is now running on port : ${port}`)
  })