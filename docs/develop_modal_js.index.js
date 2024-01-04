"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["develop_modal_js"],{

/***/ "./develop/modal.js":
/*!**************************!*\
  !*** ./develop/modal.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst InfoModal = (movie, $body) => {\n  const {\n    id,\n    title,\n    rating\n  } = movie;\n  const $wrapper = document.createElement('div');\n  const $modal = document.createElement('div');\n  const $header = document.createElement('div');\n  const $title = document.createElement('span');\n  const $content = document.createElement('div');\n  const $id = document.createElement('span');\n  const $rating = document.createElement('span');\n  const $button = document.createElement('button');\n  $wrapper.className = 'info-modal-wrapper';\n  $modal.className = 'info-modal-window';\n  $header.className = 'info-modal-header';\n  $content.className = 'info-modal-content';\n  $button.className = 'info-modal-button';\n  if (title.length > 20) {\n    $title.classList.add('slide-text');\n  }\n  $title.textContent = title;\n  $id.textContent = \"id : \".concat(id);\n  $rating.textContent = \"\\uD3C9\\uC810 : \".concat(rating);\n  $button.textContent = '닫기';\n  $header.append($title);\n  $content.appendChild($id);\n  $content.appendChild($rating);\n  $modal.appendChild($header);\n  $modal.appendChild($content);\n  $modal.appendChild($button);\n  $wrapper.appendChild($modal);\n  const closeModal = () => {\n    $body.style.overflow = 'auto';\n    $body.removeChild($wrapper);\n  };\n  $button.addEventListener('click', () => {\n    closeModal();\n  });\n  $wrapper.addEventListener('click', e => {\n    e.target.className === 'info-modal-wrapper' && closeModal();\n  });\n  return $wrapper;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfoModal);\n\n//# sourceURL=webpack:///./develop/modal.js?");

/***/ })

}]);