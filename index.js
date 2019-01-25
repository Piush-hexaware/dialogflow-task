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

restService.post("/echo", function(req, res) {
  // var speech =
  //   req.body.result &&
  //   req.body.result.parameters &&
  //   req.body.result.parameters.echoText
  //     ? req.body.result.parameters.echoText
  //     : "Seems like some problem. Speak again.";
var result;
  if(req.body.result )
  {
    var data=req.body.result.parameters.first_number;
    var data1=req.body.result.parameters.second_number;
    result = data + data1;
  }
  else{
    result =  "sorry data is wrong";
  }

  return res.json({
    speech: result,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
