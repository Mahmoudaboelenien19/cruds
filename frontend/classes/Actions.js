import { Arr, showDataInPage } from "../index.js";
import fetchProduct from "./fetchApi.js";
import { ui } from "./UI.js";

export const product = document.getElementById( "product" );
const prices = document.querySelector( ".prices" );
export const totalCont = document.querySelector( "#total-cont" );
export const btn = document.querySelector( "#btn button" );
export const price = document.getElementById( "price" );
export const tax = document.getElementById( "tax" );
export const ads = document.getElementById( "ads" );
export const discount = document.getElementById( "discount" );
export const total = document.getElementById( "total" );
export const catagery = document.getElementById( "catagery" );
export const count = document.getElementById( "count" );
export const tbody = document.getElementById( "tbody" );
export const clear = document.getElementById( 'clear' );
const form = document.querySelector( "form" );
const search = document.getElementById( "search" );


class Actions {
    static mode = 'create';
    static updatedElement;
    constructor() {

        if ( Actions.instance ) {
            return Actions.instance;
        }
        Object.freeze( this );
        Actions.instance = this;
    }

    async addElementsToDatabase () {

        const productData = {

            product_name: product.value,
            price: price.value,
            tax: tax.value,
            ads: ads.value,
            discount: discount.value,
            catagery: catagery.value,
            count: count.value

        };

        if ( Actions.mode == 'create' ) {

            let data = await fetchProduct.create( productData );
            console.log( data );
            showDataInPage();

            ui.emptyinputs();
            ui.handlePop( data.message );

        } else {

            const data = await fetchProduct.update( productData, Arr[Actions.updatedElement].id );
            showDataInPage();

            ui.handlePop( data.message );
            Actions.mode = 'create';
            ui.emptyinputs();

        }
    };



    async handeClearAll () {
        const data = await fetchProduct.clear();
        showDataInPage();
        clear.innerHTML = '';
        ui.handlePop( data.message );
    };


    handleUpdate ( e ) {
        if ( e.target.classList.contains( "update" ) ) {

            Actions.mode = "update";
            let updatedEle = Arr.findIndex( ele => ele.id == e.target.dataset.id );

            product.value = Arr[updatedEle].product_name;
            price.value = Arr[updatedEle].price;
            tax.value = Arr[updatedEle].tax;
            count.value = Arr[updatedEle].count;
            ads.value = Arr[updatedEle].ads;
            discount.value = Arr[updatedEle].discount;
            catagery.value = Arr[updatedEle].catagery;


            btn.innerHTML = "update Product";

            Actions.updatedElement = updatedEle;
            ui.getTotal();
            scroll( {
                top: 0,
                behavior: "smooth"
            } );
        };

    };


    async handleDelete ( e ) {
        if ( e.target.classList.contains( "del" ) ) {
            let deletedElement = Arr.find( ele => ele.id == e.target.dataset.id );
            let data = await fetchProduct.delete( deletedElement.id );
            showDataInPage();
            ui.handlePop( data.message );
        }

    };
}

export const action = new Actions(); 