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

// restService.post("/cal",function(req,res){
// console.log("received a post request");
// if(!req.body) return res.sendStatus(400);
// res.setHeader('Content-Type','application/json');
// console.log("here is the post request from dialogflow");
// console.log("request body " + JSON.stringify(req.body));
// console.log("parameter form dilaogflow " + req.body.queryResult.parameters['first_number']);
// console.log("parameter form dilaogflow " + req.body.queryResult.parameters['second_number']);
// console.log("intent name form dilaogflow " + req.body.queryResult.intent['displayName']);

// var first_number = parseInt(req.body.queryResult.parameters['first_number'])
// var second_number = parseInt(req.body.queryResult.parameters['second_number'])

// // if (req.body.queryResult.intent['displayName'] == "addition")
// // {
//   result = first_number + second_number
//   responseObj=

//   {
//     "payload": {
//       "google": {
//         "expectUserResponse": true,
//         "richResponse": {
//           "items": [
//             {
//               "simpleResponse": {
//                 "textToSpeech": "Choose a item"
//               }
//             }
//           ]
//         },
//         "systemIntent": {
//           "intent": "actions.intent.OPTION",
//           "data": {
//             "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
//             "listSelect": {
//               "title": "Hello",
//               "items": [
//                 {
//                   "optionInfo": {
//                     "key": "first title key"
//                   },
//                   "description": "first description",
//                   "image": {
//                     "url": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
//                     "accessibilityText": "first alt"
//                   },
//                   "title": "first title"
//                 },
//                 {
//                   "optionInfo": {
//                     "key": "second"
//                   },
//                   "description": "second description",
//                   "image": {
//                     "url": "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw",
//                     "accessibilityText": "second alt"
//                   },
//                   "title": "second title"
//                 }
//               ]
//             }
//           }
//         }
//       }
//     }
//   }








  // {
  //   "payload": {
  //     "google": {
  //       "expectUserResponse": true,
  //       "richResponse": {
  //         "items": [
  //           {
  //             "simpleResponse": {
  //               "textToSpeech": "addition of "+ first_number + " and " + second_number + " is "  + result
  //             }
  //           }
  //         ]
  //       }
  //     }
  //   }
  // }
// }

// else if(req.body.queryResult.intent['displayName'] == "subtraction"){
//   result = second_number - first_number ;
  
//   responseObj=
//   {
//     "payload": {
//       "google": {
//         "expectUserResponse": true,
//         "richResponse": {
//           "items": [
//             {
//               "simpleResponse": {
//                 "textToSpeech": "subtraction of "+ first_number + " from " + second_number + " is "  + result
//               }
//             }
//           ]
//         }
//       }
//     }
//   }
// }
// console.log("response data " + JSON.stringify(responseObj));
// return res.json(responseObj);

// });

restService.post("/cal",function(req,res){
console.log("context data ",JSON.stringify(req.body))
  // console.log("received a post request",req.body);
  if(!req.body) return res.sendStatus(400);
  res.setHeader('Content-Type','application/json');
  // console.log("here is the post request from dialogflow");
  // console.log("request body " + JSON.stringify(req.body));
  // console.log("parameter form dilaogflow " + req.body.queryResult.parameters['first_number']);
  // console.log("parameter form dilaogflow " + req.body.queryResult.parameters['second_number']);
  // console.log("intent name form dilaogflow " + req.body.queryResult.intent['displayName']);
  console.log("context data ",JSON.stringify(req.body))

  var first_number = parseInt(req.body.queryResult.parameters['first_number'])
  var second_number = parseInt(req.body.queryResult.parameters['second_number'])
  
    result = second_number + first_number ;
    
    responseObj= {
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": "Choose a item"
                }
              },
              {
                "carouselBrowse": {
                  "items": [
                    {
                      "title": "Title of item 1",
                      "description": "Description of item 1",
                      "footer": "Item 1 footer",
                    },
                    {
                      "title": "Title of item 2",
                      "openUrlAction": {
                        "url": "https://google.com"
                      },
                      "description": "Description of item 2",
                      "footer": "Item 2 footer",
                      "image": {
                        "url": "https://developers.google.com/actions/assistant.png",
                        "accessibilityText": "Google Assistant Bubbles"
                      }
                    }
                  ]
                }
              }
            ]
          },
          "userStorage": "{\"data\":{}}"
        }
      },
      "outputContexts": [
        {
          "name": "projects/temperatureconvertersample/agent/sessions/518488a5-09f6-4a36-8950-942f595b70b8/contexts/_actions_on_google",
          "lifespanCount": 99,
          "parameters": {
            "data": "{}"
          }
        }
      ]
    }
   
  
  console.log("response data " + JSON.stringify(responseObj));
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




// restService.post('/cal', function (req, res) {

//   if(req.body.queryResult.intent['displayName']=="addition")
//   res.redirect(307,'https://calcl-app.herokuapp.com/addition')

  
//   // var redirectUrl = 'http://localhost:8000/'+req.body.queryResult.intent['displayName']; 
//   // console.log('redirectUrl',redirectUrl)
//   // //console.log('redirectUrl',redirectUrl);
//   //  res.redirect(307,'/addition');			
//   // console.log("url redirected");
// });


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});





