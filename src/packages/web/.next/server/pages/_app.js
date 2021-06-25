(function() {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 116:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _app; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(282);
;// CONCATENATED MODULE: external "next/script"
var script_namespaceObject = require("next/script");;
var script_default = /*#__PURE__*/__webpack_require__.n(script_namespaceObject);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(297);
;// CONCATENATED MODULE: ./components/fetchData.ts
async function fetchData(url, data) {
  const fetchResult = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  const json = await fetchResult.json();
  return json;
}
;// CONCATENATED MODULE: ./components/loginErrorModal.tsx





function LoginErrorModal() {
  const {
    0: isLoggedIn,
    1: setIsLoggedIn
  } = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    fetchData("/api/v2/checkLoginStatus").then(result => {
      setIsLoggedIn(result.data);
    });
  });
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: !isLoggedIn ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "modal",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "modal-background"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "modal-content",
        children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
          className: "title is-1",
          children: "Warning: You aren't logged in!"
        }), "It appears you aren't logged in to homebank! This may cause issues or errors loading data, and you won't be able to use homebank as intended. Click the button below to log in:", /*#__PURE__*/jsx_runtime_.jsx("a", {
          href: "/",
          className: "button",
          children: "Log In"
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("button", {
        className: "modal-close is-large",
        "aria-label": "close"
      })]
    }) : /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {})
  });
}
;// CONCATENATED MODULE: ./pages/_app.js




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(LoginErrorModal, {}), /*#__PURE__*/jsx_runtime_.jsx((script_default()), {
      src: "https://kit.fontawesome.com/c669d65f93.js",
      crossOrigin: "anonymous"
    }), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))]
  });
}

/* harmony default export */ var _app = (MyApp);

/***/ }),

/***/ 297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(116));
module.exports = __webpack_exports__;

})();