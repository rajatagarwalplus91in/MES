// Importing express module
const express = require('express');
const jwt = require('jsonwebtoken'); 
const app = express();
const dotenv = require('dotenv'); 
dotenv.config();
let cors = require("cors");
app.use(cors());
app.use(express.json());

app.post('/admins/token', (req, res) => { 
    const username = req.body.username;
    const password = req.body.password; 
	if(username == process.env.Admin_username){
		if(password == process.env.Admin_Password){
			let jwtSecretKey = process.env.JWT_SECRET;
        	let data = {}
        	const token = jwt.sign(data, jwtSecretKey,{expiresIn: '60m'});
        	response = JSON.stringify({'token':token,statusCode: 200});
        	res.status(200).send(response);
		}else{
			response = JSON.stringify({'message':'Invalid Password',statusCode: 401});
			res.status(401).send(response);
		}
	}else{
		response = JSON.stringify({'message':'Invalid Username or password',statusCode: 401});
		res.status(401).send(response);
	}
});

app.listen(5050, () => {
console.log('Our express server is up on port 5050');
});
