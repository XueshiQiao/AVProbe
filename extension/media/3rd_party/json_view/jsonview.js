/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsonview"] = factory();
	else
		root["jsonview"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/jsonview.scss":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/jsonview.scss ***!
  \********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.json-container {\n  font-family: \"Open Sans\";\n  font-size: 16px;\n  background-color: #fff;\n  color: #808080;\n  box-sizing: border-box;\n}\n.json-container .line {\n  margin: 4px 0;\n  display: flex;\n  justify-content: flex-start;\n}\n.json-container .caret-icon {\n  width: 18px;\n  text-align: center;\n  cursor: pointer;\n}\n.json-container .empty-icon {\n  width: 18px;\n}\n.json-container .json-type {\n  margin-right: 4px;\n  margin-left: 4px;\n}\n.json-container .json-key {\n  color: #444;\n  margin-right: 4px;\n  margin-left: 4px;\n}\n.json-container .json-index {\n  margin-right: 4px;\n  margin-left: 4px;\n}\n.json-container .json-value {\n  margin-left: 8px;\n}\n.json-container .json-number {\n  color: #f9ae58;\n}\n.json-container .json-boolean {\n  color: #ec5f66;\n}\n.json-container .json-string {\n  color: #86b25c;\n}\n.json-container .json-size {\n  margin-right: 4px;\n  margin-left: 4px;\n}\n.json-container .hidden {\n  display: none;\n}\n.json-container .fas {\n  display: inline-block;\n  border-style: solid;\n  width: 0;\n  height: 0;\n}\n.json-container .fa-caret-down {\n  border-width: 6px 5px 0 5px;\n  border-color: #808080 transparent;\n}\n.json-container .fa-caret-right {\n  border-width: 5px 0 5px 6px;\n  border-color: transparent transparent transparent #808080;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://jsonview/./src/jsonview.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://jsonview/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://jsonview/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/jsonview.scss":
/*!***************************!*\
  !*** ./src/jsonview.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_jsonview_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./jsonview.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/jsonview.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_jsonview_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_jsonview_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_jsonview_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_jsonview_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://jsonview/./src/jsonview.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://jsonview/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://jsonview/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://jsonview/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://jsonview/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://jsonview/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://jsonview/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/json-view.js":
/*!**************************!*\
  !*** ./src/json-view.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   collapse: () => (/* binding */ collapse),\n/* harmony export */   create: () => (/* binding */ create),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   destroy: () => (/* binding */ destroy),\n/* harmony export */   expand: () => (/* binding */ expand),\n/* harmony export */   render: () => (/* binding */ render),\n/* harmony export */   renderJSON: () => (/* binding */ renderJSON),\n/* harmony export */   toggleNode: () => (/* binding */ toggleNode),\n/* harmony export */   traverse: () => (/* binding */ traverse)\n/* harmony export */ });\n/* harmony import */ var _jsonview_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsonview.scss */ \"./src/jsonview.scss\");\n/* harmony import */ var _utils_getDataType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getDataType */ \"./src/utils/getDataType.js\");\n/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/dom */ \"./src/utils/dom.js\");\n\n\n\n\n\nconst classes = {\n    HIDDEN: 'hidden',\n    CARET_ICON: 'caret-icon',\n    CARET_RIGHT: 'fa-caret-right',\n    CARET_DOWN: 'fa-caret-down',\n    ICON: 'fas'\n}\n\nfunction expandedTemplate(params = {}) {\n  const { key, size } = params;\n  return `\n    <div class=\"line\">\n      <div class=\"caret-icon\"><i class=\"fas fa-caret-right\"></i></div>\n      <div class=\"json-key\">${key}</div>\n      <div class=\"json-size\">${size}</div>\n    </div>\n  `\n}\n\nfunction notExpandedTemplate(params = {}) {\n  const { key, value, type } = params;\n  return `\n    <div class=\"line\">\n      <div class=\"empty-icon\"></div>\n      <div class=\"json-key\">${key}</div>\n      <div class=\"json-separator\">:</div>\n      <div class=\"json-value json-${type}\">${value}</div>\n    </div>\n  `\n}\n\nfunction createContainerElement() {\n  const el = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.element)('div');\n  el.className = 'json-container';\n  return el;\n}\n\nfunction hideNodeChildren(node) {\n  node.children.forEach((child) => {\n    child.el.classList.add(classes.HIDDEN);\n    if (child.isExpanded) {\n      hideNodeChildren(child);\n    }\n  });\n}\n\nfunction showNodeChildren(node) {\n  node.children.forEach((child) => {\n    child.el.classList.remove(classes.HIDDEN);\n    if (child.isExpanded) {\n      showNodeChildren(child);\n    }\n  });\n}\n\nfunction setCaretIconDown(node) {\n  if (node.children.length > 0) {\n    const icon = node.el.querySelector('.' + classes.ICON);\n    if (icon) {\n      icon.classList.replace(classes.CARET_RIGHT, classes.CARET_DOWN);\n    }\n  }\n}\n\nfunction setCaretIconRight(node) {\n  if (node.children.length > 0) {\n    const icon = node.el.querySelector('.' + classes.ICON);\n    if (icon) {\n      icon.classList.replace(classes.CARET_DOWN, classes.CARET_RIGHT);\n    }\n  }\n}\n\nfunction toggleNode(node) {\n  if (node.isExpanded) {\n    node.isExpanded = false;\n    setCaretIconRight(node);\n    hideNodeChildren(node);\n  } else {\n    node.isExpanded = true;\n    setCaretIconDown(node);\n    showNodeChildren(node);\n  }\n}\n\n/**\n * Create node html element\n * @param {object} node \n * @return html element\n */\nfunction createNodeElement(node) {\n  let el = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.element)('div');\n\n  const getSizeString = (node) => {\n    const len = node.children.length;\n    if (node.type === 'array') return `[${len}]`;\n    if (node.type === 'object') return `{${len}}`;\n    return null;\n  }\n\n  if (node.children.length > 0) {\n    el.innerHTML = expandedTemplate({\n      key: node.key,\n      size: getSizeString(node),\n    })\n    const caretEl = el.querySelector('.' + classes.CARET_ICON);\n    node.dispose = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.listen)(caretEl, 'click', () => toggleNode(node));\n  } else {\n    el.innerHTML = notExpandedTemplate({\n      key: node.key,\n      value: node.value,\n      type: node.value === '{}' ? 'object' : typeof node.value\n    })\n  }\n\n  const lineEl = el.children[0];\n\n  if (node.parent !== null) {\n    lineEl.classList.add(classes.HIDDEN);\n  }\n\n  lineEl.style = 'margin-left: ' + node.depth * 18 + 'px;';\n\n  return lineEl;\n}\n\n/**\n * Recursively traverse Tree object\n * @param {Object} node\n * @param {Callback} callback\n */\nfunction traverse(node, callback) {\n  callback(node);\n  if (node.children.length > 0) {\n    node.children.forEach((child) => {\n      traverse(child, callback);\n    });\n  }\n}\n\n/**\n * Create node object\n * @param {object} opt options\n * @return {object}\n */\nfunction createNode(opt = {}) {\n  const isEmptyObject = (value) => {\n    return (\n      (0,_utils_getDataType__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) === 'object' &&\n      Object.keys(value).length === 0\n    )\n  }\n\n  let value = opt.hasOwnProperty('value') ? opt.value : null;\n\n  if (isEmptyObject(value)) {\n    value = \"{}\";\n  }\n\n  return {\n    key: opt.key || null,\n    parent: opt.parent || null,\n    value: value,\n    isExpanded: opt.isExpanded || false,\n    type: opt.type || null,\n    children: opt.children || [],\n    el: opt.el || null,\n    depth: opt.depth || 0,\n    dispose: null\n  }\n}\n\n/**\n * Create subnode for node\n * @param {object} Json data\n * @param {object} node\n */\nfunction createSubnode(data, node) {\n  if (typeof data === 'object') {\n    for (let key in data) {\n      const child = createNode({\n        value: data[key],\n        key: key,\n        depth: node.depth + 1,\n        type: (0,_utils_getDataType__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(data[key]),\n        parent: node,\n      });\n      node.children.push(child);\n      createSubnode(data[key], child);\n    }\n  }\n}\n\nfunction getJsonObject(data) {\n  return typeof data === 'string' ? JSON.parse(data) : data;\n}\n\n/**\n * Create tree\n * @param {object | string} jsonData \n * @return {object}\n */\nfunction create(jsonData) {\n  const parsedData = getJsonObject(jsonData);\n  const rootNode = createNode({\n    value: parsedData,\n    key: (0,_utils_getDataType__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(parsedData),\n    type: (0,_utils_getDataType__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(parsedData),\n  });\n  createSubnode(parsedData, rootNode);\n  return rootNode;\n}\n\n/**\n * Render JSON string into DOM container\n * @param {string | object} jsonData\n * @param {htmlElement} targetElement\n * @return {object} tree\n */\nfunction renderJSON(jsonData, targetElement) {\n  const parsedData = getJsonObject(jsonData);\n  const tree = create(parsedData);\n  render(tree, targetElement);\n  return tree;\n}\n\n/**\n * Render tree into DOM container\n * @param {object} tree\n * @param {htmlElement} targetElement\n */\nfunction render(tree, targetElement) {\n  const containerEl = createContainerElement();\n\n  traverse(tree, function(node) {\n    node.el = createNodeElement(node);\n    containerEl.appendChild(node.el);\n  });\n\n  targetElement.appendChild(containerEl);\n}\n\nfunction expand(node) {\n  traverse(node, function(child) {\n    child.el.classList.remove(classes.HIDDEN);\n    child.isExpanded = true;\n    setCaretIconDown(child);\n  });\n}\n\nfunction collapse(node) {\n  traverse(node, function(child) {\n    child.isExpanded = false;\n    if (child.depth > node.depth) child.el.classList.add(classes.HIDDEN);\n    setCaretIconRight(child);\n  });\n}\n\nfunction destroy(tree) {\n  traverse(tree, (node) => {\n    if (node.dispose) {\n      node.dispose(); \n    }\n  })\n  ;(0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.detach)(tree.el.parentNode);\n}\n\n/**\n * Export public interface\n */\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  toggleNode,\n  render,\n  create,\n  renderJSON,\n  expand,\n  collapse,\n  traverse,\n  destroy\n});\n\n\n//# sourceURL=webpack://jsonview/./src/json-view.js?");

/***/ }),

/***/ "./src/utils/dom.js":
/*!**************************!*\
  !*** ./src/utils/dom.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   append: () => (/* binding */ append),\n/* harmony export */   detach: () => (/* binding */ detach),\n/* harmony export */   element: () => (/* binding */ element),\n/* harmony export */   listen: () => (/* binding */ listen)\n/* harmony export */ });\nfunction element(name) {\n  return document.createElement(name);\n}\n\nfunction append(target, node) {\n  target.appendChild(node);\n}\n\nfunction listen(node, event, handler) {\n  node.addEventListener(event, handler);\n  return () => node.removeEventListener(event, handler);\n}\n\nfunction detach(node) {\n  node.parentNode.removeChild(node);\n}\n\n\n//# sourceURL=webpack://jsonview/./src/utils/dom.js?");

/***/ }),

/***/ "./src/utils/getDataType.js":
/*!**********************************!*\
  !*** ./src/utils/getDataType.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getDataType)\n/* harmony export */ });\n/**\n * Get value data type\n * @param {*} data\n */\nfunction getDataType(val) {\n  if (Array.isArray(val)) return 'array';\n  if (val === null) return 'null';\n  return typeof val;\n}\n\n\n//# sourceURL=webpack://jsonview/./src/utils/getDataType.js?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/json-view.js");
/******/
/******/ 	return __webpack_exports__;
/******/ })()
;
});
