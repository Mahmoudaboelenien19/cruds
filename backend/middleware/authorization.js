const jwt = require( "jsonwebtoken" );

const autorization = ( req, res, next ) => {
    try {

        const autorizationHeader = req.headers.authorization;
        console.log( autorizationHeader );
        if ( autorizationHeader ) {
            const token = autorizationHeader.split( " " )[1];
            // console.log( token );
            const decode = jwt.verify( token, process.env.TOKEN_SECRET );
            // console.log( { decode } );

            if ( decode ) {
                next();
            } else {
                res.status( 401 ).send( 'expired token' );

            }


        } else {
            res.status( 401 ).send( 'expired token' );

        }

    }
    catch ( err ) {
        res.status( 401 );
        res.json( ' autorization failed' );
    }
};

module.exports = autorization;