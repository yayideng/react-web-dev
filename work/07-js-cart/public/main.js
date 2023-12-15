/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");

function render() {
  renderProducts();
  renderCart();
}
function renderCart() {
  var totalCount = _state__WEBPACK_IMPORTED_MODULE_0__["default"].getTotalCount();
  var cartListHtml = totalCount ? getCartHtml() : "<p>Nothing in the cart</p>";
  cartListHtml = "\n    <h2>Shopping Cart</h2>\n    ".concat(cartListHtml, "\n    ");
  document.querySelector('.cart-container').innerHTML = cartListHtml;
}
function renderProducts() {
  var listHtml = _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.map(function (product, index) {
    return "\n        <li class=\"product\">\n            <h3 class=\"product-name\" data-index=\"".concat(index, "\">").concat(product.name, "</h3>\n            <img class=\"product-img\" src=").concat(product.img, "/>\n            <p class=\"product-price\">Price: $").concat(product.price, "</p>\n            <button \n              data-index=\"").concat(index, "\" class=\"add-cart\" type=\"button\">\n              Add to cart\n            </button>\n        </li>\n        ");
  }).join("");
  listHtml = "<ul class=\"list-products\">".concat(listHtml, "</ul>");
  listHtml += getViewCartBtn();
  document.querySelector('.product-list-container').innerHTML = listHtml;
}
function getViewCartBtn() {
  var totalCount = _state__WEBPACK_IMPORTED_MODULE_0__["default"].getTotalCount();
  var viewCartText = totalCount ? "View Cart (".concat(totalCount, ")") : "View Cart";
  var btnText = _state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart ? "Hide Cart" : viewCartText;
  if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart) {
    document.querySelector('.cart-container').classList.add("view-cart");
    document.querySelector('.cart-container').classList.remove("hide-cart");
  } else {
    document.querySelector('.cart-container').classList.add("hide-cart");
    document.querySelector('.cart-container').classList.remove("view-cart");
  }
  return "\n    <button type=\"button\" class= \"view-cart-btn\">\n            ".concat(btnText, "\n    </button> \n    \n    ");
}
function getCartHtml() {
  var cartHtml = _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.map(function (product, index) {
    var inCartClass = product.quantity ? "in-cart" : "not-in-cart";
    return "\n          <li class=\"cart ".concat(inCartClass, "\">\n            <h4 class=\"cart-name\" data-index=\"").concat(index, "\">\n              ").concat(product.name, "\n            </h4>\n            <img class=\"cart-img\" src=").concat(product.img, ">\n            <div class=\"count-group\">\n                <button \n                data-index=\"").concat(index, "\" class=\"minus-one\" type=\"button\">\n                -\n                </button>\n                <span class=\"cart-count\">").concat(product.quantity, "</span>\n                <button \n                data-index=\"").concat(index, "\" class=\"add-one\" type=\"button\">\n                +\n                </button>\n            </div>\n            <p>Price: $").concat(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getPricePerProduct(index), "</p>\n          </li>\n        ");
  }).join("");
  var cartShowClass = _state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart ? "show-cart" : "hide-cart";
  cartHtml = "<ul class=\"carts\">".concat(cartHtml, "</ul>");
  var totalPriceHtml = "<p>Total Price: $".concat(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getTotalPrice(), "</p>");
  var checkoutBtn = "<button type=\"button\" class=\"checkout-btn\">Checkout</button>";
  cartHtml += totalPriceHtml;
  cartHtml += checkoutBtn;
  return "\n    <div className = \"".concat(cartShowClass, "\">\n    ").concat(cartHtml, "\n    </div>");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var state = {
  products: [{
    name: "Ruby",
    img: "http://placekitten.com/150/150?image=1",
    price: 0.99,
    quantity: 0
  }, {
    name: "General Mayhem",
    img: "http://placekitten.com/150/150?image=2",
    price: 3.14,
    quantity: 0
  }, {
    name: "Fluffball",
    img: "http://placekitten.com/150/150?image=3",
    price: 2.73,
    quantity: 0
  }],
  getTotalCount: function getTotalCount() {
    var totalCount = 0;
    state.products.forEach(function (product) {
      totalCount += product.quantity;
    });
    return totalCount;
  },
  getPricePerProduct: function getPricePerProduct(index) {
    return (state.products[index].quantity * state.products[index].price).toFixed(2);
  },
  getTotalPrice: function getTotalPrice() {
    var totalPrice = 0;
    state.products.forEach(function (product) {
      totalPrice += product.quantity * product.price;
    });
    return totalPrice.toFixed(2);
  },
  viewCart: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");


var appEl = document.querySelector("#app");
appEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("view-cart-btn")) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart = !_state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("product-list-container")) {
    var index = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].added = !_state__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].added;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("delete")) {
    var _index = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.splice(_index, 1);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("add-cart")) {
    var _index2 = e.target.dataset.index;
    if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index2].quantity === 0) {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index2].quantity = 1;
    } else {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index2].quantity += 1;
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("add-one")) {
    var _index3 = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index3].quantity += 1;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("minus-one")) {
    var _index4 = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index4].quantity -= 1;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("checkout-btn")) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.forEach(function (product) {
      product.quantity = 0;
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
});
(0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map