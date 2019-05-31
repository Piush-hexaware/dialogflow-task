"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
var responseObj;
restService.use(bodyParser.json());

restService.post("/api",function(req,res){
console.log("received a post request"+ JSON.stringify(req.body));
if(!req.body) return res.sendStatus(400);
res.setHeader('Content-Type','application/json');
if(req.body.queryResult.queryText == "GOOGLE_ASSISTANT_WELCOME") {
  responseObj=
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
}
  else {
  {
  responseObj={"payload": {
    "google": {
      "expectUserResponse": true,
      "systemIntent": {
        "intent": "actions.intent.PERMISSION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.PermissionValueSpec",
          "optContext": "To deliver your order",
          "permissions": [
            "NAME",
            "DEVICE_PRECISE_LOCATION"
          ]
        }
      }
    }
  }
}}
  }
console.log("response data " + JSON.stringify(responseObj));
return res.json(responseObj);

});


restService.listen(process.env.PORT || 4000, function() {
  console.log("Server up and listening");
});




