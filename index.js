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
      ? req.body.result.parameters.second_number + req.body.result.parameters.first_number
      : "Seems like some problem. Speak again.";
  }

  else if(req.body.result.parameters.subtraction == "sub")
  {
    result =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.first_number
      ? req.body.result.parameters.number - req.body.result.parameters.number1
      : "Seems like some problem. Speak again.";
  }


  return res.json({
    speech: result,
    displayText: result,
    source: "webhook-echo-sample"
  });
});
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
