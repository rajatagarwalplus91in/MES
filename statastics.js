const http = require('http');
const dotenv = require('dotenv'); 
dotenv.config();
const jwt = require('jsonwebtoken'); 
const axios = require('axios');
const express = require('express');
const app = express();
var async = require("async"); 
const base_url = 'http://192.168.68.48:';

async function token(){
    let jwtSecretKey = process.env.JWT_SECRET;
    let data = {}
    const token = jwt.sign(data, jwtSecretKey,{expiresIn: '60m'}); 
    //console.log(token);  
    return token;
}

app.get('/stats/clients_growth',async (req,res)=>{
    let stoken = await token();
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+stoken
        }
      };
    axios.get(base_url+"5000/api/admins/clients/",options).then(function(response) {
        //console.log(response); 
        data1 = response.data; 
        res.status(response.status).send(data1);
      }).catch(function(error) {
        //console.log(error);
        res.send(error.response.data)
      }) 
    
    
})

app.listen(5056, () => {
    console.log('Our express server is up on port 5056');
});
    

