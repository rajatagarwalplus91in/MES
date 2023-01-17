// Require mongoose module
const mongoose = require("mongoose");
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
// Set Up the Database connection
mongoose.connect("mongodb://localhost:27017/MES", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const schema = new mongoose.Schema({});


app.get('/admins/stats/clients_growth', (req, res) => { 
const Clients = mongoose.model('Clients',schema);
Clients 
  .aggregate([ 
    { $group: 
      { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, 
        sClient_TotalCount: { $sum: 1 } 
      } }])
  .sort({createdAt:-1})
	.exec((error, result) => {
		if (error) {
			console.log(error);
		} else { 
      res.status(200).send({"error": "false",
      "StatusCode": 200,
      "data":result});
		}
	})
});

app.get('/admins/stats/emails_data',(req,res)=>{
  const data=mongoose.model('emails',schema);
  data.aggregate([
    {
  
      "$group":  {
        "_id": 1,
        "iEmailCount_Success": {
          "$sum": {
            "$cond": {
              "if": {
                "$eq": [
                  "$sEmailStatus",
                  "Sent"
                ]
              },
              "then": 1,
              "else": 0
            }
          }
        },
        "iEmailCount_Pending": {
            "$sum": {
              "$cond": {
                "if": {
                  "$eq": [
                    "$sEmailStatus",
                    "Pending"
                  ]
                },
                "then": 1,
                "else": 0
              }
            }
          },
        "iEmailCount_Failded": {
          "$sum": {
            "$cond": {
              "if": {
                "$eq": [
                  "$sEmailStatus",
                  "Failed"
                ]
              },
              "then": 1,
              "else": 0
            }
          }
        }
      }
    },
    {
      "$project": {
        "_id": 0, 
        "iEmailCount_Success": 1,
        "iEmailCount_Failded": 1,
        "iEmailCount_Pending":1,
        "iEmailCount_Total":{"$sum":["$iEmailCount_Success","$iEmailCount_Failded","$iEmailCount_Pending"]},
      }
    }  
  ]).exec((error,result)=>{
    if(error){
      console.log(error);
    }else{
      console.log(result);
      res.status(200).send({"error": "false","StatusCode": 200,"data":result});
    }
  })
});

app.get('/admins/stats/emails_sent_fail',(req,res)=>{
  const emails= mongoose.model('emails',schema);
  emails.aggregate([
    {
  
      "$group": {
        "_id": {
          "id": {
            "$dateToString": {
              "date": "$createdAt",
              "format": "%Y-%m-%d"
            }
          }
        },
        "iEmailCount_Success": {
          "$sum": {
            "$cond": {
              "if": {
                "$eq": [
                  "$sEmailStatus",
                  "Sent"
                ]
              },
              "then": 1,
              "else": 0
            }
          }
        },
        "iEmailCount_Failded": {
          "$sum": {
            "$cond": {
              "if": {
                "$eq": [
                  "$sEmailStatus",
                  "Failed"
                ]
              },
              "then": 1,
              "else": 0
            }
          }
        }
      }
    },
    {
      "$project": {
        "_id": 0,
        "cDate": "$_id.id",
        "iEmailCount_Success": 1,
        "iEmailCount_Failded": 1
      }
    } 
    ,
    {
      "$sort":{
        "cDate":1
      }
    }
  ]).exec((error,result)=>{
    if(error){
      console.log(error);
    }else{
      console.log(result);
      res.status(200).send({"error": "false","StatusCode": 200,"data":result});
    }
  })
});

app.get('/admins/stats/sent_emails',(req,res)=>{
  const Clients = mongoose.model('emails',schema);
  Clients.find({"sEmailStatus":"Sent"}).count()
    .exec((error, result) => {
      if (error) {
        console.log(error);
      } else { 
        console.log(result);
        res.status(200).send({"error": "false","StatusCode": 200,"data":result});
      }
    })
});


app.get('/admins/stats/failed_emails',(req,res)=>{
  const Clients = mongoose.model('emails',schema);
  Clients.find({"sEmailStatus":"Failed"}).count()
    .exec((error, result) => {
      if (error) {
        console.log(error);
      } else { 
        console.log(result);
        res.status(200).send({"error": "false","StatusCode": 200,"data":result});
      }
    })
});

app.get('/admins/stats/pending_emails',(req,res)=>{
  const Clients = mongoose.model('emails',schema);
  Clients.find({"sEmailStatus":"Pending"}).count()
    .exec((error, result) => {
      if (error) {
        console.log(error);
      } else { 
        console.log(result);
        res.status(200).send({"error": "false","StatusCode": 200,"data":result});
      }
    })
});

app.get('/admins/stats/total_emails',(req,res)=>{
  const Clients = mongoose.model('emails',schema);
  Clients.find().count()
    .exec((error, result) => {
      if (error) {
        console.log(error);
      } else { 
        console.log(result);
        res.status(200).send({"error": "false","StatusCode": 200,"data":result});
      }
    })
});


app.get('/admins/stats/client_utilizations', (req,res) => {
  const emails = mongoose.model('emails',schema);
  emails.aggregate(
    [
        {
        $lookup:
            {
                from:"clients",
                localField:"sClientID",
                foreignField:"_id",
                as:"client"
            }
        },
        {
            $group:
            {
                _id:"$client.sClientName",
                "iEmailCount":{$sum:1}
            }
        },{
          $project:
          {
            "_id": 0,
            "sClientName": "$_id",
            "iEmailCount": 1, 
          }
        },{
          "$sort":{
            "iEmailCount":-1
          }
        }
    ])
	.exec((error, result) => {
		if (error) {
			console.log(error);
		} else { 
      res.status(200).send({"error": "false",
      "StatusCode": 200,
      "data":result});
		}
	}) 
});






app.listen(5055, () => {
  console.log('Our express server is up on port 5055');
  });
  