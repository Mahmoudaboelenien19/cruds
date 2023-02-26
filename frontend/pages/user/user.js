import fetchUser, { getuserId } from "../../classes/UserApi.js";
import { handlePop } from "../../widgets/popup.js";
import { handleCHange, handleStrengthUI, passwordMatch, passWordStrength } from "../sign up/checkStrength.js";
import { isUserValid, isPhoneValid, phoneValidiation, userNameValidiation } from "../sign up/SignUp.js";

document.querySelector( "#name" ).addEventListener( "keyup", userNameValidiation );
document.querySelector( "#phone" ).addEventListener( "keyup", phoneValidiation );

const userName = document.getElementById( "user-name" );
const userPass = document.getElementById( "user-pass" );
const userPhone = document.getElementById( "user-phone" );
const usercountry = document.getElementById( "user-country" );
const userGender = document.getElementById( "user-gender" );
const userEmail = document.getElementById( "user-email" );
const overley = document.querySelector( ".overley" );

const hidePass = ( pass ) => {
    return Array.from( pass.substr( 0, 12 ) ).map( char => char = "*" ).join( "" );
};


const hidePop = () => {
    overley.classList.add( "hide" );
    document.querySelectorAll( ".user-pop" ).forEach( e => {

        e.classList.add( "hide" );
    }
    );
};

const showData = async () => {
    let res = await fetchUser.getUserImg();
    res = JSON.parse( res )?.blob;
    document.querySelector( "#img" ).src = res || "../../assets/images/guest.png";
    const user = await fetchUser.getUserData();
    const { password, email, country, gender, phone, name } = user;
    userName.innerHTML = name;
    userPass.innerHTML = hidePass( password );
    userPhone.innerHTML = phone;
    usercountry.innerHTML = country;
    userGender.innerHTML = gender;
    userEmail.innerHTML = email;

};

window.addEventListener( "DOMContentLoaded", showData );

document.querySelectorAll( ".user-btn" ).forEach( btn => {
    btn.addEventListener( "click", ( e ) => {
        overley.classList.remove( "hide" );
        document.querySelector( `#${ e.target.dataset.update }` ).classList.remove( "hide" );
    } );
} );


document.querySelector( "#confirm" ).addEventListener( "keyup", handleCHange );
document.querySelector( "#password" ).addEventListener( "keyup", () => {
    handleCHange();
    handleStrengthUI();
} );


document.querySelectorAll( ".cancel" ).forEach( btn => {
    btn.addEventListener( "click", e => {
        hidePop();

    } );
} );






document.querySelector( "button#update-username" ).addEventListener( "click", async ( e ) => {

    const userName = document.querySelector( "#name" );
    if ( userName.value == "" ) {
        handlePop( `username input is required`, "danger" );
    } else {
        const user = await fetchUser.getUserData();
        const { phone } = user;

        if ( isUserValid ) {

            fetchUser.updateUser( {
                name: userName.value,
                phone
            } );

            showData();
            hidePop();
            handlePop( "username is successfully updated !" );
        } else {
            handlePop( "this new username isn't valid !", "danger" );

        }
    }


} );


document.querySelector( "button#update-phone" ).addEventListener( "click", async ( e ) => {
    const newPhone = document.querySelector( "input#phone" );



    if ( newPhone.value == "" ) {

        handlePop( `phone input is required`, "danger" );

    } else {

        const user = await fetchUser.getUserData();
        const { name } = user;
        if ( isPhoneValid ) {

            fetchUser.updateUser( {
                name,
                phone: newPhone.value
            } );

            showData();
            hidePop();
            handlePop( "phone is successfully updated !" );
        } else {
            handlePop( "this new phone is not valid", "danger" );
        }
    }
} );


document.querySelector( "#check-pass" ).addEventListener( "click", async ( e ) => {
    const oldPass = document.querySelector( "#old-pass" );
    if ( oldPass.value == "" ) {
        handlePop( `old password input is required`, "danger" );
    } else {
        const status = await fetchUser.checkPass( {
            email: localStorage.getItem( "email" ),
            password: oldPass.value
        } );

        if ( status === 200 ) {
            handlePop( "check is done !" );
            hidePop();
            overley.classList.remove( "hide" );
            document.querySelector( "#new-password" ).classList.remove( "hide" );

        } else {
            handlePop( "this password is wrong !", "danger" );
        }
    }

} );




document.querySelector( "button#update-password" ).addEventListener( "click", async ( e ) => {
    const newPass = document.querySelector( "#password " );
    const confirm = document.querySelector( "#confirm " );

    if ( newPass.value == "" ) {
        handlePop( `new password input is required`, "danger" );
    }
    else if ( confirm.value == "" ) {
        handlePop( `confirm password input is required`, "danger" );
    }

    else {
        if ( passWordStrength && passwordMatch ) {



            fetchUser.updatePass( newPass.value );

            showData();
            hidePop();
            handlePop( "password is successfully updated !" );
        } else {
            if ( !passWordStrength ) {
                handlePop( "your password is weak !", "danger" );
            }
            else if ( !passwordMatch ) {
                handlePop( "password doesn't match!", "danger" );

            }
        }
    }
} );




// uploading

const file = document.querySelector( "#file" );
const imgUi = document.querySelector( "#img" );


file.addEventListener( "change", () => {
    const img = file.files[0];
    const reader = new FileReader();
    reader.readAsDataURL( img );

    reader.onload = () => {
        // const binaryData = new Uint8Array( reader.result );

        imgUi.src = reader.result;
        fetchUser.updateImg( reader.result );


    };

} );


document.querySelector( "#logout" ).addEventListener( "click", async () => {
    const { message } = await fetchUser.logout();
    location.href = "./../log in/login.html";
    localStorage.setItem( "logoutMsg", message );
} );