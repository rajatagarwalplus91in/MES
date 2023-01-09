'use strict';

var jwt = require('jsonwebtoken');

const config = process.env;

module.exports = { 
    handle: async function (req, res, next) {
        
        var sAuthorizationHeader = req.headers.authorization;

        if (!sAuthorizationHeader) {
            return res.status(403).send({
                'StatusCode':403,
                'Error':"A token is required for authentication"});
        }

        const token = sAuthorizationHeader.split(" ")[1];

        if (!token) {
            return res.status(403).send({
                'StatusCode':403,
                'Error':"A token is required for authentication"});
        }
        
        try {
            
            const decoded = jwt.verify(token, config.JWT_SECRET);
        } catch (err) {
            return res.status(401).send({
                'StatusCode':401,
                'Error':"Invalid Token"});
        }
        return next();
    }
 };