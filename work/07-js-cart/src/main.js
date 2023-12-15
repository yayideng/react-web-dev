import state from "./state";
import render from "./render";

const appEl = document.querySelector("#app");

appEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-cart-btn")) {
		state.viewCart = !state.viewCart;
		render();
		return;
	}
	if (e.target.classList.contains("product-list-container")) {
		const index = e.target.dataset.index;
		state.products[index].added = !state.products[index].added;
		render();
		return;
	}
	if (e.target.classList.contains("delete")) {
		const index = e.target.dataset.index;
		state.products.splice(index, 1);
		render();
		return;
	}
    if (e.target.classList.contains("add-cart")) {
        const index = e.target.dataset.index
        if (state.products[index].quantity === 0) {
            state.products[index].quantity = 1
        } else {
            state.products[index].quantity += 1
        }
        render()
        return
    }
    if (e.target.classList.contains("add-one")) {
        const index = e.target.dataset.index
        state.products[index].quantity += 1
        render()
        return
    }
    if (e.target.classList.contains("minus-one")) {
        const index = e.target.dataset.index
        state.products[index].quantity -= 1
        render()
        return
    }
    if (e.target.classList.contains("checkout-btn")) {
        state.products.forEach((product) => {
            product.quantity = 0
        })
        render()
        return
    }
});



render();