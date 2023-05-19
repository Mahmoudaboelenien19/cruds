const express = require( "express" );
const cors = require( "cors" );
const routes = require( "./handlers/routes" );
const userRoutes = require( "./handlers/userRoutes" );
const cookieParser = require( 'cookie-parser' );
const searchRoutes = require( "./handlers/searchRoutes" );




const app = express();
app.use( cookieParser() );
const port = 5000;
app.use( express.json() );
app.use( express.static( "../frontend" ) );
app.use( cors() );

app.use( "/", routes );
app.use( "/", userRoutes );
app.use( "/", searchRoutes );
app.use( "/", ( req, res ) => {
    res.json( "hello- I am server" );
} );

app.listen( port, () => {
    console.log( "server is runing at port " + port );
}
);

module.exports = app;