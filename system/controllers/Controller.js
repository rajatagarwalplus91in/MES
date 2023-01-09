'use strict';
const autoBind = require( 'auto-bind' );

class Controller {

    /**
     * Base Controller Layer
     * @author Sunil Kumar Samanta
     * @param service
     */
    constructor( service ) {
        this.service = service;
        autoBind( this );
    }

    async getAll( req, res, next ) {
        try {
            const response = await this.service.getAll( req.query, req.params );

            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }

    async get( req, res, next ) {
        const { id } = req.params;

        try { 
            const response = await this.service.get( id, req.params );
            
            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }
    async insert( req, res, next ) {
        try {
            const response = await this.service.insert( req.body, req.params );
            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }

    async update( req, res, next ) {
        const { id } = req.params;

        try {
            const response = await this.service.update( id, req.body, req.params );

            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }

    async delete( req, res, next ) {
        const { id } = req.params;

        try {
            const response = await this.service.delete( id, req.params );

            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }

}

module.exports = { Controller };
