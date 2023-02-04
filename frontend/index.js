import { action } from "./classes/Actions.js";
import fetchProduct from "./classes/fetchApi.js";
import { ui } from "./classes/UI.js";
import { handlePop } from "./widgets/popup.js";
import { handleToggle, hanleColors, toggle } from "./widgets/toggle.js";

export const product = document.getElementById( "product" );
const prices = document.querySelector( ".prices" );
export const totalCont = document.querySelector( "#total-cont" );
export const btn = document.querySelector( "#btn button" );
export const tbody = document.getElementById( "tbody" );
export const clear = document.getElementById( 'clear' );
const form = document.querySelector( "form" );
const search = document.getElementById( "search" );

export let Arr = [];

export let showDataInPage = async () => {

  let data = await fetchProduct.get();
  Arr = data.products;
  ui.buildUI( Arr );
  ui.handleClearAllBtn( Arr );

};

window.addEventListener( "load", () => {
  hanleColors();
  ui.handleUserName();
  setTimeout( () => {

    document.querySelector( ".loading-cont" ).classList.add( "hide" );
    showDataInPage();

  }, 4500 );


} );

if ( localStorage.getItem( "log-message" ) ) {

  handlePop( localStorage.getItem( "log-message" ) );
  setTimeout( () => {
    localStorage.clear();
  }, 1200 );

}




form.addEventListener( "submit", ( e ) => e.preventDefault() );


btn.addEventListener( "click", action.validation.bind( action ) );

prices.addEventListener( "keyup", ui.getTotal );
clear.addEventListener( "click", action.handeClearAll );


const handleActions = ( e ) => {
  action.handleDelete( e );
  action.handleUpdate( e );
};

tbody.addEventListener( "click", handleActions );
toggle.addEventListener( "click", handleToggle );




// let searchMode = 'title';

// const tSearch = document.getElementById( "tSearch" );
// const cSearch = document.getElementById( "cSearch" );

// function searchFunction ( id ) {
//   search.value = '';
//   ShowDataInPage( Arr );
//   const search_placeholder = document.querySelector( "#search-placeholder" );
//   if ( id == "tSearch" ) {
//     searchMode = 'title';
//     search_placeholder.innerHTML = 'Search by Title';

//   } else {
//     searchMode = 'categry';
//     search_placeholder.innerHTML = 'Search by categery';

//   }
//   search.focus();

// }
// search.onblur = function () {
//   document.querySelector( "#search-placeholder" ).innerHTML = 'Search';

// };


// function searchfun ( value ) {
//   tbody.innerHTML = '';
//   table = '';
//   let searchArr = [];
//   if ( searchMode == 'title' ) {
//     for ( i = 0; i < Arr.length; i++ ) {
//       if ( Arr[i].product_name.toLowerCase().trim().includes( value.toLowerCase().trim() ) ) {
//         searchArr.push( Arr[i] );

//       }
//     }
//     ShowDataInPage( searchArr );
//   } else if ( searchMode = 'categry' ) {
//     for ( i = 0; i < Arr.length; i++ ) {
//       if ( Arr[i].catagery.toLowerCase().trim().includes( value.toLowerCase().trim() ) ) {
//         searchArr.push( Arr[i] );

//       }
//     }
//     ShowDataInPage( searchArr );

//   }
// }





document.querySelector( "#logout" ).addEventListener( "click", action.handlelogout );
