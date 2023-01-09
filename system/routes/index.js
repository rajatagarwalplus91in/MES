'use strict';
const express = require( 'express' );
const router = express.Router({mergeParams: true});
const pluralize = require( 'pluralize' );
const path = require( 'path' );

pluralize.addUncountableRule( 'media' );
pluralize.addUncountableRule( 'auth' );

const fs = require( 'fs' );
const { HttpError } = require( '../helpers/HttpError' );
const packageJson = require( '../../package.json' ),
    routesPath = path.resolve( `${__dirname}/../../src/routes` ),
    PATHS = fs.readdirSync( routesPath ),
    moduleMapper = [];

const useragent = require('express-useragent');

const ApiLogMiddleware = require('../../src/middleware/ApiLoggerMiddleware')
router.use(useragent.express());
    
router.use(ApiLogMiddleware.handle);

console.log( '✔ Mapping routes' );
PATHS.forEach( ( module ) => {
    if( module !== 'index.js' ) {
        const name = module.split( '.' )[ 0 ];
        if ( module.split( '.' )[1] == "js" ) {
            // eslint-disable-next-line global-require
            router.use( `/${pluralize.plural( name )}`, require( path.resolve( routesPath, module ) ) );
            moduleMapper.push( {
                'Module': name,
                'Route': `/${pluralize.plural( name )}`
            } );
        }
        else {
           const  subRoutesPath = path.resolve( `${__dirname}/../../src/routes/${name}/` ),
            subPATHS = fs.readdirSync( subRoutesPath );
            subPATHS.forEach( ( subModule ) => {
                if( subModule !== 'index.js' ) {
                    const subName = subModule.split( '.' )[ 0 ];
                    router.use( `/${pluralize.plural( name )}/${pluralize.plural( subName )}`, require( path.resolve( subRoutesPath, subModule ) ) );
                    moduleMapper.push( {
                        'Module': name,
                        'Route': `/${pluralize.plural( name )}/${pluralize.plural( subName )}`
                    } );    
                }
            });
        }
    }
} );


console.table( moduleMapper );

router.get( '/', ( req, res ) => {
    res.json( { 'status': true, 'message': `Welcome to ${packageJson.name} V ${packageJson.version}` } );
} );

router.use( '*', ( req, res, next ) => {
    // 404 handler
    const error = new Error( 'Resource not found' );

    error.statusCode = 404;
    next( error );
} );

router.use( ( err, req, res, next ) => {
    if( process.env.NODE_ENV !== 'production' ) {
        console.error( req.method, req.url, err.statusCode, err.message );
    }
    const error = new HttpError( err );

    res.status( error.statusCode );
    res.json( error );
    next();
} );
module.exports = router;
