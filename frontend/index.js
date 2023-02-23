import search from "./classes/searchAPI.js";
import { action } from "./classes/Actions.js";
import fetchProduct from "./classes/fetchApi.js";
import { ui } from "./classes/UI.js";
import { handlePop } from "./widgets/popup.js";
import { handleToggle, handleMode, toggle } from "./widgets/toggle.js";

const prices = document.querySelector( ".prices" );
export const totalCont = document.querySelector( "#total-cont" );
export const btn = document.querySelector( "#btn button" );
export const tbody = document.getElementById( "tbody" );
export const clear = document.getElementById( 'clear' );
const form = document.querySelector( "form" );
const searchInp = document.getElementById( "search" );
export const clearPopUp = document.querySelector( ".clear-pop" );
export const overLey = document.querySelector( ".overley" );
const searchPlaceholder = document.getElementById( "search-placeholder" );
const searchCont = document.querySelector( ".search-btn" );

export let Arr = [];
let searchType = "title";

window.addEventListener( "load", async () => {
  handleMode();
  ui.handleUserName();
  document.querySelector( "#guest-user" ).src = await ui.handleImg() || "./assets/images/guest.png";


  setTimeout( () => {

    document.querySelector( ".loading-cont" ).classList.add( "hide" );
    document.querySelector( ".container" ).classList.remove( "hide" );
    showDataInPage();

  }, 4500 );
} );





export let showDataInPage = async () => {

  let data = await fetchProduct.get();
  Arr = data.products;

  ui.buildUI( Arr );
  ui.handleClearAllBtn( Arr );


};


if ( localStorage.getItem( "log-message" ) ) {

  handlePop( localStorage.getItem( "log-message" ) );
  setTimeout( () => {
    localStorage.removeItem( "log-message" );
  }, 1200 );

}




form.addEventListener( "submit", ( e ) => e.preventDefault() );


btn.addEventListener( "click", action.validation.bind( action ) );

prices.addEventListener( "keyup", ui.getTotal );


clear.addEventListener( "click", action.handleCLearPopup );
clearPopUp.addEventListener( "click", action.clearPopUpActions );

const handleActions = async ( e ) => {
  action.handleDelete( e );
  action.handleUpdate( e );
  await action.handleUserPop( e );
};

tbody.addEventListener( "click", handleActions );
toggle.addEventListener( "click", handleToggle );




searchCont.addEventListener( "click", ( e ) => {
  if ( e.target.classList.contains( "tSearch" ) ) {

    searchType = "title";
    searchPlaceholder.innerHTML = `<i class="icon fas fa-gift"> </i> search by name`;
  } else if ( e.target.classList.contains( "cSearch" ) ) {

    searchType = "catageory";
    searchPlaceholder.innerHTML = `<i class="icon fas fa-box"></i>search by catageory  `;
  } else if ( e.target.classList.contains( "user-search" ) ) {
    searchType = "user";
    searchPlaceholder.innerHTML = `<i class="icon fa-solid fa-user"></i> search by user`;

  }
} );




searchInp.addEventListener( "keyup", async ( e ) => {

  if ( searchInp.value == "" ) {
    ui.buildUI( Arr );
    ui.handleClearAllBtn( Arr );


  }

  else {

    if ( searchType == "title" ) {

      const { data } = await search.titleSearch( e.target.value );

      if ( data ) {
        ui.buildUI( data );
        ui.handleClearAllBtn( [] );

      }
    }

    else if ( searchType == "catageory" ) {
      const { data } = await search.catageorySearch( e.target.value );

      if ( data ) {
        ui.buildUI( data );
        ui.handleClearAllBtn( [] );

      }
    } else {
      const { data } = await search.userProdusctsSearch( e.target.value );

      if ( data ) {
        ui.buildUI( data );
        ui.handleClearAllBtn( [] );


      }
    }
  }
} );





document.querySelector( "#logout" ).addEventListener( "click", action.handlelogout );
