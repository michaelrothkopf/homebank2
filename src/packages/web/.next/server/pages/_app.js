(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/fetchData.ts":
/*!*********************************!*\
  !*** ./components/fetchData.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ fetchData; }
/* harmony export */ });
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

/***/ }),

/***/ "./components/loginErrorModal.tsx":
/*!****************************************!*\
  !*** ./components/loginErrorModal.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LoginErrorModal; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fetchData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetchData */ "./components/fetchData.ts");


var _jsxFileName = "C:\\Users\\micha\\Documents\\Coding\\Homebank\\homebank2\\src\\packages\\web\\components\\loginErrorModal.tsx";


function LoginErrorModal(props) {
  const {
    0: isLoggedIn,
    1: setIsLoggedIn
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: accountRole,
    1: setAccountRole
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.role);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    (0,_fetchData__WEBPACK_IMPORTED_MODULE_2__.default)("/api/v2/checkLoginStatus").then(result => {
      setIsLoggedIn(result.data.loggedIn);

      if (result.data.loggedIn) {
        setAccountRole(result.data.role);
      }
    });
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: !isLoggedIn || accountRole !== props.role ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: "modal is-active",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "modal-background"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 17
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "modal-content",
        style: {
          color: 'white'
        },
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
          className: "title is-1",
          style: {
            color: 'white'
          },
          children: "Warning: Access not authorized"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 21
        }, this), "It appears you aren\"t logged in to homebank, or you\"re visiting parent pages on a child account (or vice versa)! This may cause issues or errors loading data, and you won't be able to use homebank as intended. Click the button below to log in:", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("a", {
          href: "/",
          className: "button",
          children: "Log In"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 21
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 17
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
        className: "modal-close is-large",
        "aria-label": "close",
        onClick: () => {
          setIsLoggedIn(true);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 17
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 13
    }, this) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false)
  }, void 0, false);
}

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ "./styles/globals.css");
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/script */ "next/script");
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_loginErrorModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/loginErrorModal */ "./components/loginErrorModal.tsx");


var _jsxFileName = "C:\\Users\\micha\\Documents\\Coding\\Homebank\\homebank2\\src\\packages\\web\\pages\\_app.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_2___default()), {
      src: "https://kit.fontawesome.com/c669d65f93.js",
      crossOrigin: "anonymous"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }, this)]
  }, void 0, true);
}

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (function() {



/***/ }),

/***/ "next/script":
/*!******************************!*\
  !*** external "next/script" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/script");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2ZldGNoRGF0YS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xvZ2luRXJyb3JNb2RhbC50c3giLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvX2FwcC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L3NjcmlwdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiXSwibmFtZXMiOlsiZmV0Y2hEYXRhIiwidXJsIiwiZGF0YSIsImZldGNoUmVzdWx0IiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiY2FjaGUiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJyZWRpcmVjdCIsInJlZmVycmVyUG9saWN5IiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJqc29uIiwiTG9naW5FcnJvck1vZGFsIiwicHJvcHMiLCJpc0xvZ2dlZEluIiwic2V0SXNMb2dnZWRJbiIsInVzZVN0YXRlIiwiYWNjb3VudFJvbGUiLCJzZXRBY2NvdW50Um9sZSIsInJvbGUiLCJ1c2VFZmZlY3QiLCJ0aGVuIiwicmVzdWx0IiwibG9nZ2VkSW4iLCJjb2xvciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFlLGVBQWVBLFNBQWYsQ0FBMEJDLEdBQTFCLEVBQXVDQyxJQUF2QyxFQUNmO0FBQ0ksUUFBTUMsV0FBVyxHQUFHLE1BQU1DLEtBQUssQ0FBQ0gsR0FBRCxFQUFNO0FBQ2pDSSxVQUFNLEVBQUUsTUFEeUI7QUFFakNDLFFBQUksRUFBRSxNQUYyQjtBQUdqQ0MsU0FBSyxFQUFFLFVBSDBCO0FBSWpDQyxlQUFXLEVBQUUsYUFKb0I7QUFLakNDLFdBQU8sRUFBRTtBQUNMLHNCQUFnQjtBQURYLEtBTHdCO0FBUWpDQyxZQUFRLEVBQUUsUUFSdUI7QUFTakNDLGtCQUFjLEVBQUUsYUFUaUI7QUFVakNDLFFBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVaLElBQWY7QUFWMkIsR0FBTixDQUEvQjtBQWFBLFFBQU1hLElBQUksR0FBRyxNQUFNWixXQUFXLENBQUNZLElBQVosRUFBbkI7QUFFQSxTQUFPQSxJQUFQO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkQ7QUFDQTtBQUVlLFNBQVNDLGVBQVQsQ0FBeUJDLEtBQXpCLEVBQ2Y7QUFDSSxRQUFNO0FBQUEsT0FBQ0MsVUFBRDtBQUFBLE9BQWFDO0FBQWIsTUFBOEJDLCtDQUFRLENBQVUsS0FBVixDQUE1QztBQUNBLFFBQU07QUFBQSxPQUFDQyxXQUFEO0FBQUEsT0FBY0M7QUFBZCxNQUFnQ0YsK0NBQVEsQ0FBU0gsS0FBSyxDQUFDTSxJQUFmLENBQTlDO0FBRUFDLGtEQUFTLENBQUMsTUFBTTtBQUNaeEIsdURBQVMsQ0FBQywwQkFBRCxDQUFULENBQXNDeUIsSUFBdEMsQ0FBNENDLE1BQUQsSUFBWTtBQUNuRFAsbUJBQWEsQ0FBQ08sTUFBTSxDQUFDeEIsSUFBUCxDQUFZeUIsUUFBYixDQUFiOztBQUVBLFVBQUlELE1BQU0sQ0FBQ3hCLElBQVAsQ0FBWXlCLFFBQWhCLEVBQ0E7QUFDSUwsc0JBQWMsQ0FBQ0ksTUFBTSxDQUFDeEIsSUFBUCxDQUFZcUIsSUFBYixDQUFkO0FBQ0g7QUFDSixLQVBEO0FBUUgsR0FUUSxFQVNOLEVBVE0sQ0FBVDtBQVdBLHNCQUNJO0FBQUEsY0FDTSxDQUFDTCxVQUFELElBQWVHLFdBQVcsS0FBS0osS0FBSyxDQUFDTSxJQUF0QyxnQkFDRDtBQUFLLGVBQVMsRUFBQyxpQkFBZjtBQUFBLDhCQUNJO0FBQUssaUJBQVMsRUFBQztBQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FESixlQUVJO0FBQUssaUJBQVMsRUFBQyxlQUFmO0FBQStCLGFBQUssRUFBRTtBQUFDSyxlQUFLLEVBQUU7QUFBUixTQUF0QztBQUFBLGdDQUNJO0FBQUksbUJBQVMsRUFBQyxZQUFkO0FBQTJCLGVBQUssRUFBRTtBQUFDQSxpQkFBSyxFQUFFO0FBQVIsV0FBbEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBREosd1FBR0k7QUFBRyxjQUFJLEVBQUMsR0FBUjtBQUFZLG1CQUFTLEVBQUMsUUFBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBSEo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBRkosZUFPSTtBQUFRLGlCQUFTLEVBQUMsc0JBQWxCO0FBQXlDLHNCQUFXLE9BQXBEO0FBQTRELGVBQU8sRUFBRSxNQUFNO0FBQUNULHVCQUFhLENBQUMsSUFBRCxDQUFiO0FBQXFCO0FBQWpHO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FQSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFEQyxnQkFXRDtBQVpKLG1CQURKO0FBZ0JILEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNEO0FBQ0E7QUFDQTs7QUFFQSxTQUFTVSxLQUFULENBQWU7QUFBRUMsV0FBRjtBQUFhQztBQUFiLENBQWYsRUFBeUM7QUFDdkMsc0JBQ0U7QUFBQSw0QkFDRSw4REFBQyxvREFBRDtBQUFRLFNBQUcsRUFBQywyQ0FBWjtBQUF3RCxpQkFBVyxFQUFDO0FBQXBFO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixlQUVFLDhEQUFDLFNBQUQsb0JBQWVBLFNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUZGO0FBQUEsa0JBREY7QUFNRDs7QUFFRCwrREFBZUYsS0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxtRCIsImZpbGUiOiJwYWdlcy9fYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhICh1cmw6IHN0cmluZywgZGF0YT86IE9iamVjdClcclxue1xyXG4gICAgY29uc3QgZmV0Y2hSZXN1bHQgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBtb2RlOiAnY29ycycsXHJcbiAgICAgICAgY2FjaGU6ICduby1jYWNoZScsXHJcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVkaXJlY3Q6ICdmb2xsb3cnLFxyXG4gICAgICAgIHJlZmVycmVyUG9saWN5OiAnbm8tcmVmZXJyZXInLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBqc29uID0gYXdhaXQgZmV0Y2hSZXN1bHQuanNvbigpO1xyXG5cclxuICAgIHJldHVybiBqc29uO1xyXG59IiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgZmV0Y2hEYXRhIGZyb20gXCIuL2ZldGNoRGF0YVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMb2dpbkVycm9yTW9kYWwocHJvcHM6IHsgcm9sZTogc3RyaW5nIH0pXHJcbntcclxuICAgIGNvbnN0IFtpc0xvZ2dlZEluLCBzZXRJc0xvZ2dlZEluXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuICAgIGNvbnN0IFthY2NvdW50Um9sZSwgc2V0QWNjb3VudFJvbGVdID0gdXNlU3RhdGU8c3RyaW5nPihwcm9wcy5yb2xlKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGZldGNoRGF0YShcIi9hcGkvdjIvY2hlY2tMb2dpblN0YXR1c1wiKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgc2V0SXNMb2dnZWRJbihyZXN1bHQuZGF0YS5sb2dnZWRJbik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEubG9nZ2VkSW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNldEFjY291bnRSb2xlKHJlc3VsdC5kYXRhLnJvbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICB7KCFpc0xvZ2dlZEluIHx8IGFjY291bnRSb2xlICE9PSBwcm9wcy5yb2xlKSA/XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgaXMtYWN0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJhY2tncm91bmRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT5cclxuICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGl0bGUgaXMtMVwiIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT5XYXJuaW5nOiBBY2Nlc3Mgbm90IGF1dGhvcml6ZWQ8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIEl0IGFwcGVhcnMgeW91IGFyZW4mcXVvdDt0IGxvZ2dlZCBpbiB0byBob21lYmFuaywgb3IgeW91JnF1b3Q7cmUgdmlzaXRpbmcgcGFyZW50IHBhZ2VzIG9uIGEgY2hpbGQgYWNjb3VudCAob3IgdmljZSB2ZXJzYSkhIFRoaXMgbWF5IGNhdXNlIGlzc3VlcyBvciBlcnJvcnMgbG9hZGluZyBkYXRhLCBhbmQgeW91IHdvbiZhcG9zO3QgYmUgYWJsZSB0byB1c2UgaG9tZWJhbmsgYXMgaW50ZW5kZWQuIENsaWNrIHRoZSBidXR0b24gYmVsb3cgdG8gbG9nIGluOlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvXCIgY2xhc3NOYW1lPVwiYnV0dG9uXCI+TG9nIEluPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm1vZGFsLWNsb3NlIGlzLWxhcmdlXCIgYXJpYS1sYWJlbD1cImNsb3NlXCIgb25DbGljaz17KCkgPT4ge3NldElzTG9nZ2VkSW4odHJ1ZSk7fX0+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA6XHJcbiAgICAgICAgICAgIDw+PC8+fVxyXG4gICAgICAgIDwvPlxyXG4gICAgKTtcclxufSIsImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJ1xyXG5pbXBvcnQgU2NyaXB0IGZyb20gXCJuZXh0L3NjcmlwdFwiXHJcbmltcG9ydCBMb2dpbkVycm9yTW9kYWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvbG9naW5FcnJvck1vZGFsXCJcclxuXHJcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8U2NyaXB0IHNyYz1cImh0dHBzOi8va2l0LmZvbnRhd2Vzb21lLmNvbS9jNjY5ZDY1ZjkzLmpzXCIgY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIiAvPlxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcFxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L3NjcmlwdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTs7Il0sInNvdXJjZVJvb3QiOiIifQ==