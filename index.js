"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

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
let responseObj= null;
if(req.body.queryResult.intent.displayName == "Setup Push Notifications"){
  responseObj=  {"payload": {
    "google": {
      "expectUserResponse": true,
      "systemIntent": {
        "intent": "actions.intent.PERMISSION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.PermissionValueSpec",
          "optContext": "I can send you alerts. Would you like that?",
          "permissions": [
            "NAME",
            "DEVICE_PRECISE_LOCATION",
            "UNSPECIFIED_PERMISSION"
          ]
        }
      }
    }
  }
}
} else if (req.body.queryResult.intent.displayName == "Finish Push Notifications Setup"){
  console.log(" **userID**" + req.body.originalDetectIntentRequest.payload.user.userId)
  responseObj= {
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "Thank you ! " + req.body.originalDetectIntentRequest.payload.user.profile.displayName
              }
            }
          ]
        }
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