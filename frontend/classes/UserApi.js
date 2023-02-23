import { getRefreshTOken } from "./fetchApi.js";



export const getuserId = () => {
    const cookie = document.cookie;
    const parts = cookie.split( ';' );



    for ( const part of parts ) {
        const [name, value] = part.split( '=' );


        if ( name.trim() === 'userId' ) {
            return value;
        }

    };
};



export const getEmailFromCookies = () => {
    const cookie = document.cookie;
    const parts = cookie.split( ';' );



    for ( const part of parts ) {
        const [name, value] = part.split( '=' );


        if ( name.trim() === 'mail' ) {
            return value;
        }

    };
};



class User {
    constructor() {
        if ( User.instance ) {
            return User.instance;
        }
        Object.freeze( this );
        User.instance = this;
    }


    async create ( user ) {

        let res = await fetch( "/user", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify( user )
        } );


        let data = await res.json( user );
        let status = res.status;

        console.log( { data } );
        return { data, status };
    }


    async getUserData ( id ) {


        let res = await fetch( `/user/${ id }` );


        const data = await res.json();
        const { user } = data;
        console.log( user );
        return user;
    }



    async getUserImg () {
        const id = getuserId();
        if ( id ) {

            let res = await fetch( `/user/${ id }` );
            let { user } = await res.json();
            // console.log( { data } );
            // const binaryData = new Uint8Array( data.user.image );
            // const blob = new Blob( [binaryData], { type: 'image/jepg' } );

            // console.log( { blob } );
            return user.image;
        } else {
            return null;
        }


    }



    async updateUser ( obj ) {
        const id = getuserId();

        let res = await fetch( `/user/${ id }`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( obj )

        } );



        const data = await res.json();

        return data;
    }



    async updateImg ( blob ) {
        const id = getuserId();

        let res = await fetch( `/user/saveimg/${ id }`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( { blob } )
        } );


        const data = await res.json();

        return data;
    }


    async authenticate ( data ) {


        let res = await fetch( "/user/authenticate", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify( data )
        } );


        let info = await res.json( data );
        console.log( info );
        return info;
    }

    async checkPass ( data ) {


        let res = await fetch( "/user/checkpass", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify( data )
        } );


        let status = res.status;
        console.log( status );
        return status;
    }


    async logout ( data ) {
        let refToken = getRefreshTOken();

        let res = await fetch( "/user/logout", {
            method: "delete",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify( { refToken } )
        } );


        let info = await res.json( data );
        console.log( { info } );
        return info;
    }

}

let fetchUser = new User();
export default fetchUser;