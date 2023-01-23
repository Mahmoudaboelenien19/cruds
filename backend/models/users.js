const dotenv = require( "dotenv" );
const bcrypt = require( "bcrypt" );
const Client = require( "../database" );

dotenv.config();
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

const hashPassword = ( password ) => {
    const salt = parseInt( SALT_ROUNDS );
    return bcrypt.hashSync( password + BCRYPT_PASSWORD, salt );

};



class Users {
    async create ( user ) {
        try {
            const conn = await Client.connect();
            console.log( "create1" );

            const sql = `INSERT INTO users (name,email,password,phone) VALUES($1,$2,$3,$4) RETURNING *;`;
            console.log( "create2" );


            const result = await conn.query( sql, [
                user.name,
                user.email,
                hashPassword( user.password ),
                user.phone
            ] );

            console.log( "create3" );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "can't create this user" );
        }
    }

}

module.exports = Users;