const Router = require( "express" );
const authorization = require( "../middleware/authorization.js" );
const Users = require( "../models/users" );
const jwt = require( "jsonwebtoken" );

const store = new Users();

const create = async ( req, res ) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        };
        const user = await store.create( newUser );
        res.json( { message: 'user created successfully', user } );
    }


    catch ( err ) {
        res.json( { error: "can't create this user" } );

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
    const token = jwt.sign( { user }, process.env.TOKEN_SECRET );
    res.json( { user, token } );
};

const userRoutes = Router();

userRoutes.route( "/user" ).post( create );
userRoutes.route( "/user/:id" ).patch( authorization, update );

userRoutes.route( "/user/authenticate" ).get( authenticate );

module.exports = userRoutes;