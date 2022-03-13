var express = require("express");
var body_parser = require("body-parser");
var cookie_parser = require("cookie-parser");
var multer = require("multer");
var fs = require("fs");


var app=express();
app.use(cookie_parser());
app.use(multer({dest:'./public'}).any());
app.use(body_parser.urlencoded({extended:false}));

app.get("/",function(req,res){
    // if(req.cookies.usertype == "admin"){
    //     res.redirect("/dashboard");
    // }
    res.sendFile(__dirname+"/index.html");
})

app.get("/login",function(req,res){
//    console.log(req.query.username);
    if(req.query.username=="nilesh" && req.query.password=="nilesh"){
        res.cookie("user","nilesh");
        res.redirect("/dashboard");
        console.log("Success");
    }
    else{
        res.redirect("/");
    }
   res.end();
})

app.get("/dashboard",function(req,res){
  if(req.cookies.user != "nilesh"){
      res.redirect("/");
  }
    res.sendFile(__dirname+"/dashboard.html");
})

app.post("/upload", function(req,res){
    console.log(req.files[0].filename);
    fs.writeFileSync("myfile.txt", fs.readFileSync(req.files[0].path));
    console.log("file uploaded");
    res.end();
})


var server = app.listen(8081,function(){
    console.log("page is ready");
})
