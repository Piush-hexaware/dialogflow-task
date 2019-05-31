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

restService.post("/api",function(req,res){
console.log("received a post request"+ JSON.stringify(req.body));
if(!req.body) return res.sendStatus(400);
res.setHeader('Content-Type','application/json');
let responseObj=
{
  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "Hi! Welcome to Actions on Google!"
            }
          },
          {
            "simpleResponse": {
              "textToSpeech": "I can send you alerts. Would you like that?"
            }
          }
        ],
        "suggestions": [
          {
            "title": "Alert me"
          }
        ]
      }
    }
  }
}


console.log("response data " + JSON.stringify(responseObj));
return res.json(responseObj);

});


restService.listen(process.env.PORT || 4000, function() {
  console.log("Server up and listening");
});




