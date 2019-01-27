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
var responseObj;
var response =" ";

restService.post("/cal",function(req,res){
console.log("received a post request");
if(!req.body) return res.sendStatus(400);
res.setHeader('Content-Type','application/json');
console.log("here is the post request from dialogflow");
console.log(req.body);
console.log("parameter form dilaogflow " + req.body.queryResult.parameters['first_number']);
console.log("parameter form dilaogflow " + req.body.queryResult.parameters['second_number']);
console.log("parameter form dilaogflow " + req.body.queryResult.parameters['addition']);



var first_number = parseInt(req.body.queryResult.parameters['first_number'])
var second_number = parseInt(req.body.queryResult.parameters['second_number'])

if (req.body.queryResult.parameters['addition'] == "add")
{
  result = first_number + second_number
  responseObj={
    "fulfillmentText" : response
    ,"fulfillmentMessages":[{"text": { "text": ["addition of "+ first_number + "and " + second_number + "is "  + result] }} ]
    ,"source":"" 
  }
}

else if(req.body.queryResult.parameters['subtraction'] == "sub"){
  result = second_number - first_number ;
  responseObj={
    "fulfillmentText" : response
    ,"fulfillmentMessages":[{"text": { "text": ["subtraction of "+ first_number + "and " + second_number + "is "  + result] }} ]
    ,"source":"" 
  }
}
console.log("response data " + responseObj);
return res.json(responseObj);

});



// restService.post("/cal", function(req, res) {
  
//   if (req.body.result.parameters.addition == "add"){
//     result =
//     req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.first_number
//       ? parseInt(req.body.result.parameters.second_number )+ parseInt(req.body.result.parameters.first_number)
//       : "Seems like some problem from addition. Speak again.";
//   }

//   else if(req.body.result.parameters.subtraction == "sub")
//   {
//     result =
//     req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.first_number
//       ? req.body.result.parameters.second_number - req.body.result.parameters.first_number
//       : "Seems like some problem for subtraction. Speak again.";
//   }


//   return res.json({
//     speech: result,
//     displayText: result,
//     source: "calc-app"
//   });
// });

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});