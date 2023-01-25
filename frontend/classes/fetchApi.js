class FetchClass {

    constructor() {
        if ( FetchClass.instance ) {
            return FetchClass.instance;
        }
        Object.freeze( this );
        FetchClass.instance = this;
    }
    async get () {
        const res = await fetch( "/products" );
        const data = await res.json();
        return data;
    };



    async create ( product ) {

        let res = await fetch( "/product", {
            method: "POST",
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify( product )
        } );
        let data = await res.json();
        return data;
    }
    async delete ( id ) {

        const data = await fetch( `/product/${ id }`, {
            method: "DELETE",
        } );

        return data.json();
    }


    async clear () {
        const data = await fetch( `/products`, {
            method: "DELETE"
        } );
        return data.json();
    }

    async update ( product, id ) {
        const data = await fetch( `/product/${ id }`, {
            method: "PATCH",
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify( product )
        } );
        return await data.json();
    };

}


let fetchProduct = new FetchClass();
export default fetchProduct;
