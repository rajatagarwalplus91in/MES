// Importing express module
const express = require('express');
const jwt = require('jsonwebtoken'); 
const app = express();
const dotenv = require('dotenv'); 
dotenv.config();
let cors = require("cors");
app.use(cors());
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"; 
var url1 = "mongodb://localhost:27017/MES"; 
app.get('/admins/stats/clients_growth', (req, res) => { 
    MongoClient.connect(url ,{ useUnifiedTopology: true },function(err, db){
        if (err) throw err;
        var dbo = db.db("MES");  
        dbo.collection("clients")
        .aggregate([ { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, sClient_TotalCount: { $sum: 1 } } }]).sort({createdAt:1}).toArray(function(err, result) {
          if (err) throw err;  
          //sortDemo(result);
          res.status(200).send({"error": "false",
          "StatusCode": 200,
          "data":result});          
          db.close();
        }); 
      });
});

app.get('/admins/stats/cg',(req,res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
    var dbo = db.db("MES");
    var cursor = dbo.collection('clients').aggregate([ { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, sClient_TotalCount: { $sum: 1 } } }]).sort({createdAt:1});
    cursor.toArray(function(err, doc) {
      if(err) {throw err};
      //console.log(doc);
      res.send(doc);
    });
});
});

app.get('/admins/stats/client_utilizations', (req,res) => {
    MongoClient.connect(url, { useUnifiedTopology: true },function(err, db){
        if (err) throw err;
        var dbo = db.db("MES");
        dbo.collection("emails").aggregate([{$group:{ _id: "$sClientID" , total_emails: { $sum: 1 } } }]).toArray(function(err, result){
              if (err) throw err; 
                res.status(200).send({"error": "false",
                "StatusCode": 200,
                "data":result});
                db.close();
            });
    });
});

app.get('/admins/stats/emails_Sent', (req,res) => {
     MongoClient.connect(url ,{ useUnifiedTopology: true },function(err, db){
        if (err) throw err;
        var dbo = db.db("MES");  
        dbo.collection("emails").aggregate([ { $match: 
            {"sEmailStatus" :"Sent" }},{ $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, iEmails_total: { $sum: 1 } } }]).toArray(function(err, result) {
          if (err) throw err; 
          res.status(200).send({"error": "false",
          "StatusCode": 200,
          "data":result});
          db.close();
        }); 
      });
});

app.get('/admins/stats/emails_Failed', (req,res) => {
    MongoClient.connect(url ,{ useUnifiedTopology: true },function(err, db){
       if (err) throw err;
       var dbo = db.db("MES");  
       dbo.collection("emails").aggregate([ { $match: 
           {"sEmailStatus" :"Failed" }},{ $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, iEmails_total: { $sum: 1 }} }]).toArray(function(err, result) {
         if (err) throw err; 
         res.status(200).send({"error": "false",
         "StatusCode": 200,
         "data":result});
         db.close();
       }); 
     });
});

app.get('/admins/stats/emails_Pending', (req,res) => {
    MongoClient.connect(url ,{ useUnifiedTopology: true },function(err, db){
       if (err) throw err;
       var dbo = db.db("MES");  
       dbo.collection("emails").aggregate([{ $match: 
        {"sEmailStatus" :"Pending" }},{$group:{ _id: { total_emails: { $sum: 1 } }} }]).toArray(function(err, result) {
            if (err) throw err; 
         res.status(200).send({"error": "false",
         "StatusCode": 200,
         "data":result});
         db.close();
       }); 
     });
});


app.get('/admins/stats/email_count', (req,res) => {
    MongoClient.connect(url ,{ useUnifiedTopology: true },function(err, db){
       if (err) throw err;
       var dbo = db.db("MES");  
       dbo.collection("emails").aggregate([{$group:{ _id:{ sEmailStatus: "$sEmailStatus" }  , total_emails: { $sum: 1 } } }]).sort({createdAt:-1}).toArray(function(err, result) {
         if (err) throw err; 
         console.log();
         res.status(200).send({"error": "false",
         "StatusCode": 200,
         "data":result});
         db.close();
       }); 
     });
});

app.listen(5055, () => {
    console.log('Our express server is up on port 5055');
    });
    