import { Arr, btn, clear, clearPopUp, overLey, showDataInPage } from "../index.js";
import { handlePop } from "../widgets/popup.js";
import fetchProduct, { getTokenFromCookie } from "./fetchApi.js";
import { ui } from "./UI.js";
import fetchUser, { getuserId } from "./UserApi.js";

export const product = document.querySelector( "[name=product]" );
export const price = document.querySelector( "[name=price]" );
export const tax = document.querySelector( "[name=tax]" );
export const ads = document.querySelector( "[name=ads]" );
export const discount = document.querySelector( "[name=discount]" );
export const total = document.getElementById( "total" );
export const catagery = document.querySelector( "[name=catagery]" );
export const count = document.querySelector( "[name=count]" );


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
            count: count.value,
            userid: getuserId(),
            username: getTokenFromCookie().user

        };
        console.log( { productData } );
        if ( Actions.mode == 'create' ) {

            let data = await fetchProduct.create( productData );
            if ( data ) {
                showDataInPage();

                ui.emptyinputs();
                handlePop( data.message );
            } else {
                handlePop( "you must login to create new item !", "danger" );

            }


        } else {

            const data = await fetchProduct.update( productData, Arr[Actions.updatedElement].id );
            if ( data ) {
                showDataInPage();

                handlePop( data.message );
                Actions.mode = 'create';
                ui.emptyinputs();
            } else {
                handlePop( "you must login to update this item !", "danger" );

            }


        }
    };

    handleCLearPopup () {
        overLey.classList.remove( "hide" );
        clearPopUp.classList.remove( "hide" );
    }

    clearPopUpActions ( e ) {
        if ( e.target.classList.contains( "cancel" ) ) {
            overLey.classList.add( "hide" );
            clearPopUp.classList.add( "hide" );
        } else {
            overLey.classList.add( "hide" );
            clearPopUp.classList.add( "hide" );
            action.handeClearAll();
        }
    }


    async handeClearAll () {
        const data = await fetchProduct.clear();
        if ( data ) {
            showDataInPage();
            clear.innerHTML = '';
            handlePop( data.message );
        } else {
            handlePop( "you must login to clear all products !", "danger" );

        }

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


            btn.innerHTML = `<i class="fas fa-sync-alt"></i>
             update Product`;

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
            if ( data ) {
                showDataInPage();
                handlePop( data.message );
            } else {
                handlePop( "you must login to delete this item !", "danger" );
            }
        }
    };

    validation () {
        if ( [...document.querySelectorAll( ".inp" )].every( inp => inp.value != "" ) ) {
            this.addElementsToDatabase( Arr );
            const inputs = document.querySelectorAll( "input" );

            inputs.forEach( inp => inp.nextElementSibling.classList.add( "hide" ) );



        } else {
            handlePop( "you must fill all inputs", "danger" );

        }
    }



    async handlelogout () {

        let { message } = await fetchUser.logout();
        localStorage.setItem( "logoutMsg", message );
        location.href = "./../pages/log in/login.html";

    }
}

export const action = new Actions(); 