import fetchProduct from "./classes/fetchApi.js";

const product = document.getElementById( "product" );
const prices = document.querySelector( ".prices" );
const totalCont = document.querySelector( "#total-cont" );
const btn = document.querySelector( "#btn button" );
const price = document.getElementById( "price" );
const tax = document.getElementById( "tax" );
const ads = document.getElementById( "ads" );
const discount = document.getElementById( "discount" );
const total = document.getElementById( "total" );
const catagery = document.getElementById( "catagery" );
const count = document.getElementById( "count" );
const tbody = document.getElementById( "tbody" );
const del = document.querySelector( ".del" );
const clear = document.getElementById( 'clear' );
const form = document.querySelector( "form" );
const search = document.getElementById( "search" );
const popCont = document.querySelector( ".pop-cont" );

let mode = 'create';
let updatedEle;

export let Arr = [];

let showDataInPage = async () => {
  let data = await fetchProduct.get();

  Arr = data.products;
  buildUI( Arr );
  handleClearAllBtn( Arr );
};

showDataInPage();

const handleClearAllBtn = ( Arr ) => {

  if ( Arr.length > 1 ) {
    clear.classList.remove( "hide" );
    clear.innerHTML = `Clear (${ Arr.length })`;
  } else {
    clear.classList.add( "hide" );

  }
};

form.addEventListener( "submit", ( e ) => e.preventDefault() );


const handlePop = ( content, type ) => {
  const span = `<span class="${ type } pop">${ content }</span>`;
  popCont.insertAdjacentHTML( "afterbegin", span );
  document.querySelectorAll( ".pop-cont .pop" ).forEach( e => {

    setTimeout( () => {
      e.remove();
    }, 4000 );

  } );
};


btn.onclick = function () {
  if ( catagery.value != '' && price.value != '' && product.value != '' ) {
    addElementsToDatabase( Arr );

  } else {

    handlePop( "you must fill all inputs", "danger" );
  }

};


const getTotal = prices.onkeyup = function () {
  if ( price.value != "" ) {
    let result = ( +price.value + +tax.value + +ads.value ) - +discount.value;
    total.innerHTML = result;
    totalCont.style.cssText = `background-color:green;`;
  } else {
    totalCont.style.cssText = `background-color:rgb(91, 23, 23);`;
    total.innerHTML = '';
  }
};

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

    emptyinputs();
    handlePop( data.message, "success" );

  } else {

    fetchProduct.update( productData, Arr[updatedEle].id );
    showDataInPage();
    btn.innerHTML = "Add Product";
    mode = 'create';
    emptyinputs();

  }
};





function emptyinputs () {

  product.value = '';
  price.value = '';
  tax.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  totalCont.style.cssText = `background-color:rgb(91, 23, 23);`;
  catagery.value = '';
  count.value = '';

}

function buildUI ( Arr ) {
  tbody.innerHTML = '';

  // table = '';
  for ( let i = 0; i < Arr.length; i++ ) {
    tbody.innerHTML += `
<tr>

  <td>${ i + 1 }</td>
  <td>${ Arr[i].product_name }</td>
  <td>${ Arr[i].price }</td>
  <td>${ Arr[i].tax }</td>
  <td>${ Arr[i].ads }</td>
  <td>${ Arr[i].discount }</td>
  <td>${ +Arr[i].tax + +Arr[i].price + +Arr[i].ads + - Arr[i].discount }</td>   
  <td>${ Arr[i].catagery }</td>
  <td>${ Arr[i].count }</td>
  <td id="update"><button class ="update" data-id=${ Arr[i].id }>update</button></td>
  <td id="del"><button class="del" data-id=${ Arr[i].id }>del</button></td>
</tr>`;

  }
}

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
    getTotal();
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


console.log( document.getElementById( "clear" ) );
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




