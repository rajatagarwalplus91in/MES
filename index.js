require( 'dotenv' ).config();
require('log-timestamp');
// Initialize DB Connection
require( './config/database' );

const config = require( './config/config' ).getConfig(),
    PORT = config.PORT;

console.log( '✔ Bootstrapping Application' );
console.log( `✔ Mode: ${config.MODE}` );
console.log( `✔ Port: ${PORT}` );
 
const { server } = require( './config/server' );

if (config.HTTPS == 'true') {
	var https = require('https');
	var fs = require('fs');
	var privateKey = fs.readFileSync( config.HTTPS_PRIVATEKEY);
	var certificate = fs.readFileSync( config.HTTPS_CERT );
	var ca = fs.readFileSync( config.HTTPS_CACHAIN );


	https.createServer({
		key:fs.readFileSync( config.HTTPS_PRIVATEKEY,path(__dirname, cert, key.pem)),
		cert: fs.readFileSync( config.HTTPS_CERT,path(__dirname, cert, cert.pem) ),
		ca: ca
	}, server).listen(PORT).on( 'error', ( err ) => {
	    console.log( '✘ Application failed to start' );
	    console.error( '✘', err.message );
	    process.exit( 0 );
	} ).on( 'listening', () => {
	    console.log( '✔ Secure HTTPS Application Started' );
	} );

} else {
	server.listen(PORT).on( 'error', ( err ) => {
	    console.log( '✘ Application failed to start' );
	    console.error( '✘', err.message );
	    process.exit( 0 );
	} ).on( 'listening', () => {
	    console.log( '✔ HTTP Application Started' );
	} );
}




module.exports = { server };
