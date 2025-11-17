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
import React, { useRef, useState, useEffect } from 'react';
import { usePicker } from '../context.js';
import usePaintHue from '../hooks/usePaintHue.js';
import { getHandleValue } from '../utils/utils.js';
import tinycolor from 'tinycolor2';
var Hue = function () {
    var barRef = useRef(null);
    var _a = usePicker(), config = _a.config, handleChange = _a.handleChange, squareWidth = _a.squareWidth, hc = _a.hc, setHc = _a.setHc, pickerIdSuffix = _a.pickerIdSuffix;
    var _b = useState(false), dragging = _b[0], setDragging = _b[1];
    var barSize = config.barSize;
    usePaintHue(barRef, squareWidth);
    var hueRef = useRef(null);
    var hcRef = useRef(hc);
    useEffect(function () {
        hcRef.current = hc;
    }, [hc]);
    var stopDragging = function () {
        setDragging(false);
    };
    var handleDown = function () {
        setDragging(true);
    };
    var handleHue = function (x) {
        var _a, _b;
        if (hueRef.current) {
            var newHue = getHandleValue(x, hueRef.current, barSize) * 3.6;
            var tinyHsv = tinycolor({
                h: newHue,
                s: (_a = hcRef.current) === null || _a === void 0 ? void 0 : _a.s,
                v: (_b = hcRef.current) === null || _b === void 0 ? void 0 : _b.v,
            });
            var _c = tinyHsv.toRgb(), r = _c.r, g = _c.g, b = _c.b;
            handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(hcRef.current.a, ")"));
            setHc(__assign(__assign({}, hcRef.current), { h: newHue }));
        }
    };
    var handleMove = function (e) {
        if (dragging) {
            handleHue(e.clientX);
        }
    };
    var handleClick = function (e) {
        if (!dragging) {
            handleHue(e.clientX);
        }
    };
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
    return (React.createElement("div", { style: {
            height: 14,
            marginTop: 17,
            marginBottom: 4,
            cursor: 'ew-resize',
            position: 'relative',
        }, ref: hueRef, onMouseDown: handleDown, id: "rbgcp-hue-wrap".concat(pickerIdSuffix) },
        React.createElement("div", { tabIndex: 0, role: "button", 
            // className="rbgcp-handle rbgcp-handle-hue"
            style: {
                border: '2px solid white',
                borderRadius: '50%',
                boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
                width: '18px',
                height: '18px',
                zIndex: 1000,
                //transition: 'all 10ms linear',
                position: 'absolute',
                left: (hc === null || hc === void 0 ? void 0 : hc.h) * ((squareWidth - 18) / 360),
                top: -2,
                cursor: 'ew-resize',
                boxSizing: 'border-box',
            }, id: "rbgcp-hue-handle".concat(pickerIdSuffix) }),
        React.createElement("canvas", { ref: barRef, height: "14px", 
            // className="rbgcp-hue-bar"
            width: "".concat(squareWidth, "px"), onClick: function (e) { return handleClick(e); }, id: "rbgcp-hue-bar".concat(pickerIdSuffix), style: {
                borderRadius: 14,
                position: 'relative',
                verticalAlign: 'top',
            } })));
};
export default Hue;
