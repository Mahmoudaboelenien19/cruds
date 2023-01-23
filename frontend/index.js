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
const form = document.querySelector( "form" );
const search = document.getElementById( "search" );

let updatedEle;

mode = 'create';

let Arr = [];

const fetchFn = async () => {
  const res = await fetch( "/products" );
  const data = await res.json();
  Arr = data.products;
  ShowDataInPage( Arr );
  return data;
};
fetchFn();

const popCont = document.querySelector( ".pop-cont" );

const handlePop = ( content, type ) => {
  const span = `<span class="${ type } pop">${ content }</span>`;
  popCont.insertAdjacentHTML( "afterbegin", span );
  document.querySelectorAll( ".pop-cont .pop" ).forEach( ( e, i ) => {

    setTimeout( () => {
      e.remove();
    }, 4000 );

  } );
};

form.addEventListener( "submit", ( e ) => e.preventDefault() );

btn.onclick = function () {
  if ( catagery.value != '' && price.value != '' && product.value != '' ) {
    addElementsToDatabase( Arr );

  } else {

    handlePop( "you must fill all inputs", "danger" );
  }

};
const getTotal = prices.onkeyup = function () {
  if ( price.value != "" ) {
    result = ( +price.value + +tax.value + +ads.value ) - +discount.value;
    total.innerHTML = result;
    totalCont.style.cssText = `background-color:green;`;
  } else {
    totalCont.style.cssText = `background-color:rgb(91, 23, 23);`;
    total.innerHTML = '';

  }
};

async function addElementsToDatabase () {

  productData = {

    product_name: product.value,
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    catagery: catagery.value,
    count: count.value,

  };
  if ( mode == 'create' ) {

    let res = await fetch( "/product", {
      method: "POST",
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify( productData )
    } );
    let data = await res.json();
    fetchFn();
    emptyinputs();
    handlePop( data.message, "success" );
  } else {

    fetch( `/product/${ Arr[updatedEle].id }`, {
      method: "PATCH",
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify( productData )
    } );
    // Arr[updatedEle] = productData;
    await fetchFn();
    btn.innerHTML = "Add Product";
    mode = 'create';
    emptyinputs();

  }
}





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

function ShowDataInPage ( Arr ) {
  tbody.innerHTML = '';

  table = '';
  for ( i = 0; i < Arr.length; i++ ) {
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
  <td id="update"><button onclick="updateData(${ i })">update</button></td>
  <td id="del"><button onclick="deleteFromPage(${ Arr[i].id })">del</button></td>
</tr>`;

    const delAll = document.getElementById( 'delAll' );
    if ( Arr.length > 1 ) {
      delAll.innerHTML = `<button onclick="delAllData()"> Clear (${ Arr.length })</button>`;
    } else {
      delAll.innerHTML = '';
    }

  }

}


async function deleteFromPage ( i ) {

  fetch( `/product/${ i }`, {
    method: "DELETE",
    headers: { 'content-Type': 'application/json' },


  } );

  await fetchFn();
}


async function delAllData () {

  fetch( `/products`, {
    method: "DELETE",
    headers: { 'content-Type': 'application/json' },


  } );

  await fetchFn();
  delAll.innerHTML = '';

}

function updateData ( i ) {
  mode = "update";
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
}

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




