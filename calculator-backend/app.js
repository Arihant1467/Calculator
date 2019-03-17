var express = require("express");
var app = express();
//var expressValidator = require("express-validator");
var bodyParser = require("body-parser");
var cors=require('cors');
//var session = require("express-session");
//var cookieParser = require("cookie-parser");


app.use(cors());

//body and cookie parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(cookieParser())


app.post("/evaluate",function(req,res){
    console.log("we are post request of evaluate");
    console.log(req.body);
    const text = req.body.text;
    var regexPattern = new RegExp('[a-zA-z!@#$^&<>%]');
    if(!regexPattern.test(text)){
        console.log("successfully evaluated");
        try {
            const evaluatedText = eval(text)
            console.log("Evaluated value",evaluatedText);
            res.status(200).json({
                'answer':evaluatedText,
                isSuccess:true
            });
        } catch (error) {
            res.status(200).json({
                'answer':"",
                isSuccess:false
            });		
        }
    }else{
        res.status(200).json({
            'answer':"",
            isSuccess:false
        });
    }
});

// app.post("/expression",function(req,res){
//     const expression = req.body.expression;
//     console.log(eval(expression));
// 	res.sendStatus(200);
// });

app.post("/expression",function(req,res){
    var exp = req.body.expression;
    var v = eval(exp);
    console.log(v);
    res.sendStatus(200);
});

app.listen(3301,function(){
console.log("Calculator backend has started to listen at http://localhost:3301/")
});
