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
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    ".concat(getErrorHtml(state), "\n    ").concat(getLoginHtml(state), "\n    ").concat(getLogoutHtml(state), "\n    ").concat(getWordHtml(state), "\n    ");
  appEl.innerHTML = html;
}
function getLoginHtml(state) {
  if (state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"login\">\n        <form class=\"login-form\" action=\"#/login\">\n            <h3 class=\"login-text\"> Welcome to Word World! </h3>\n            <label for=\"username\" class=\"form-label\">Username:</label>\n            <input class=\"login-username\" name=\"username\"/>\n            <button type=\"submit\" class=\"btn btn--submit btn--login\">Log in</button>\n        </form>\n    </div>\n    ";
}
function getLogoutHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"logout\">\n        <form class=\"logout-form\" action=\"#/logout\">\n            <button type=\"submit\" class=\"logout-btn\">Logout</button>\n        </form>\n    </div>\n    ";
}
function getWordHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"word\">        \n        <div class=\"content\">\n            <p class=\"content__name\">".concat(state.username, "!</p>\n            <p class=\"content__text\"> ").concat(state.word ? 'your word is:' : 'you have no word, add one!', " </p>\n            ").concat(state.word ? '<span class="content__word">' + state.word + '</span>' : '', " \n        </div>\n        <form class=\"word-form\" action=\"#/store\">\n            <label>\n                <span class=\"form-label\">Enter word: </span>\n                <input class=\"word-input\" name=\"storedWord\"/>\n            </label>\n            <button class=\"btn btn--submit btn--new-word\"\" type=\"submit\">Submit</button>\n        </form>\n    </div>\n   ");
}
function getErrorHtml(state) {
  //const errorText = MESSAGES[state.error] || MESSAGES.default;
  return "\n    <div class=\"error\">".concat(state.error, "</div>\n");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchPostWord: () => (/* binding */ fetchPostWord),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchWord: () => (/* binding */ fetchWord)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchWord() {
  return fetch('/api/word', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchPostWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   updateWord: () => (/* binding */ updateWord)
/* harmony export */ });
var state = {
  username: "",
  word: "",
  isLoggedIn: false,
  error: ""
};
function login(username) {
  state.isLoggedIn = true;
  state.username = username;
  state.error = "";
}
function logout() {
  state.isLoggedIn = false;
  state.username = "";
  state.word = "";
  state.error = "";
}
function updateWord(word, username) {
  state.word = word;
  state.error = "";
}
function setError(error, username) {
  if (error === 'network-error') {
    state.error = 'Your network is down, please check your Internet connection.';
  } else if (error === 'auth-missing') {
    state.error = 'Your session is invalid, missing or expired, please log in again.';
  } else if (error === 'required-username') {
    state.error = 'Please make sure the username is not empty and only include letters and numbers.';
  } else if (error === 'auth-insufficient') {
    state.error = 'Sorry, DOGs are forbidden!';
  } else if (error === 'required-word' || error === 'invalid-word') {
    state.error = 'Please make sure your word is not empty and only include letters.';
  } else if (error === '') {
    state.error = '';
  }
  // else{
  // state.error =  'Something went wrong. Please try again'
  // }
}

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
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



var appEl = document.querySelector('#app');
//render({ state, appEl });
addLoginListener({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
addLogoutListener({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
addWordListenser({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
initialRender();
function initialRender() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(function () {
    fetchWordAndRenderHome();
  })["catch"](function (err) {
    if (err.error === 'auth-missing') {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)(err.error);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
        appEl: appEl
      });
    }
  });
}
function fetchWordAndRenderHome() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchWord)().then(function (data) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)(data.username);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateWord)(data.storedWord, data.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)(err === null || err === void 0 ? void 0 : err.error);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  });
}
function addLoginListener(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("login-form")) {
      return;
    }
    var username = appEl.querySelector(".login-username").value;
    // Service call to login
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(function (_ref2) {
      var username = _ref2.username;
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)(username);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      //return fetchWord();
    })
    // .catch((err) => {
    // 	setError(err?.error);
    // 	render({ state, appEl });
    // })
    // Get word from fetchWord service and render the page
    .then(function (response) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateWord)(response.storedWord, username);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })
    // Catch fetchWord error
    ["catch"](function (err) {
      // Catch no session error
      if ((err === null || err === void 0 ? void 0 : err.error) == 'auth-missing') {
        (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)(username);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
        return;
      }
      // Catch unpected error
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)(err === null || err === void 0 ? void 0 : err.error);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addLogoutListener(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("logout-form")) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)(err === null || err === void 0 ? void 0 : err.error);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addWordListenser(_ref4) {
  var state = _ref4.state,
    appEl = _ref4.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("word-form")) {
      return;
    }
    var word = appEl.querySelector(".word-input").value;
    if (!word) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)('required-word');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      return;
    }
    // Service call to update word
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchPostWord)(word).then(function (_ref5) {
      var storedWord = _ref5.storedWord;
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateWord)(storedWord);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)(err === null || err === void 0 ? void 0 : err.error);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=app.js.map