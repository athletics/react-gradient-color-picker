"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jsx-a11y/no-static-element-interactions */
var react_1 = __importStar(require("react"));
var context_js_1 = require("../context.js");
var utils_js_1 = require("../utils/utils.js");
var Opacity = function () {
    var _a = (0, context_js_1.usePicker)(), config = _a.config, _b = _a.hc, hc = _b === void 0 ? {} : _b, squareWidth = _a.squareWidth, handleChange = _a.handleChange, defaultStyles = _a.defaultStyles, pickerIdSuffix = _a.pickerIdSuffix;
    var _c = (0, react_1.useState)(false), dragging = _c[0], setDragging = _c[1];
    var r = hc.r, g = hc.g, b = hc.b;
    var bg = "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(".concat(r, ",").concat(g, ",").concat(b, ",1) 100%)");
    var barSize = config.barSize;
    var hcRef = (0, react_1.useRef)(hc);
    (0, react_1.useEffect)(function () {
        hcRef.current = hc;
    }, [hc]);
    var opacityRef = (0, react_1.useRef)(null);
    var stopDragging = function () {
        setDragging(false);
    };
    var handleDown = function () {
        setDragging(true);
    };
    var handleOpacity = function (x) {
        if (opacityRef.current) {
            var _a = hcRef.current, r_1 = _a.r, g_1 = _a.g, b_1 = _a.b;
            var newO = (0, utils_js_1.getHandleValue)(x, opacityRef.current, barSize) / 100;
            var newColor = "rgba(".concat(r_1, ", ").concat(g_1, ", ").concat(b_1, ", ").concat(newO, ")");
            handleChange(newColor);
        }
    };
    var handleMove = function (e) {
        if (dragging) {
            handleOpacity(e.clientX);
        }
    };
    var handleClick = function (e) {
        if (!dragging) {
            handleOpacity(e.clientX);
        }
    };
    var left = squareWidth - 18;
    (0, react_1.useEffect)(function () {
        var handleUp = function () {
            stopDragging();
        };
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('mousemove', handleMove);
        return function () {
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('mousemove', handleMove);
        };
    }, [dragging]);
    return (react_1.default.createElement("div", { onMouseDown: handleDown, style: {
            height: 14,
            marginTop: 17,
            marginBottom: 4,
            cursor: 'ew-resize',
            position: 'relative',
        }, id: "rbgcp-opacity-wrapper".concat(pickerIdSuffix) },
        react_1.default.createElement("div", { 
            // className="rbgcp-opacity-checkered"
            id: "rbgcp-opacity-checkered-bg".concat(pickerIdSuffix), style: __assign(__assign({}, defaultStyles.rbgcpCheckered), { width: '100%', height: 14 }) }),
        react_1.default.createElement("div", { 
            // className="rbgcp-handle rbgcp-handle-opacity"
            id: "rbgcp-opacity-handle".concat(pickerIdSuffix), style: __assign(__assign({}, defaultStyles.rbgcpHandle), { left: left * (hc === null || hc === void 0 ? void 0 : hc.a), top: -2 }) }),
        react_1.default.createElement("div", { ref: opacityRef, style: __assign(__assign({}, defaultStyles.rbgcpOpacityOverlay), { background: bg }), id: "rbgcp-opacity-overlay".concat(pickerIdSuffix), 
            // className="rbgcp-opacity-overlay"
            onClick: function (e) { return handleClick(e); } })));
};
exports.default = Opacity;
