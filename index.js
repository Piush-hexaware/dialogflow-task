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
var fs 				= require("fs");

restService.get("/getfile/:data",function(req,res){
	console.log("inside call image"+req.params.data)
		fs.access(__dirname+"/"+req.params.data, fs.constants.F_OK, function(err){
			if(err){
				console.log("inside error")
        res.sendFile(__dirname+"/feedback.png")
			} else {
							console.log("inside success")

				res.sendFile(__dirname+"/"+req.params.data)
			}
		});

})

restService.post("/api",function(req,res){
console.log("received a post request"+ JSON.stringify(req.body));
if(!req.body) return res.sendStatus(400);
res.setHeader('Content-Type','application/json');
let responseObj= null;
  if(req.body.queryResult.intent.displayName=="Default Welcome Intent"){
  return res.json({
  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "This is a Basic Card:"
            }
          },
          {
            "basicCard": {
              "title": "Title: this is a title",
              "subtitle": "This is a subtitle",
              "formattedText": "This is a basic card.  Text in a basic card can include \"quotes\" and\n        most other unicode characters including emoji 📱.  Basic cards also support\n        some markdown formatting like *emphasis* or _italics_, **strong** or\n        __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other\n        things like line  \nbreaks",
              "image": {
                "url": "https://calcl-app.herokuapp.com/getfile/logout.png",
                "accessibilityText": "Google Logo"
              },
              "buttons": [
                {
                  "title": "Button Title",
                  "openUrlAction": {
                    "url": "https://www.google.com"
                  }
                }
              ],
              "imageDisplayOptions": "RED"
            }
          }
        ]
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
