
const express = require('express'); 
const app = express(); 
app.use(express.json()); 
const SMail = require('./Smail');
const { Controller } = require( '../../system/controllers/Controller' );
const { EmailService } = require( '../services/EmailService' );
const { Email } = require( '../models/Email' );
const { response } = require('express');
const autoBind = require( 'auto-bind' ),
    email = new EmailService(
        new Email().getInstance()
    );

class EmailController extends Controller {

    constructor( service ) {
        super( service );
        autoBind( this );
    }

    async insert( req, res, next ) {
        req.params.sClientID = req.sClientID;
        if(req.body.bIsAsync == true){
            try {               
                const response = new SMail(req.body, req.params);
                super.insert( req, res, next);
                return res.json( response);
            } catch ( e ) {
                next( e );
            }
        }else{
            super.insert( req, res, next );
        }
    }

}


module.exports = new EmailController( email );