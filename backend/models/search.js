const dotenv = require( "dotenv" );
const Client = require( "../database.js" );


dotenv.config();

class Seach {

    async searchByTitle ( val ) {
        console.log( "searchByTitle" );

        const conn = await Client.connect();
        const sql = "SELECT * FROM products WHERE product_name ILIKE '%' || $1 || '%' ;";
        const result = await conn.query( sql, [val] );
        console.log( { result } );
        conn.release();
        return result.rows;
    }


    async searchBycatageory ( val ) {
        console.log( "searchByTitle" );

        const conn = await Client.connect();
        const sql = "SELECT * FROM products WHERE catagery ILIKE '%' || $1 || '%' ;";
        const result = await conn.query( sql, [val] );
        console.log( { result } );
        conn.release();
        return result.rows;
    }

}


module.exports = Seach;