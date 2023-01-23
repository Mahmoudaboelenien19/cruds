const express = require( "express" );
const cors = require( "cors" );
const routes = require( "./handlers/routes" );

const app = express();
const port = 5000;
app.use( express.json() );
app.use( cors() );
// app.use( express.static( "../frontend" ) );

app.use( "/", routes );
app.get( "/", ( req, res ) => {
    res.send( "hello mahmoud" );
} );
app.listen( port, () => {
    console.log( "server is runing" );
}
);
