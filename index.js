"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const {JWT} = require('google-auth-library');
const request = require('request');
const restService = express();



// {
//   "type": "service_account",
//   "project_id": "notification-c32a2",
//   "private_key_id": "80b677422d1127d1636d1fb3718239961f5c5163",
//   "private_key": "-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n",
//   "client_email": "",
//   "client_id": "110541901143281921091",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/notifications%40notification-c32a2.iam.gserviceaccount.com"
// }




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
if(req.body.queryResult.queryText == "GOOGLE_ASSISTANT_WELCOME") {

}
let jwtClient = new JWT(
  "notifications@notification-c32a2.iam.gserviceaccount.com", null, "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDR1CIlVD5B1CmGHtlnCpNSTNiIg8fQW+UB0khB93sOdtMJb72qYZouHcg4dmR68iCMQRWbuBUhKrzRxajsi8BypBmgZmNkHnPUygZcCIQ9dSS6CI0pOPrVpf0WXMfwwt1mHNBRylaaqMgM/VXukfTwJx6NsQn+l/MAsJfKGXth6lWQmXQQlY0iBS8xBWdOcgKJW6aVP223OlFPCBekUS2PqZu6R0cfHprNY7PfE0IlgNUFUwlcQVJqc0IhLki+gL+rPAjF+/8/d5AOGM/s6toN+a5JWS5QvGFXfz45LSEBVuHkwFSkMU4LCQwUqQkTAgYmfPnaha2QvC2P6jweluYNAgMBAAECggEAAI3h2UeEG+32M/xnntNc/QtPkDG0Evw0QS5i7TSbavnSo+ovrRMs9YwOwgspHScjEkyUMEwGIYn+13VAOwVuEmwzcj5SpI77D+p1SS7D3bKw7D+NdFWKHJ+b7LQ6sXJzpvlEw3cBlxG8UB3kCrKSIolBIifUVBeCpdEiShWj756ZNBRgkDLZJl7VVfZwz17bQFQB3feUwawwH9dFD3TqGNDgjkNpdmT/DzeGcqDMK4/WQZlRaw+4UHDX06y80vY89uJ7aCdb2cOPBXHtYSJYKVPufycHJQpA6rUD/Pk7jO5WUh5Y1+sj+fuCymdrZ9csk09Knv+FcRtK7ETVx470QKBgQD+fja0MKyqclzIWLcTJkq1ul6bsdG05lOneGwjEf9nO0hbQpfGGxnOtoknex8vLiHlims0FfJMfL8Sq9Sgo5OKOjZFJRf0Vq5xB+qK5T1U2q6xKFunaKznfee3pWIrVpS0B4jkYklkXfQBbpFJMXzybjso06v5FMp0u+BSZbl0XQKBgQDTEjaBGnjWrovzMdGi0lIB02bTRpQzaYKm/OZ2fANLOKLCKMOJYdEE5IRAc7VLnNY1o71hO202ukBj/kPsQg/eEosAofJee4COKlfKIfNB1b4qTW6yftR/6HPWgL0nHBDEpRKGMwOxkHLu8E3Vzs2JPZh65TEBfSICz7hgsvwdcQKBgDBefLcyqR6cLdZGRkV1ea2ghmrBGUJwpGWoFaV0vj44nj/6IC6e6ADJ4LeIRx0If5jI/icgJLU04HwD/J2reVdESRxLOIpQD0ecYY+UkluWVK2HJiRj\nWLmGzIuy+z2RbyHobLQ7mgdhdAbxpNtsdHr/SG8yC/WDZhdZvgDrJJxhAoGBAMP7gUhXACS2ZZQmifSZPTQcyrkaK7mhGoNbB9K0S4qox9doakdB4Aae+H2v8oKG2g9sPgfuWfYa8nbmPMM+g+U7an3n4VgBbNiUUHeLFofmo3A7/bEXOtCZUhW16+xIjvlIHO8mpyNUcKOT1XHVV9s6qj5SWTJ8sfvSS+zdxGLBAoGAcsixfRYRnEMJRd7SNadW1Hzo4i4sh6JzubVhxK8oUvwfEz/26e7kw34OIjbZi/dY3azsPmsK71QtYpn56i7tJBTR2Ya2Yx3E50mQezwCu2jsWFEsrIeuKXHHHH45U2edR+bPgGnyjfP1gLY64/mGHv5DWVaEzB7I/xoKlRBn9pY=",
  ['https://www.googleapis.com/auth/actions.fulfillment.conversation'],null);
jwtClient.authorize((authErr, tokens) => {
  let notification = {
    userNotification: {
      title: 'A new tip is added',
    },
    target: {
      userId: 'ABwppHHUnh9aX0b1Cz3k2itm34PUA3GHyDlNlstR269hqOv6yxrWYxazaPGYiqp42MqY_NrTPEw_g2j5GWc9fIEs',
      intent: 'Default Welcome Intent',
      // Expects a IETF BCP-47 language code (i.e. en-US)
      locale: 'en-US'
    },
  };

  request.post('https://actions.googleapis.com/v2/conversations:send', {
    'auth': {
      'bearer': tokens.access_token,
    },
    'json': true,
    'body': {
      'customPushMessage': notification
    },
  }, (reqErr, httpResponse, body) => {
    console.log("status code is "+httpResponse.statusCode + ': ' + httpResponse.statusMessage);
  });
});
});


restService.listen(process.env.PORT || 4000, function() {
  console.log("Server up and listening");
});




// responseObj=  {"payload": {
//   "google": {
//     "expectUserResponse": true,
//     "systemIntent": {
//       "intent": "actions.intent.PERMISSION",
//       "data": {
//         "@type": "type.googleapis.com/google.actions.v2.PermissionValueSpec",
//         "optContext": "Hi! Welcome to Actions on Google! \nI can send you alerts. Would you like that?",
//         "permissions": [
//           "NAME",
//           "DEVICE_PRECISE_LOCATION"
//         ]
//       }
//     }
//   }
// }
// }
