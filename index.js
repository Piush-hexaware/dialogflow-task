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

restService.post("/cal",function(req,res){

console.log("received a post request");
if(!req.body) return res.sendStatus(400);
res.setHeader('Content-Type','application/json');
console.log("here is the post request from dialogflow");
console.log(req.body);
console.log("parameter form dilaogflow " + req.body.queryResult.parameters['first_number']);
console.log("parameter form dilaogflow " + req.body.queryResult.parameters['second_number']);
console.log("parameter form dilaogflow " + req.body.queryResult.parameters['addition']);

logger.log("here i am using logger");

var first_number = parseInt(req.body.queryResult.parameters['first_number'])
var second_number = parseInt(req.body.queryResult.parameters['second_number'])

console.log("typr of first number is " + typeof first_number);
console.log("typr of second number is " + typeof second_number);

var result = first_number + second_number

console.log("additon of two number is " + result);


let response =" ";
let w ="my name is piyush";
let responseObj={
 
  "fulfillmentText" : response
  ,"fulfillmentMessages":[{"text": { "text": [w] }} ]
  ,"source":"" 
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
