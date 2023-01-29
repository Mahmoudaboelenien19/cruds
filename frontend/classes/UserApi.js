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

}

let fetchUser = new User();
export default fetchUser;