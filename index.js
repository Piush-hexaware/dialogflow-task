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
let jwtClient = new JWT(
  "notifications@notification-c32a2.iam.gserviceaccount.com", null,"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDR1CIlVD5B1CmG\nHtlnCpNSTNiIg8fQW+UB0khB93sOdtMJb72qYZouHcg4dmR68iCMQRWbuBUhKrzR\nxajsi8BypBmgZmNkHnPUygZcCIQ9dSS6CI0pOPrVpf0WXMfwwt1mHNBRylaaqMgM\n/VXukfTwJx6NsQn+l/MAsJfKGXth6lWQmXQQlY0iBS8xBWdOcgKJW6aVP223OlFP\nCBekUS2PqZu6R0cfHprNY7PfE0IlgNUFUwlcQVJqc0IhLki+gL+rPAjF+/8/d5AO\nGM/s6toN+a5JWS5QvGFXfz45LSEBVuHkwFSkMU4LCQwUqQkTAgYmfPnaha2QvC2P\n6jweluYNAgMBAAECggEAAI3h2UeEG+32M/xnntNc/QtPkDG0Evw0QS5i7TSbavnS\no+ovrRMs9YwOwgspHScjEkyUMEwGIYn+13VAOwVuEmwzcj5SpI77D+p1SS7D3bKw\n7D+NdFWKHJ+b7LQ6sXJzpvlEw3cBlxG8UB3kCrKSIolBIifUVBeCpdEiShWj756Z\nNBRgkDLZJl7VVfZwz17bQFQB3feUwawwH9dFD3TqGNDgjkNpdmT/DzeGcqDMK4/M\nWQZlRaw+4UHDX06y80vY89uJ7aCdb2cOPBXHtYSJYKVPufycHJQpA6rUD/Pk7jO5\nWUh5Y1+sj+fuCymdrZ9csk09Knv+FcRtK7ETVx470QKBgQD+fja0MKyqclzIWLcT\nJkq1ul6bsdG05lOneGwjEf9nO0hbQpfGGxnOtoknex8vLiHlims0FfJMfL8Sq9Sg\no5OKOjZFJRf0Vq5xB+qK5T1U2q6xKFunaKznfee3pWIrVpS0B4jkYklkXfQBbpFJ\nMXzybjso06v5FMp0u+BSZbl0XQKBgQDTEjaBGnjWrovzMdGi0lIB02bTRpQzaYKm\n/OZ2fANLOKLCKMOJYdEE5IRAc7VLnNY1o71hO202ukBj/kPsQg/eEosAofJee4CO\nKlfKIfNB1b4qTW6yftR/6HPWgL0nHBDEpRKGMwOxkHLu8E3Vzs2JPZh65TEBfSIC\nz7hgsvwdcQKBgDBefLcyqR6cLdZGRkV1ea2ghmrBGUJwpGWoFaV0vj44nj/6IC6e\n6ADJ4LeIRx0If5jI/icgJLU04HwD/J2reVdESRxLOIpQD0ecYY+UkluWVK2HJiRj\nWLmGzIuy+z2RbyHobLQ7mgdhdAbxpNtsdHr/SG8yC/WDZhdZvgDrJJxhAoGBAMP7\ngUhXACS2ZZQmifSZPTQcyrkaK7mhGoNbB9K0S4qox9doakdB4Aae+H2v8oKG2g9s\nPgfuWfYa8nbmPMM+g+U7an3n4VgBbNiUUHeLFofmo3A7/bEXOtCZUhW16+xIjvlI\nHO8mpyNUcKOT1XHVV9s6qj5SWTJ8sfvSS+zdxGLBAoGAcsixfRYRnEMJRd7SNadW\n1Hzo4i4sh6JzubVhxK8oUvwfEz/26e7kw34OIjbZi/dY3azsPmsK71QtYpn56i7t\nJBTR2Ya2Yx3E50mQezwCu2jsWFEsrIeuKXHHHH45U2edR+bPgGnyjfP1gLY64/mG\nHv5DWVaEzB7I/xoKlRBn9pY=\n-----END PRIVATE KEY-----\n",
  ['https://www.googleapis.com/auth/actions.fulfillment.conversation'],null);
jwtClient.authorize((authErr, tokens) => {
  let notification = {
    userNotification: {
      title: 'A new tip is added',
    },
    target: {
      userId: 'ABwppHHUnh9aX0b1Cz3k2itm34PUA3GHyDlNlstR269hqOv6yxrWYxazaPGYiqp42MqY_NrTPEw_g2j5GWc9fIEs',
      intent: 'projects/notification-c32a2/agent/intents/060fd5df-a77f-4b32-a413-5c73b0e15eea',
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
