import { totalCont, clear } from "../index.js";
import { ads, discount, price, tax, total } from "./Actions.js";
import { getTokenFromCookie } from "./fetchApi.js";


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
    <td id="del"><button class="del" data-id=${ Arr[i].id }>delete</button></td>
  </tr>`;
        }
    }

    handleClearAllBtn ( Arr ) {

        if ( Arr.length > 1 ) {
            clear.classList.remove( "hide" );
            clear.innerHTML = `<i class="fas fa-trash-alt"></i>
            Clear (${ Arr.length })`;
        } else {
            clear.classList.add( "hide" );

        }
    }




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


    handleUserName () {
        const userName = document.querySelector( "#username" );
        const login = document.getElementById( "login" );
        const logout = document.getElementById( "logout" );
        let data = getTokenFromCookie();
        console.log( { data } );
        if ( data.user ) {
            userName.innerHTML = data.user;
            console.log( { login, logout } );
            logout.classList.remove( "hide" );
            login.classList.add( "hide" );
            console.log( "loginCheck" );

        }
        else {
            userName.innerHTML = "guest";
            login.classList.remove( "hide" );
            logout.classList.add( "hide" );

        }
    }


}

export const ui = new Ui();