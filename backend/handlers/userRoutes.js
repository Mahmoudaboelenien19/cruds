const Router = require( "express" );
const Users = require( "../models/users" );

const store = new Users();

const create = async ( req, res ) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        };
        console.log( newUser );
        const user = await store.create( newUser );
        res.json( { message: 'user created successfully', user } );
    }


    catch ( err ) {
        res.json( { message: "can't create this user" } );

    }


};

const userRoutes = Router();

userRoutes.route( "/user" ).post( create );

module.exports = userRoutes;