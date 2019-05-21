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


restService.get("/authorize",function(req,res){
console.log("authorize call",JSON.stringify(req.query))
  let url="https://oegesbot.auth0.com/login?state=g6Fo2SA0ZHBYNEtOV21tc3NlWnBfMF9JeUxubzg0WWVUTlRWUaN0aWTZIGVyQlptQnJmb3hkUllTLS1UeUdjV3AyUUVDZTlwNEswo2NpZNkgMmVCcVd0bFM5OUswNjdNUFg0OXluN0tJOFQ5NGhvTV8&client=2eBqWtlS99K067MPX49yn7KI8T94hoM_&protocol=oauth2&prompt=consent&response_type=code&redirect_uri=https%3A%2F%2Foauth-redirect.googleusercontent.com%2Fr%2Foeg-es-campus-admin&scope=openid%20profile%20email%20offline_access&connection=OegEsBotNew"
  res.redirect(307,url);
  });
  


restService.post("/token",function(req,res){
console.log("token call ",JSON.stringify(req.body)) 
  });


restService.post("/redirect",function(req,res){
console.log(" redirect data call ",JSON.stringify(req.body)) 
  });


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});





