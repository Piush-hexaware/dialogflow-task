"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());


restService.get("/authorize",function(req,res){
console.log("authorize call",JSON.stringify(req.body.client_id))
  });
  


restService.post("/token",function(req,res){
console.log("token call ",JSON.stringify(req.body)) 
  });


restService.post("/redirect",function(req,res){
console.log(" redirect data call ",JSON.stringify(req.body)) 
  });


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});





