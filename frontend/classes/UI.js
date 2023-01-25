import { totalCont, clear } from "../index.js";
import { ads, discount, price, tax, total } from "./Actions.js";
const popCont = document.querySelector( ".pop-cont" );


class Ui {
    constructor() {
        if ( Ui.instance ) {
            return Ui.instance;
        }
        Object.freeze( this );
        Ui.instance = this;
    }




    buildUI ( Arr ) {

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

    handleClearAllBtn ( Arr ) {

        if ( Arr.length > 1 ) {
            clear.classList.remove( "hide" );
            clear.innerHTML = `Clear (${ Arr.length })`;
        } else {
            clear.classList.add( "hide" );

        }
    }

    handlePop ( content, type = "success" ) {
        const span = `<span class="${ type } pop">${ content }</span>`;
        popCont.insertAdjacentHTML( "afterbegin", span );
        document.querySelectorAll( ".pop-cont .pop" ).forEach( e => {

            setTimeout( () => {
                e.remove();
            }, 4000 );

        } );
    };


    getTotal () {
        if ( price.value != "" ) {
            let result = ( +price.value + +tax.value + +ads.value ) - +discount.value;
            total.innerHTML = result;
            totalCont.style.cssText = `background-color:green;`;
        } else {
            totalCont.style.cssText = `background-color:rgb(91, 23, 23);`;
            total.innerHTML = '';
        }
    };

    emptyinputs () {

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

}

export const ui = new Ui();