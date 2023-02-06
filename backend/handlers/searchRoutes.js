const Router = require( "express" );
const Seach = require( "../models/search" );

const store = new Seach();

const titleSearch = async ( req, res ) => {

    try {
        let data = await store.searchByTitle( req.params.val );
        console.log( { data } );
        res.status( 200 ).json( { data } );
    }
    catch ( err ) {
        res.status( 200 ).json( { message: "no results" } );

    }

};


const catageorySearch = async ( req, res ) => {

    try {
        let data = await store.searchBycatageory( req.params.val );
        res.status( 200 ).json( { data } );
    }
    catch ( err ) {
        res.status( 200 ).json( { message: "no results" } );

    }

};

const searchRoutes = Router();
searchRoutes.route( "/search/title/:val" ).get( titleSearch );
searchRoutes.route( "/search/catageory/:val" ).get( catageorySearch );

module.exports = searchRoutes;