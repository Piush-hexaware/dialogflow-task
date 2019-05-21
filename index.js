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
  let url="https://dev-azxluogv.auth0.com/login?state=g6Fo2SBqM1hBS0UzY0V1TlB4anVjQ0p5Nmw1QjRfLWpmZlVucaN0aWTZIEllR1ptd1l6WmlBNjBvRXdndXJMcE0yQW1qM0pvYnhUo2NpZNkgajJpUklfTmpLd2Q3RXpRZFo0YWtTTWwyb1RXamNvQkw&client=j2iRI_NjKwd7EzQdZ4akSMl2oTWjcoBL&protocol=oauth2&prompt=consent&response_type=code&redirect_uri=https%3A%2F%2Foauth-redirect.googleusercontent.com%2Fr%2Flocate-2dd42&scope=openid%20profile%20email%20offline_access"
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





