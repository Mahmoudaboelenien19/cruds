const Client = require( "../database" );

// const bcrypt = require( "bcrypt" );
// const dotenv = require( "dotenv" );




class Product {
    async create ( product ) {
        try {
            const conn = await Client.connect();
            const sql = "INSERT INTO products(product_name ,price,tax , ads ,discount ,count ,catagery) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * ;";
            const result = await conn.query( sql, [
                product.product_name,
                product.price,
                product.tax,
                product.ads,
                product.discount,
                product.count,
                product.catagery
            ] );
            conn.release();
            return result.rows[0];

        }
        catch ( err ) {
            throw new Error( 'unable to create a new product' );

        }
    }
}

module.exports = Product;