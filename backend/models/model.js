const Client = require( "../database" );





class Product {
    async index () {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM products;";
            const result = await conn.query( sql );
            conn.release();
            return result.rows;
        }
        catch ( err ) {
            throw new Error( "unable to show data " );
        }
    }

    async show ( id ) {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM products WHERE id($1)  RETURNING *;";
            const result = await conn.query( sql, [id] );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "this product can't be found" );
        }
    }

    async delete ( id ) {
        try {
            const conn = await Client.connect();
            const sql = "DELETE  FROM products WHERE id=($1) RETURNING *;";
            const result = await conn.query( sql, [id] );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "this product can't be deleted" );
        }
    }

    async clear ( id ) {
        try {
            const conn = await Client.connect();
            const sql = "DELETE  FROM products Where userid=($1);";
            const result = await conn.query( sql, [id] );
            conn.release();
            return result.rows;
        }
        catch ( err ) {
            throw new Error( "this table can't be cleared" );
        }
    }
    async update ( id, product ) {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE  products  SET product_name=($1), price=($2) ,tax=($3), ads=($4)  
            ,discount=($5)  ,count=($6)  ,catagery=($7)  WHERE id=($8) RETURNING * ;`;
            const result = await conn.query( sql, [
                product.product_name,
                product.price,
                product.tax,
                product.ads,
                product.discount,
                product.count,
                product.catagery,
                id
            ] );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "this product can't be updateted" );
        }
    }

    async create ( product ) {
        try {
            const conn = await Client.connect();
            const sql = "INSERT INTO products(product_name,price,tax , ads ,discount ,count ,catagery,userid,username) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ;";
            const result = await conn.query( sql, [
                product.product_name,
                product.price,
                product.tax,
                product.ads,
                product.discount,
                product.count,
                product.catagery,
                product.userid,
                product.username
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