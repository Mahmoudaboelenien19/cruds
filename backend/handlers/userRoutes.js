const Router = require( "express" );
const authorization = require( "../middleware/authorization.js" );
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
        console.log( "entered check" );

        res.status( 409 ).json( { message: 'Email already in use' } );
    }
    else {

        console.log( "next" );
        next();
    }


    // catch ( err ) {
    //     res.json( { error: "can't create this user" } );

    // }
};


const create = async ( req, res ) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        };
        console.log( "create route" );
        console.log( { newUser } );
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
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
    };
    const user = await store.update( upatedUser, req.params.id );
    res.json( { message: "user Updated successfully", user } );

};

const authenticate = async ( req, res ) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const result = await store.authenticate( user );
    console.log( { result } );
    if ( result.email ) {

        const token = jwt.sign( { user }, process.env.TOKEN_SECRET );
        res.json( { user, token } );
    } else if ( result == "password is wrong" ) {
        res.json( { message: "password is wrong" } );

    }

    else {
        res.json( { message: "this email is not regesitered" } );
    }
};

const userRoutes = Router();

userRoutes.route( "/user" ).post( checkBeforeCreate, create );
userRoutes.route( "/user/:id" ).patch( authorization, update );

userRoutes.route( "/user/authenticate" ).post( authenticate );

module.exports = userRoutes;