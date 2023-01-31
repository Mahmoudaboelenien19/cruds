const express = require( "express" );

const cors = require( "cors" );
const routes = require( "./handlers/routes" );
const userRoutes = require( "./handlers/userRoutes" );
const cookieParser = require( 'cookie-parser' );


// other middleware and routes


const app = express();
app.use( cookieParser() );
const port = 5000;
app.use( express.json() );
app.use( express.static( "../frontend" ) );
app.use( cors() );

app.use( "/", routes );
app.use( "/", userRoutes );
app.get( "/", ( req, res ) => {
    res.send( "hello mahmoud" );
} );
app.listen( port, () => {
    console.log( "server is runing" );
}
);

module.exports = app;