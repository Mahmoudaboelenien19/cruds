const dotenv = require( "dotenv" );
const bcrypt = require( "bcrypt" );
const Client = require( "../database" );
const jwt = require( "jsonwebtoken" );


dotenv.config();





const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

const hashPassword = ( password ) => {
    const salt = parseInt( SALT_ROUNDS );
    return bcrypt.hashSync( password + BCRYPT_PASSWORD, salt );

};



class Users {
    async checkEmail ( user ) {
        const conn = await Client.connect();
        const checkEmailsql = 'select * from users where email=($1);';
        const check = await conn.query( checkEmailsql, [user.email] );

        if ( check.rowCount > 0 ) {
            return { message: 'Email already in use' };
        }


    }



    async create ( user ) {

        try {
            const conn = await Client.connect();

            const sql = `INSERT INTO users (name,email,password,phone,gender,country) VALUES($1,$2,$3,$4,$5,$6) RETURNING * ;`;

            const result = await conn.query( sql, [
                user.name,
                user.email,
                hashPassword( user.password ),
                user.phone,
                user.gender,
                user.country
            ] );
            conn.release();
            return result.rows[0];

        }
        catch ( err ) {
            throw new Error( "can't create this user" );
        }
    }

    async update ( user, email ) {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE users SET name=($1),password=($2),phone=($3) WHERE email=($4) RETURNING * ;`;

            const result = await conn.query( sql, [
                user.name,
                hashPassword( user.password ),
                user.phone,
                email
            ] );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "failed to update " );
        }
    }


    async getUser ( email ) {
        try {
            const conn = await Client.connect();
            const sql = `SELECT  * FROM users WHERE email=($1) ;`;

            const result = await conn.query( sql, [email] );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "no user with this email" );
        }
    }


    async authenticate ( user ) {
        try {
            const sql = `SELECT name,password from users where email=($1) ;`;

            const conn = await Client.connect();
            const result = await conn.query( sql, [user.email] );
            if ( result.rows.length ) {
                const pass = result.rows[0];
                const check = bcrypt.compareSync(
                    user.password + BCRYPT_PASSWORD, pass.password
                );
                if ( check ) {
                    return { ...user, name: result.rows[0].name };
                } else {
                    return "password is wrong";
                }
            }
            return "this email not resigetered";

        }
        catch ( err ) {
            throw new Error( "this email not regestired" );
        }
    }


    async checkPass ( user ) {
        try {
            const sql = `SELECT password from users where email=($1) ;`;

            const conn = await Client.connect();
            const result = await conn.query( sql, [user.email] );
            console.log( { result: result.rows[0] } );
            if ( result.rows.length ) {
                console.log( "entered" );
                const pass = result.rows[0];
                const check = bcrypt.compareSync(
                    user.password + BCRYPT_PASSWORD, pass.password
                );

                console.log( { check } );
                return check;
            }
        }
        catch ( err ) {
            throw new Error( "this email not regestired" );
        }
    }







    async verfiyRefeshToken ( refToken ) {
        try {


            const decode = jwt.verify(
                refToken, process.env.Refresh_TOKEN_SECRET );
            return decode;
        }
        catch ( err ) {
            throw new Error( "this email not regestired" );
        }
    }

}

module.exports = Users;