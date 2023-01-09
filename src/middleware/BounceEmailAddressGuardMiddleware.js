'use strict';

const { BounceEmailAddress } = require( '../models/BounceEmailAddress' );
const { Email } = require('../models/Email');

const config = process.env;

module.exports = { 
    handle: async function (req, res, next) {
        
        let sClientID = req.sClientID;
        let dtToday = new Date();

        let EmailObject = new Email().getInstance();

        console.log(req.body);
        let oEmail = new EmailObject(req.body);

        let aEmailIDs = oEmail.getAllEmailAddresses();        

        let iBounceCount = await new BounceEmailAddress().getInstance().find({
            $and: [
                {
                    $or: [
                        {
                            "bIsGlobalBounceStatus": true
                        },
                        {
                            "sClient" : sClientID
                        }
                    ]
                },
                {
                    $or: [
                        {
                            "bIsPermanentBounce": true
                        },
                        {
                            "dtBounceStatusTill": {
                                $gt: dtToday
                            } 
                        }
                    ]
                }
            ],
            sEmailAddress: {
                $in : aEmailIDs
            }
        }).countDocuments();


        if (iBounceCount > 0) {
            return res.status(401).send("Email Address is in bounce email address list");
        }
        
        return next();
    }
 };