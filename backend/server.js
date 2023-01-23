const express = require( "express" );
const cors = require( "cors" );
const routes = require( "./handlers/routes" );
const userRoutes = require( "./handlers/userRoutes" );

const app = express();
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
