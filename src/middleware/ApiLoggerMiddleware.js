'use strict';

var jwt = require('jsonwebtoken');

const { EmailApiLog } = require( '../models/EmailApiLog.js' );
const uuid = require('node-uuid');

const fs = require('fs');

const config = process.env;

module.exports = { 
    handle: async function (req, res, next) {
        let dtRequestTime = new Date();
        next();
        let oLogData = {
            'dtRequestTime': dtRequestTime,
            'sEndpoint': req.path,
            'sHeaders': req.headers,
            'sClientID': req.sClientID,
            'sRequestType': req.method,
            'sRequestBody': req.body,
            'sResponseBody': res.body,
            'sResponseCode': res.statusCode,
            'sIP': req.ip,
            'sUserAgent': {
                browser: req.useragent.browser,
                os: req.useragent.os,
                platform: req.useragent.platform,
                source: req.useragent.source
            }
        }

        try {
            let filename = "logs/api/"+uuid.v4()+".txt";
            await fs.promises.writeFile(filename, JSON.stringify(oLogData, null, 4), 'utf8');
        } catch (err) {
            console.error(err);
        }

    }
 };