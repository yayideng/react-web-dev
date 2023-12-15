import state from "./state";


function render(){
    renderProducts();
    renderCart();

}

function renderCart(){
    const totalCount = state.getTotalCount();
	let cartListHtml = totalCount ? getCartHtml() : `<p>Nothing in the cart</p>`
	cartListHtml = `
    <h2>Shopping Cart</h2>
    ${cartListHtml}
    `;
    document.querySelector('.cart-container').innerHTML = cartListHtml;


}



function renderProducts(){
    let listHtml = state.products.map((product,index) =>{
        return `
        <li class="product">
            <h3 class="product-name" data-index="${index}">${product.name}</h3>
            <img class="product-img" src=${product.img}/>
            <p class="product-price">Price: $${product.price}</p>
            <button 
              data-index="${index}" class="add-cart" type="button">
              Add to cart
            </button>
        </li>
        `
    }).join("");
    listHtml = `<ul class="list-products">${listHtml}</ul>`
    listHtml += getViewCartBtn();
    document.querySelector('.product-list-container').innerHTML = listHtml
}

function getViewCartBtn(){
    const totalCount = state.getTotalCount();
    const viewCartText = totalCount ? `View Cart (${totalCount})` : "View Cart"
    const btnText = state.viewCart ? "Hide Cart" : viewCartText 


    if (state.viewCart ){
        document.querySelector('.cart-container').classList.add("view-cart");
        document.querySelector('.cart-container').classList.remove("hide-cart");
    }else{
        document.querySelector('.cart-container').classList.add("hide-cart");
        document.querySelector('.cart-container').classList.remove("view-cart");
    }

    return `
    <button type="button" class= "view-cart-btn">
            ${btnText}
    </button> 
    
    `
}

function getCartHtml() {

    let cartHtml = state.products
		.map((product, index) => {
			const inCartClass = product.quantity ? "in-cart" : "not-in-cart";
			return `
          <li class="cart ${inCartClass}">
            <h4 class="cart-name" data-index="${index}">
              ${product.name}
            </h4>
            <img class="cart-img" src=${product.img}>
            <div class="count-group">
                <button 
                data-index="${index}" class="minus-one" type="button">
                -
                </button>
                <span class="cart-count">${product.quantity}</span>
                <button 
                data-index="${index}" class="add-one" type="button">
                +
                </button>
            </div>
            <p>Price: $${state.getPricePerProduct(index)}</p>
          </li>
        `;
		})
		.join("");
     
    const cartShowClass = state.viewCart? "show-cart": "hide-cart"
    cartHtml = `<ul class="carts">${cartHtml}</ul>`
    const totalPriceHtml = `<p>Total Price: $${state.getTotalPrice()}</p>`
    const checkoutBtn = `<button type="button" class="checkout-btn">Checkout</button>`
    cartHtml += totalPriceHtml
    cartHtml += checkoutBtn

    return `
    <div className = "${cartShowClass}">
    ${cartHtml}
    </div>`
}


    
export default render;

