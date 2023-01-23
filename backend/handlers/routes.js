const Router = require( "express" );
const express = require( "express" );

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
            catagery: req.body.catagery

        };
        console.log( { newProduct } );

        const product = await store.create( newProduct );
        console.log( product );
        res.json( { message: 'product created successfully', product } );

    }

    catch ( err ) {
        res.json( { message: "can't create this product" } );

    }
};

const routes = Router();
routes.route( '/product' ).post( create );
module.exports = routes;
