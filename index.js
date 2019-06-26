"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const {google} = require("googleapis");
const key = require("./daily-news-codelab-9b75c23bcafa.json");
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  [
      "https://www.googleapis.com/auth/actions.fulfillment.conversation"
  ],
  null
);

restService.post("/api",function(req,res){
console.log("received a post request"+ JSON.stringify(req.body));
if(!req.body) return res.sendStatus(400);
res.setHeader('Content-Type','application/json');
let responseObj= null;
  if(req.body.queryResult.intent.displayName=="Default Welcome Intent"){
  return res.json( {
  "data": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "Choose a item"
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": "first title"
                },
                "description": "first description",
                "image": {
                  "url": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                  "accessibilityText": "first alt"
                },
                "title": "first title"
              },
              {
                "optionInfo": {
                  "key": "second"
                },
                "description": "second description",
                "image": {
                  "url": "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw",
                  "accessibilityText": "second alt"
                },
                "title": "second title"
              }
            ]
          }
        }
      }
    }
  }
})  
  }
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
  
jwtClient.authorize((err, tokens) => {
  const options = {
      userNotification: {
          title: "Hi I am Piyush !"
      },
      target: {
          userId: req.body.originalDetectIntentRequest.payload.user.userId,
          intent: "Latest News",
          locale: "en-US"
      }
  };
  request.post("https://actions.googleapis.com/v2/conversations:send", {
      auth: {
          "bearer": tokens.access_token
      },
      json: true,
      body: {
          customPushMessage: options
     }
  }, (err, response, body) => {
    console.log("body"+ JSON.stringify(body))
     console.log("status code : "+response.statusCode + "\nstatus : " + response.statusMessage);
     responseObj= {
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": "Thank you ! you will get notification"
                }
              }
            ]
          }
        }
      }
    }
  });
});
}

console.log("response data " + JSON.stringify(responseObj));
return res.json(responseObj);
});


restService.listen(process.env.PORT || 4000, function() {
  console.log("Server up and listening");
});
