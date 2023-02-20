const Router = require( "express" );
const autorization = require( "../middleware/authorization.js" );

const Product = require( "../models/model" );
const store = new Product();

const create = async ( req, res ) => {
    try {
        const newProduct = {
            product_name: req.body.product_name,
            price: req.body.price,
            tax: req.body.tax,
            ads: req.body.ads,
            discount: req.body.discount,
            count: req.body.count,
            catagery: req.body.catagery,
            userid: req.body.userid,
            username: req.body.username
        };
        const product = await store.create( newProduct );
        res.json( { message: 'product created successfully', product } );
    }


    catch ( err ) {
        res.status( 404 ).json( { message: "can't create this product" } );

    }


};

const update = async ( req, res ) => {
    try {
        const updatedProduct = {
            product_name: req.body.product_name,
            price: req.body.price,
            tax: req.body.tax,
            ads: req.body.ads,
            discount: req.body.discount,
            count: req.body.count,
            catagery: req.body.catagery,

        };
        const product = await store.update( req.params.id, updatedProduct );
        res.json( { message: 'product updated successfully', product } );
    }

    catch ( err ) {
        res.json( { message: "can't update this product" } );

    }
};

const index = async ( req, res ) => {
    const products = await store.index();
    res.json( { products } );
};

const destroy = async ( req, res ) => {
    const products = await store.delete( req.params.id );
    res.json( { message: "Product successfully deleted" } );
};

const clearAll = async ( req, res ) => {
    const products = await store.clear( req.params.id );
    res.json( { message: "All your products Cleared" } );
};
const routes = Router();
routes.route( '/product' ).post( autorization, create );
routes.route( '/products' ).get( index );
routes.route( '/products/:id' ).delete( autorization, clearAll );
routes.route( '/product/:id' ).patch( autorization, update ).delete( autorization, destroy );

module.exports = routes;
