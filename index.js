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
var result;
restService.post("/echo", function(req, res) {
  
  if (req.body.result.parameters.addition == "add"){
    result =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.first_number
      ? parseInt(req.body.result.parameters.second_number )+ parseInt(req.body.result.parameters.first_number)
      : "Seems like some problem from addition. Speak again.";
  }

  else if(req.body.result.parameters.subtraction == "sub")
  {
    result =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.first_number
      ? req.body.result.parameters.second_number - req.body.result.parameters.first_number
      : "Seems like some problem for subtraction. Speak again.";
  }


  return res.json({
    speech: result,
    displayText: result,
    source: "calc-app"
  });
});
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
