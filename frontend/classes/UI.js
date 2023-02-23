import { totalCont, clear } from "../index.js";
import { ads, catagery, count, discount, price, product, tax, total } from "./Actions.js";
import { getTokenFromCookie } from "./fetchApi.js";
import fetchUser, { getuserId } from "./UserApi.js";


class Ui {
    constructor() {
        if ( Ui.instance ) {
            return Ui.instance;
        }
        Object.freeze( this );
        Ui.instance = this;
    }




    buildUI ( Arr ) {
        const noData = document.querySelector( "p.no-data" );
        const table = document.querySelector( "table" );
        if ( Arr.length <= 0 ) {
            noData.classList.remove( "hide" );
            table.classList.add( "hide" );
        }
        else {
            noData.classList.add( "hide" );
            table.classList.remove( "hide" );
            tbody.innerHTML = '';
            // table = '';
            for ( let i = 0; i < Arr.length; i++ ) {
                let check = getuserId() === Arr[i].userid;

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
    <td class="owner" title="show ${ check ? "your" : Arr[i].username + "'s" } data" data-userid=${ Arr[i].userid }>${ check ? "you" : Arr[i].username }</td>
     <td id="update">${ check ? ` <button class ='update' data-id=${ Arr[i].id }>update</button> ` : `<span title="you can't update this product">____</span>` }</td>
     <td id="del">${ check ? `<button class ='del' data-id=${ Arr[i].id }>delete</button>` : `<span title="you can't delete this product">____</span>` }</td>
  </tr>`;
            }
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
        count.value = '';
        catagery.value = '';

    }


    handleUserName () {
        const userName = document.querySelector( "#username a" );
        const login = document.getElementById( "login" );
        const logout = document.getElementById( "logout" );
        let data = getTokenFromCookie();
        if ( data.user ) {
            userName.href = "./pages/user/user.html";
            userName.title = "update your info";
            userName.innerHTML = data.user;
            logout.classList.remove( "hide" );
            login.classList.add( "hide" );

        }
        else {
            userName.innerHTML = "guest";
            userName.disabled = true;
            login.classList.remove( "hide" );
            logout.classList.add( "hide" );

        }
    }

    // async handleImg () {
    //     const blob = await fetchUser.getUserImg();;
    //     console.log( { blob } );
    //     const imageUrl = URL.createObjectURL( blob );
    //     document.querySelector( "#guest-user" ).src = imageUrl;
    // };

    async handleImg () {
        const binaryData = await fetchUser.getUserImg();

        if ( binaryData ) {

            let res = JSON.parse( binaryData );
            document.querySelector( "#guest-user" ).src = res.blob;

            // const blob = new Blob( [JSON.parse( binaryData )], { type: 'image/jpeg' } );
            // console.log( res.blob );
            // const imageUrl = URL.createObjectURL( res.blob );
            // let reader = new FileReader();
            // reader.readAsDataURL( blob );
            // reader.onload = () => {

            return res.blob;
            // };
        } else {
            return null;

        }



        // const base64Data = btoa( String.fromCharCode.apply( null, binaryData ) );
        // const imageUrl = `data:image/jpeg;base64,${ base64Data }`;
    };

    // fetch(`http://localhost:3000/user/${userId}`)
    //   .then(response => response.blob())
    //   .then(blob => {
    //     imageElement.src = imageUrl;
    //   });


}


export const ui = new Ui();