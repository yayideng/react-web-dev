const state = {
    products: [
        {
            name: "Ruby",
			img: "http://placekitten.com/150/150?image=1",
			price: 0.99,
			quantity: 0,
		},
		{
			name: "General Mayhem",
			img: "http://placekitten.com/150/150?image=2",
			price: 3.14,
			quantity: 0,
		},
		{
			name: "Fluffball",
			img: "http://placekitten.com/150/150?image=3",
			price: 2.73,
			quantity: 0,
		},
    ],

    getTotalCount: function(){
        let totalCount = 0;
        state.products.forEach((product) => {
            totalCount += product.quantity
        });
        return totalCount;
    },

    getPricePerProduct: function (index) {
		return (state.products[index].quantity * state.products[index].price).toFixed(2);
	},

    getTotalPrice: function(){
        let totalPrice = 0;
        state.products.forEach((product) => {
            totalPrice += product.quantity*product.price
        });
        return totalPrice.toFixed(2)
    },

    viewCart : false,

 

};
export default state;