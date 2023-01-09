'use strict';

var jwt = require('jsonwebtoken');

const { Client } = require( '../models/Client' );

const config = process.env;

module.exports = { 
    handle: async function (req, res, next) {
        
        var sAuthorizationHeader = req.headers.authorization;

        if (!sAuthorizationHeader) {
            return res.status(403).send("A token is required for authentication");
        }

        const token = sAuthorizationHeader.split(" ")[1];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        var oTokenData = jwt.decode(token);
        
        if (!oTokenData) {
            return res.status(403).send("Invalid Token Supplied");
        }
        var sClientID = oTokenData.sClientID;
        
        if (!sClientID) {
            return res.status(403).send("Invalid token");

        }

        var oClient;

        try {
            const oClientModel = new Client().getInstance();

            oClient = await oClientModel.findById(sClientID);

            if (!oClient) {
                console.log("Can't find Client %s!", sClientID);
                return res.status(403).send("Invalid client");
            }

        } catch (err) {
            console.log(err);
            return res.status(403).send("Invalid client");
        }
        try {
            
            const decoded = jwt.verify(token, oClient.sClientSecret);
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }

        req.sClientID = oClient._id;
        return next();
    }
 };