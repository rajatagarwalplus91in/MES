 //  db.USER.aggregate([{$match: { Country: {State:{city:'pune'}}}}]);
 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("RAJAT");
  /*Return only the documents with the address "Park Lane 38":*/
  var query = [{$match: { Country: {State:{city:'pune'}}}}];
  dbo.collection("USER").aggregate([{$match: { Country: {State: {city:'pune'}}}}]).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

              
