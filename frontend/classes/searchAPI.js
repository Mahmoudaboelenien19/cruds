class Search {
    constructor() {

        if ( Search.instance ) {
            return Search.instance;
        }

        Object.freeze( this );
        Search.instance = this;
    }


    async titleSearch ( val ) {

        const res = await fetch( `/search/title/${ val }` );
        let data = await res.json();
        return data;
    }


    async catageorySearch ( val ) {

        const res = await fetch( `/search/catageory/${ val }` );
        let data = await res.json();
        return data;
    }

    async userProdusctsSearch ( val ) {

        const res = await fetch( `/search/userproducts/${ val }` );
        let data = await res.json();
        return data;
    }

}

const search = new Search();
export default search;