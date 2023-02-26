const Router = require( "express" );
const Users = require( "../models/users" );
const jwt = require( "jsonwebtoken" );

const store = new Users();




const checkBeforeCreate = async ( req, res, next ) => {

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    };

    const check = await store.checkEmail( newUser );

    if ( check && check.message === 'Email already in use' ) {

        res.status( 409 ).json( { message: 'Email already in use' } );
    }
    else {
        next();
    }


};


const create = async ( req, res ) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            gender: req.body.gender,
            country: req.body.country
        };
        const user = await store.create( newUser );
        res.status( 200 ).json( { message: 'user created successfully', user } );
    }


    catch ( err ) {
        res.status( 404 ).json( { error: "can't create this user" } );

    }
};

const update = async ( req, res ) => {
    const upatedUser = {
        name: req.body.name,
        phone: req.body.phone,
    };
    const user = await store.update( upatedUser, req.params.id );
    res.json( { message: "user Updated successfully", user } );

};


const updatePassword = async ( req, res ) => {
    const newPass = req.body;
    const user = await store.update( newPass, req.params.id );
    res.json( { message: "user Updated successfully", user } );

};

const updateImgRoute = async ( req, res ) => {

    const binaryData = req.body;
    const user = await store.updateImg( binaryData, req.params.id );
    res.json( { message: "image Updated successfully", user } );

};

const showUser = async ( req, res ) => {

    const id = req.params.id;
    const user = await store.getUser( id );
    res.json( { user } );

};

const authenticate = async ( req, res ) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const result = await store.authenticate( user );
    if ( result.email ) {
        const accessTokenExpiration = { expiresIn: "15s" };

        const token = jwt.sign( { user }, process.env.TOKEN_SECRET, accessTokenExpiration );
        const refreshToken = jwt.sign( { user }, process.env.Refresh_TOKEN_SECRET );
        res.cookie( 'token', token );
        res.cookie( 'refresh token', refreshToken );
        res.cookie( 'user', result.name );
        res.cookie( 'userId', result.id );

        res.status( 200 ).json( { message: "successfully log in !", email: user.email, token, refreshToken, name: result.name } );
    } else if ( result == "password is wrong" ) {

        res.status( 404 ).json( { message: "password is wrong  !" } );

    }

    else {
        res.status( 401 ).json( { message: "this email is not regesitered  !" } );
    }
};



const checkPassword = async ( req, res ) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const check = await store.checkPass( user );

    if ( check ) {
        res.status( 200 ).json( { message: "password is correct!" } );
    } else {

        res.status( 404 ).json( { message: "password is wrong  !" } );

    }


};


const regenerateToken = async ( req, res ) => {
    const { refToken } = req.body;
    if ( !refToken ) {
        console.log( "wrong refresh token" );
    } else {
        let user = await store.verfiyRefeshToken( refToken );
        console.log( { 104: user } );
        if ( user ) {

            const accessTokenExpiration = { expiresIn: "15s" };


            const token = jwt.sign( { user }, process.env.TOKEN_SECRET, accessTokenExpiration );
            const refreshToken = jwt.sign( { user }, process.env.Refresh_TOKEN_SECRET );
            res.cookie( 'token', token );
            res.cookie( 'refresh token', refreshToken );
            res.json( { refreshToken, token } );
        } else {
            res.json( "wrong refresh token" );
        }
    }
};




const deleteRefreshToken = async ( req, res ) => {
    const { refToken } = req.body;
    if ( !refToken ) {
        console.log( "wrong refresh token" );
    } else {
        let user = await store.verfiyRefeshToken( refToken );
        console.log( { 104: user } );
        if ( user ) {



            res.clearCookie( 'user' );
            res.clearCookie( 'token' );
            res.clearCookie( 'refresh token' );
            res.clearCookie( 'userId' );

            res.json( { message: "you logout successfully" } );
        } else {
            res.json( "wrong refresh token" );
        }
    }
};



const userRoutes = Router();

userRoutes.route( "/user" ).post( checkBeforeCreate, create );
userRoutes.route( "/user/:id" ).patch( update );
userRoutes.route( "/user/changepassword:id" ).patch( updatePassword );
userRoutes.route( "/user/:id" ).get( showUser );
userRoutes.route( "/user/saveimg/:id" ).patch( updateImgRoute );

userRoutes.route( "/user/authenticate" ).post( authenticate );
userRoutes.route( "/user/checkpass" ).post( checkPassword );
userRoutes.route( "/user/auth/refresh" ).post( regenerateToken );
userRoutes.route( "/user/logout" ).delete( deleteRefreshToken );
// userRoutes.route( "/user/" ).delete( deleteRefreshToken );

module.exports = userRoutes;