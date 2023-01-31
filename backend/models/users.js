const dotenv = require( "dotenv" );
const bcrypt = require( "bcrypt" );
const Client = require( "../database" );


// const app = require( "../server.js" );

// const app = express();
// app.use( cookieParser() );

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
            console.log( "create 1" );
            const conn = await Client.connect();
            console.log( "create 2" );

            const sql = `INSERT INTO users (name,email,password,phone) VALUES($1,$2,$3,$4) RETURNING * ;`;
            console.log( "create 3" );

            const result = await conn.query( sql, [
                user.name,
                user.email,
                hashPassword( user.password ),
                user.phone
            ] );
            console.log( "create 4" );

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

    async authenticate ( user ) {
        try {
            const sql = `SELECT password from users where email=($1);`;
            const conn = await Client.connect();
            const result = await conn.query( sql, [user.email] );
            console.log( { len: result.rows } );
            if ( result.rows.length ) {
                console.log( "entered check" );
                const pass = result.rows[0];
                const check = bcrypt.compareSync(
                    user.password + BCRYPT_PASSWORD, pass.password
                );
                console.log( { check } );
                if ( check ) {
                    return user;
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










}

module.exports = Users;