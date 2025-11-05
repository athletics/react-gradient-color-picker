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
import { computePickerPosition, computeSquareXY } from '../utils/utils.js';
import React, { useRef, useState, useEffect } from 'react';
import usePaintSquare from '../hooks/usePaintSquare.js';
import { usePicker } from '../context.js';
import tinycolor from 'tinycolor2';
var Square = function () {
    var _a, _b;
    var _c = usePicker(), hc = _c.hc, config = _c.config, squareWidth = _c.squareWidth, squareHeight = _c.squareHeight, handleChange = _c.handleChange, defaultStyles = _c.defaultStyles, pickerIdSuffix = _c.pickerIdSuffix;
    var crossSize = config.crossSize;
    var _d = useState(false), dragging = _d[0], setDragging = _d[1];
    var canvas = useRef(null);
    var _e = computeSquareXY(hc === null || hc === void 0 ? void 0 : hc.s, (hc === null || hc === void 0 ? void 0 : hc.v) * 100, squareWidth, squareHeight, crossSize), x = _e[0], y = _e[1];
    var _f = useState({ x: x, y: y }), dragPos = _f[0], setDragPos = _f[1];
    var squareRef = useRef(null);
    usePaintSquare(canvas, hc === null || hc === void 0 ? void 0 : hc.h, squareWidth, squareHeight);
    useEffect(function () {
        if (!dragging) {
            setDragPos({ x: (hc === null || hc === void 0 ? void 0 : hc.v) === 0 ? dragPos.x : x, y: y });
        }
    }, [x, y]);
    useEffect(function () {
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
    useEffect(function () {
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
            var updated = tinycolor("hsva(".concat(hc === null || hc === void 0 ? void 0 : hc.h, ", ").concat(newS, "%, ").concat(newY, "%, ").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
            handleChange(updated.toRgbString());
        }
    };
    var setComputedDragPos = function (e) {
        if (squareRef.current) {
            var _a = computePickerPosition(e, squareRef.current, crossSize), x_1 = _a[0], y_1 = _a[1];
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
    return (React.createElement("div", { style: { position: 'relative', marginBottom: 12 }, id: "rbgcp-square-wrapper".concat(pickerIdSuffix) },
        React.createElement("div", { onMouseUp: stopDragging, onTouchEnd: stopDragging, onMouseDown: handleCanvasDown, onTouchStart: handleCanvasDown, id: "rbgcp-square".concat(pickerIdSuffix), ref: squareRef, style: { position: 'relative', cursor: 'ew-cross' } },
            React.createElement("div", { style: __assign(__assign(__assign({}, defaultStyles.rbgcpHandle), { transform: "translate(".concat((_a = dragPos === null || dragPos === void 0 ? void 0 : dragPos.x) !== null && _a !== void 0 ? _a : 0, "px, ").concat((_b = dragPos === null || dragPos === void 0 ? void 0 : dragPos.y) !== null && _b !== void 0 ? _b : 0, "px)") }), (dragging ? { transition: '' } : {})), onMouseDown: handleMouseDown, id: "rbgcp-square-handle".concat(pickerIdSuffix) }),
            React.createElement("div", { style: __assign(__assign({}, defaultStyles.rbgcpCanvasWrapper), { height: squareHeight }), id: "rbgcp-square-canvas-wrapper".concat(pickerIdSuffix), onClick: function (e) { return handleClick(e); } },
                React.createElement("canvas", { ref: canvas, width: "".concat(squareWidth, "px"), height: "".concat(squareHeight, "px"), id: "rbgcp-square-canvas".concat(pickerIdSuffix) })))));
};
export default Square;
