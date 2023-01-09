'use strict';

var jwt = require('jsonwebtoken'); 
require('dotenv').config();

const config = process.env;

module.exports = { 
    handle: async function (req, res, next) {
        
        var aAttachments = req.body.aAttachments; 

        if (aAttachments.length > process.env.AttachmentLimit){
            return res.status(403).send("Attachment is over limit with Total Attachments " + sEmailBody.aAttachments.length + " Limit of attachments is " + process.env.AttachmentLimit);
        }

        for(let i = 0 ; i < aAttachments.length ; i++){
            if((4* Math.ceil(aAttachments[i].sFileContent.length / 3)*0.5624896334383812*0.000001)>process.env.AttachmentSize){
                return res.status(403).send("Attachment is over size ( " + i + "th File is Oversize )");
            }
        }
    return next();
    }
 };