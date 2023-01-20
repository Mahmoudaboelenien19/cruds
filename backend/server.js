import express from "express";
import cors from "cors";

const app = express();
const port = 5000;
app.use( express.json() );
// app.use( cors() );
app.use( express.static( "../frontend" ) );

app.listen( port, () => {
    console.log( "server is runing" );
}
);

app.get( "/", ( req, res ) => {
    res.send( "hello mahmoud" );
} );