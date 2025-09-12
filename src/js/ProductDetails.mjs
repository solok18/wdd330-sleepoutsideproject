import {getLocalStorage, setLocalStorage} from './utils.mjs';

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        try{
        this.product = await this.dataSource.findProductById(this.productId);
        
        if (!this.product) {
        this.renderNotFound();
        return;}
        }

        this.renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }


}