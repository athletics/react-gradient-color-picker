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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_js_1 = require("../utils/utils.js");
var react_1 = __importStar(require("react"));
var usePaintSquare_js_1 = __importDefault(require("../hooks/usePaintSquare.js"));
var context_js_1 = require("../context.js");
var tinycolor2_1 = __importDefault(require("tinycolor2"));
var Square = function () {
    var _a, _b;
    var _c = (0, context_js_1.usePicker)(), hc = _c.hc, config = _c.config, squareWidth = _c.squareWidth, squareHeight = _c.squareHeight, handleChange = _c.handleChange, defaultStyles = _c.defaultStyles, pickerIdSuffix = _c.pickerIdSuffix;
    var crossSize = config.crossSize;
    var _d = (0, react_1.useState)(false), dragging = _d[0], setDragging = _d[1];
    var canvas = (0, react_1.useRef)(null);
    var _e = (0, utils_js_1.computeSquareXY)(hc === null || hc === void 0 ? void 0 : hc.s, (hc === null || hc === void 0 ? void 0 : hc.v) * 100, squareWidth, squareHeight, crossSize), x = _e[0], y = _e[1];
    var _f = (0, react_1.useState)({ x: x, y: y }), dragPos = _f[0], setDragPos = _f[1];
    var squareRef = (0, react_1.useRef)(null);
    (0, usePaintSquare_js_1.default)(canvas, hc === null || hc === void 0 ? void 0 : hc.h, squareWidth, squareHeight);
    (0, react_1.useEffect)(function () {
        if (!dragging) {
            setDragPos({ x: (hc === null || hc === void 0 ? void 0 : hc.v) === 0 ? dragPos.x : x, y: y });
        }
    }, [x, y]);
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
    (0, react_1.useEffect)(function () {
        if (dragging) {
            handleColor();
        }
    }, [dragPos.x, dragPos.y, dragging]);
    var handleColor = function () {
        var x = dragPos.x, y = dragPos.y;
        if (x && y) {
            var x1 = Math.min(x + crossSize / 2.2, squareWidth);
            var y1 = Math.min(y + crossSize / 2.2, squareHeight);
            var newS = (x1 / squareWidth) * 100;
            var newY = 100 - (y1 / squareHeight) * 100;
            var updated = (0, tinycolor2_1.default)("hsva(".concat(hc === null || hc === void 0 ? void 0 : hc.h, ", ").concat(newS, "%, ").concat(newY, "%, ").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
            handleChange(updated.toRgbString());
        }
    };
    var setComputedDragPos = function (e) {
        if (squareRef.current) {
            var _a = (0, utils_js_1.computePickerPosition)(e, squareRef.current, crossSize), x_1 = _a[0], y_1 = _a[1];
            setDragPos({ x: x_1, y: y_1 });
        }
    };
    var stopDragging = function () {
        setDragging(false);
    };
    var handleMove = function (e) {
        if (dragging) {
            setComputedDragPos(e);
        }
    };
    var handleClick = function (e) {
        if (!dragging) {
            setComputedDragPos(e);
        }
    };
    var handleMouseDown = function () {
        setDragging(true);
    };
    var handleCanvasDown = function (e) {
        setDragging(true);
        setComputedDragPos(e);
    };
    return (react_1.default.createElement("div", { style: { position: 'relative', marginBottom: 12 }, id: "rbgcp-square-wrapper".concat(pickerIdSuffix) },
        react_1.default.createElement("div", { onMouseUp: stopDragging, onTouchEnd: stopDragging, onMouseDown: handleCanvasDown, onTouchStart: handleCanvasDown, id: "rbgcp-square".concat(pickerIdSuffix), ref: squareRef, style: { position: 'relative', cursor: 'ew-cross' } },
            react_1.default.createElement("div", { style: __assign(__assign(__assign({}, defaultStyles.rbgcpHandle), { transform: "translate(".concat((_a = dragPos === null || dragPos === void 0 ? void 0 : dragPos.x) !== null && _a !== void 0 ? _a : 0, "px, ").concat((_b = dragPos === null || dragPos === void 0 ? void 0 : dragPos.y) !== null && _b !== void 0 ? _b : 0, "px)") }), (dragging ? { transition: '' } : {})), onMouseDown: handleMouseDown, id: "rbgcp-square-handle".concat(pickerIdSuffix) }),
            react_1.default.createElement("div", { style: __assign(__assign({}, defaultStyles.rbgcpCanvasWrapper), { height: squareHeight }), id: "rbgcp-square-canvas-wrapper".concat(pickerIdSuffix), onClick: function (e) { return handleClick(e); } },
                react_1.default.createElement("canvas", { ref: canvas, width: "".concat(squareWidth, "px"), height: "".concat(squareHeight, "px"), id: "rbgcp-square-canvas".concat(pickerIdSuffix) })))));
};
exports.default = Square;
