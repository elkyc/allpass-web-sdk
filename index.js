/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("/**\n * Created by Viktor Plotnikov <viktor.plotnikov@elkyc.com>\n * Date: 11/03/2023 12:02\n */\n(() => {\n  const Allpass = () => {\n    const host = \"https://dev-brw.elkyc.com\";\n    const sdkVersion = \"1.0.12\";\n    const sdkPrefix = \"allpass\";\n    let eventHandlers = {};\n    const authError = 'Authentication failed';\n    const sessionPrefix = `${sdkPrefix}Session_`;\n    const validateJwt = token => token && /^[a-zA-Z0-9-_]+?\\.[a-zA-Z0-9-_]+?(\\.[a-zA-Z0-9-_]+?)?$/.test(token);\n    const generateCacheKey = appKey => sessionPrefix + appKey;\n    const parseJwt = function (token) {\n      let checkExpire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n      if (!token || !validateJwt(token)) {\n        return null;\n      }\n      const data = JSON.parse(atob(token.split('.')[1]));\n      if (checkExpire && Date.now() >= data.exp * 1000) {\n        return null;\n      }\n      return data;\n    };\n    const getSessionFromCache = cacheKey => {\n      const accessToken = sessionStorage.getItem(cacheKey);\n      if (accessToken) {\n        const data = parseJwt(accessToken, true);\n        if (data) {\n          return {\n            accessToken,\n            data\n          };\n        }\n        sessionStorage.removeItem(cacheKey);\n      }\n      return null;\n    };\n    const createIFrame = (accessToken, data) => {\n      const {\n        lang\n      } = data;\n      const div = document.getElementById(sdkPrefix);\n      if (!div) {\n        throw new Error(`Element with id \"${sdkPrefix}\" not found`);\n      }\n      div.innerHTML = '';\n      const metaScale = document.createElement('meta');\n      metaScale.name = 'viewport';\n      metaScale.content = 'width=device-width, initial-scale=1';\n      document.getElementsByTagName('head')[0].appendChild(metaScale);\n      div.style.minHeight = 'min-content';\n      div.style.position = 'relative';\n      div.style.overflow = 'hidden';\n      div.style.paddingTop = `${Math.max(document.documentElement.clientHeight, 650)}px`;\n      div.style.display = 'none';\n      const iframe = document.createElement('iframe');\n      iframe.src = `${host}/${accessToken}?sdkVersion=${sdkVersion}&isFrame=1&${lang ? `lang=${lang}` : ''}`;\n      iframe.allow = \"camera *\";\n      iframe.onload = eventHandlers.onLoad;\n      iframe.style.position = 'absolute';\n      iframe.style.top = '0';\n      iframe.style.left = '0';\n      iframe.style.width = '100%';\n      iframe.style.height = '100%';\n      iframe.style.border = '0';\n      div.appendChild(iframe);\n    };\n    const onChangeIframe = e => {\n      const {\n        height\n      } = e || document.documentElement.clientHeight;\n      const div = document.getElementById(sdkPrefix);\n      div.style.paddingTop = height;\n    };\n    window.addEventListener('message', event => {\n      if (event.origin !== host || !event.data || !event.data.type || !eventHandlers[event.data.type]) {\n        return;\n      }\n      switch (event.data.type) {\n        case 'onComplete':\n        case 'onError':\n          if (event.data.appKey) {\n            sessionStorage.removeItem(generateCacheKey(event.data.appKey));\n          }\n          break;\n      }\n      eventHandlers[event.data.type](event.data);\n    });\n    return () => ({\n      init: function (_ref) {\n        let {\n          onLoad,\n          onRestart,\n          onStart,\n          onPassStep,\n          onComplete,\n          onError\n        } = _ref;\n        eventHandlers = {\n          onLoad,\n          onRestart,\n          onStart,\n          onPassStep,\n          onComplete,\n          onError,\n          onChangeIframe\n        };\n        return this;\n      },\n      start: async accessToken => {\n        const data = parseJwt(accessToken);\n        if (!data) {\n          throw new Error(authError);\n        }\n        sessionStorage.setItem(generateCacheKey(data.appKey), accessToken);\n        createIFrame(accessToken, data);\n      },\n      restart: () => {\n        for (const key in sessionStorage) {\n          if (key.indexOf(sessionPrefix) !== 0) {\n            continue;\n          }\n          const session = getSessionFromCache(key);\n          if (session) {\n            const {\n              accessToken,\n              data\n            } = session;\n            eventHandlers.onRestart(data);\n            return createIFrame(accessToken, data);\n          }\n        }\n      },\n      clearSessions: () => {\n        for (const key in sessionStorage) {\n          if (key.indexOf(sessionPrefix) === 0) {\n            sessionStorage.removeItem(key);\n          }\n        }\n      },\n      getVersion: () => sdkVersion,\n      close: () => {\n        const div = document.getElementById(sdkPrefix);\n        if (div) {\n          div.innerHTML = '';\n        }\n      }\n    });\n  };\n  window.Allpass = Allpass()();\n})();\n\n//# sourceURL=webpack://@allpass/web-sdk/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;