/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), SERVER.AUTH_INSUFFICIENT, 'Sorry, DOGs are forbidden, please use another username.'), SERVER.REQUIRED_USERNAME, 'Please enter a valid (within 20 letters and/or numbers) username.'), SERVER.REQUIRED_MESSAGE, 'Please enter message to send'), "default", 'Something went wrong.  Please try again');

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addLoginListener: () => (/* binding */ addLoginListener),
/* harmony export */   addLogoutListener: () => (/* binding */ addLogoutListener),
/* harmony export */   addPostMessageListener: () => (/* binding */ addPostMessageListener)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");



function addLoginListener(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("login-form")) {
      return;
    }
    var username = appEl.querySelector(".login-username").value;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnChat)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)({
      state: state,
      appEl: appEl
    });
    // Service call to login
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (users) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setLoginUsers)(users);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)({
        state: state,
        appEl: appEl
      });
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)();
    })["catch"](function (err) {
      return Promise.reject(err);
    })
    // Fetch all messages
    .then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setMessages)(messages);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addLogoutListener(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("logout-form")) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addPostMessageListener(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener("submit", function (e) {
    if (!e.target.classList.contains("chat-form")) {
      return;
    }
    var message = appEl.querySelector(".input-message").value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchPostMessage)(message).then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setMessages)(messages);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      console.log(err);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR"); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)({
        state: state,
        appEl: appEl
      });
    });
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n        ".concat(getLoginHtml(state), "\n        ").concat(generateChatHTML(state), "\n    ");
  appEl.innerHTML = html;
}
function generateChatHTML(state) {
  if (!state.isLoggedIn) return '';
  return "\n        <section class=\"chat-view\">   \n            <div class=\"login-user\">".concat(state.username, "</div>    \n            ").concat(getLogoutHtml(state), "\t\t\n            ").concat(getUserList(state), "\t\t\t\n            ").concat(getMessageList(state), "       \n            ").concat(getOutgoingHtml(state), "\n\t\t</section>\n    ");
}
function getLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n        <div class=\"waiting\">Loading user...</div>\n      ";
  }
  if (state.isLoggedIn) {
    return "";
  }
  return "\n      <div class=\"login\">\n          <form class=\"login-form\" action=\"#/login\">\n                <h1 class=\"login-head\"> Log In </h1>\n                ".concat(getErrorHtml(state), "\n                <label class=\"form-label\">\n                    <span>Username:</span>\n                    <input class=\"login-username\" name=\"username\"/>\n                </label>\n                <button type=\"submit\" class=\"login-btn\">Submit</button>\n          </form>\n      </div>\n      ");
}
function getErrorHtml(state) {
  if (!state.error) {
    return "";
  }
  return "\n        <div class=\"error\">".concat(state.error, "</div>\n    ");
}
function getLogoutHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"logout\">\n        <form class=\"logout-form\" action=\"#/logout\">\n            <button type=\"submit\" class=\"logout-btn\">Logout</button>\n        </form>\n    </div>\n    ";
}
function getOutgoingHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"outgoing\">\n        ".concat(getErrorHtml(state), "  \n        <form class=\"chat-form\" action=\"/chat\" method=\"POST\">\n            <input class=\"input-message\" name=\"message\" value=\"\" placeholder=\"Enter message to send\"/>\n            <button class=\"send-form__btn\" type=\"submit\">Send</button>\n        </form>\n    </div>\n    ");
}
function getMessageList(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isLoginPending) {
    return "\n        <div class=\"waiting\">Loading Messages...</div>\n        ";
  }
  var messages = state.messages;
  if (!messages) {
    return "";
  }
  return "\n    <ol class=\"messages\">\n    <h1>Messages</h2>\n    " + messages.map(function (message) {
    return "\n        <li>\n          <div class=\"message\">\n            <div class=\"message__sender\">\n                <div class=\"avatar sender__avatar\">  ".concat(message.sender.slice(0, 1), " </div>\n                <span class=\"sender__username\">").concat(message.sender, ":</span>\n            </div>\n            <p class=\"message-text\">").concat(message.text, "</p>\n          </div>\n        </li>\n      ");
  }).join("") + "</ol>";
}
function getUserList(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <ul class=\"users\">\n    <h3>Login Users</h3>\n    " + Object.entries(state.users).map(function (user) {
    return "\n            <li>\n                <div class=\"user\">\n                  <div class=\"avatar user__avatar\" > ".concat(user[0].slice(0, 1), " </div>\n                  <span class=\"username\">").concat(user[0], "</span>\n                </div>\n            </li>\n            ");
  }).join("") + "</ul>";
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLoginUsers: () => (/* binding */ fetchLoginUsers),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchPostMessage: () => (/* binding */ fetchPostMessage),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchLogin(username) {
  return fetch("/api/v1/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
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
function fetchLogout() {
  return fetch("/api/v1/session", {
    method: "DELETE"
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
function fetchSession() {
  return fetch("/api/v1/session", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLoginUsers() {
  return fetch("/api/v1/users", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return [Promise.reject(err)];
    });
  });
}
function fetchMessages() {
  return fetch("/api/v1/messages", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return [Promise.reject(err)];
    });
  });
}
function fetchPostMessage(message) {
  return fetch("/api/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      message: message
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
/* harmony export */   setLoginUsers: () => (/* binding */ setLoginUsers),
/* harmony export */   setMessages: () => (/* binding */ setMessages),
/* harmony export */   waitOnChat: () => (/* binding */ waitOnChat),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  isLoggedIn: false,
  isLoginPending: false,
  isChatPending: false,
  username: "",
  error: "",
  users: {},
  messages: []
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.users = {};
  state.messages = [];
  state.error = '';
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = "";
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = "";
  state.error = "";
}
function waitOnChat() {
  state.users = {};
  state.messages = [];
  state.isChatPending = true;
  state.error = '';
}
function setLoginUsers(data) {
  state.isChatPending = false;
  state.users = data;
  state.error = "";
}
function setMessages(data) {
  state.isChatPending = false;
  state.messages = data;
  state.error = "";
}
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
  state.isLoginPending = false;
  state.isChatPending = false;
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
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services */ "./src/services.js");





var appEl = document.querySelector("#app");
(0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addLoginListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addLogoutListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addPostMessageListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
checkForSession();
//pollData();

function pollData() {
  refreshData();
  setTimeout(pollData, 5000);
}
function refreshData() {
  if (!_state__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn) {
    return;
  }
  (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchLoginUsers)().then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setLoginUsers)(users);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchMessages)();
  })["catch"](function (err) {
    return Promise.reject(err);
  }).then(function (messages) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
function checkForSession() {
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnLogin)();
  (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
    state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
    appEl: appEl
  });
  // Fetch current user
  (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchLoginUsers)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  })
  // Fetch login users
  .then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setLoginUsers)(users);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchMessages)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })
  // Fetch all messages
  .then(function (messages) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=main.js.map