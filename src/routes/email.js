'use strict';
const EmailController = require( '../controllers/EmailController' );
const ClientAuthMiddleware = require( '../middleware/ClientAuthMiddleware' );
const BounceEmailAddressGuardMiddleware = require( '../middleware/BounceEmailAddressGuardMiddleware' );
const EmailValidator = require('../middleware/EmailValidator');
const express = require( 'express' ),
    router = express.Router();

router.use(ClientAuthMiddleware.handle);
router.use(BounceEmailAddressGuardMiddleware.handle);
router.get( '/', EmailController.getAll );
router.get( '/:id', EmailController.get );
router.delete( '/:id', EmailController.delete );

router.use(EmailValidator.handle);
router.post( '/', EmailController.insert );
router.put( '/:id', EmailController.update );

module.exports = router;
