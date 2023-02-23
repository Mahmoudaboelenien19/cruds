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

    async update ( user, id ) {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE users SET name=($1), phone=($2) WHERE id=($3) RETURNING * ;`;
            console.log( { ...user, id } );
            const result = await conn.query( sql, [
                user.name,
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


    async updatePassword ( pass, id ) {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE users SET password=($1) WHERE id=($2) RETURNING * ;`;

            const result = await conn.query( sql, [
                hashPassword( pass ),
                id
            ] );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "failed to update " );
        }
    }
    async updateImg ( img, id ) {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE users SET image=($1) WHERE id=($2) ;`;
            const result = await conn.query( sql, [
                img,
                id
            ] );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "failed to update " );
        }
    }



    async getUser ( id ) {
        try {
            const conn = await Client.connect();
            const sql = `SELECT  * FROM users WHERE id=($1) ;`;

            const result = await conn.query( sql, [id] );
            conn.release();
            return result.rows[0];
        }
        catch ( err ) {
            throw new Error( "no user with this email" );
        }
    }



    async authenticate ( user ) {
        try {
            const sql = `SELECT name,password,id from users where email=($1) ;`;

            const conn = await Client.connect();
            const result = await conn.query( sql, [user.email] );
            if ( result.rows.length ) {
                const pass = result.rows[0];
                const check = bcrypt.compareSync(
                    user.password + BCRYPT_PASSWORD, pass.password
                );
                if ( check ) {
                    console.log( "132" );
                    console.log( { rows: result.rows[0] } );
                    return { ...user, id: result.rows[0].id, name: result.rows[0].name };
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