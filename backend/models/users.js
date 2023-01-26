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
            const sql = `INSERT INTO users (name,email,password,phone) VALUES($1,$2,$3,$4) RETURNING *;`;
            const result = await conn.query( sql, [
                user.name,
                user.email,
                hashPassword( user.password ),
                user.phone
            ] );

            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "can't create this user" );
        }
    }

    async update ( user, id ) {
        try {
            const conn = await Client.connect();
            console.log( "before sql" );
            const sql = `UPDATE users SET name=($1),email=($2),password=($3),phone=($4) WHERE id=($5) RETURNING * ;`;
            console.log( "after sql" );

            const result = await conn.query( sql, [
                user.name,
                user.email,
                hashPassword( user.password ),
                user.phone,
                id
            ] );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "failed to update " );
        }
    }

    async authenticate ( email, password ) {
        const sql = `SELECT password from users where email=($1);`;
        const conn = await Client.connect();
        const result = await conn.query( sql, [email] );
        if ( result.rows.length ) {
            const user = result.rows[0];
            const check = bcrypt.compareSync(
                password + BCRYPT_PASSWORD, user.password
            );
            if ( check ) {
                return user;
            }
        }
        return null;
    }










}

module.exports = Users;