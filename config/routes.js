'use strict';
const express = require( 'express' );
const path = require( 'path' );
const { HttpError } = require( '../system/helpers/HttpError' );
const apiRoutes = require( '../system/routes' );

module.exports.setRoutes = ( app ) => {

    /**
     * Application Root Route.
     * Set the Welcome message or send a static html or use a view engine.
     */
    app.get( '/', ( req, res ) => {
        res.send( 'Welcome to the App!' );
    } );

    /**
     * API Route.
     * All the API will start with "/api/[MODULE_ROUTE]"
     */
    app.use( '/api', apiRoutes );

    /**
     * If No route matches. Send user a 404 page
     */
    app.use( '/*', ( req, res ) => {
        const error = new Error( 'Requested path does not exist.' );

        error.statusCode = 404;
        res.status( error.statusCode ).json( new HttpError( error ) );
    } );
};
