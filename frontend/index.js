import fetchProduct from "./classes/fetchApi.js";
import { ui } from "./classes/UI.js";

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
const del = document.querySelector( ".del" );
export const clear = document.getElementById( 'clear' );
const form = document.querySelector( "form" );
const search = document.getElementById( "search" );

let mode = 'create';
let updatedEle;

export let Arr = [];

let showDataInPage = async () => {
  let data = await fetchProduct.get();

  Arr = data.products;
  ui.buildUI( Arr );
  ui.handleClearAllBtn( Arr );
};

showDataInPage();

form.addEventListener( "submit", ( e ) => e.preventDefault() );


btn.onclick = function () {
  if ( catagery.value != '' && price.value != '' && product.value != '' ) {
    addElementsToDatabase( Arr );

  } else {

    ui.handlePop( "you must fill all inputs", "danger" );
  }

};

prices.addEventListener( "keyup", ui.getTotal );


const addElementsToDatabase = async () => {

  const productData = {

    product_name: product.value,
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    catagery: catagery.value,
    count: count.value

  };

  if ( mode == 'create' ) {

    let data = await fetchProduct.create( productData );
    console.log( data );
    showDataInPage();

    ui.emptyinputs();
    ui.handlePop( data.message, "success" );

  } else {

    fetchProduct.update( productData, Arr[updatedEle].id );
    showDataInPage();
    btn.innerHTML = "Add Product";
    mode = 'create';
    ui.emptyinputs();

  }
};



const handeClearAll = async () => {
  fetchProduct.clear();
  showDataInPage();
  clear.innerHTML = '';
};


const handleUpdate = ( e ) => {
  if ( e.target.classList.contains( "update" ) ) {

    mode = "update";
    let i = Arr.findIndex( ele => ele.id == e.target.dataset.id );
    product.value = Arr[i].product_name;
    price.value = Arr[i].price;
    tax.value = Arr[i].tax;
    count.value = Arr[i].count;
    ads.value = Arr[i].ads;
    discount.value = Arr[i].discount;
    catagery.value = Arr[i].catagery;


    btn.innerHTML = "update Product";

    updatedEle = i;
    ui.getTotal();
    scroll( {
      top: 0,
      behavior: "smooth"
    } );
  };

};


const handleDelete = ( e ) => {
  if ( e.target.classList.contains( "del" ) ) {
    console.log( "del clicked" );
    let deletedElement = Arr.find( ele => ele.id == e.target.dataset.id );
    fetchProduct.delete( deletedElement.id );
    showDataInPage();
  }

};

const handleActions = ( e ) => {
  handleDelete( e );
  handleUpdate( e );
};

tbody.addEventListener( "click", handleActions );
clear.addEventListener( "click", handeClearAll );



let searchMode = 'title';

const tSearch = document.getElementById( "tSearch" );
const cSearch = document.getElementById( "cSearch" );

function searchFunction ( id ) {
  search.value = '';
  ShowDataInPage( Arr );
  const search_placeholder = document.querySelector( "#search-placeholder" );
  if ( id == "tSearch" ) {
    searchMode = 'title';
    search_placeholder.innerHTML = 'Search by Title';

  } else {
    searchMode = 'categry';
    search_placeholder.innerHTML = 'Search by categery';

  }
  search.focus();

}
search.onblur = function () {
  document.querySelector( "#search-placeholder" ).innerHTML = 'Search';

};


function searchfun ( value ) {
  tbody.innerHTML = '';
  table = '';
  let searchArr = [];
  if ( searchMode == 'title' ) {
    for ( i = 0; i < Arr.length; i++ ) {
      if ( Arr[i].product_name.toLowerCase().trim().includes( value.toLowerCase().trim() ) ) {
        searchArr.push( Arr[i] );

      }
    }
    ShowDataInPage( searchArr );
  } else if ( searchMode = 'categry' ) {
    for ( i = 0; i < Arr.length; i++ ) {
      if ( Arr[i].catagery.toLowerCase().trim().includes( value.toLowerCase().trim() ) ) {
        searchArr.push( Arr[i] );

      }
    }
    ShowDataInPage( searchArr );

  }
}




