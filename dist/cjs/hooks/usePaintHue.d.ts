import { RefObject } from 'react';
declare const usePaintHue: (canvas: RefObject<HTMLCanvasElement | null>, squareWidth: number) => void;
export default usePaintHue;
export declare const usePaintSat: (canvas: RefObject<HTMLCanvasElement | null>, h: number, l: number, squareWidth: number) => void;
export declare const usePaintLight: (canvas: RefObject<HTMLCanvasElement | null>, h: number, s: number, squareWidth: number) => void;
export declare const usePaintBright: (canvas: RefObject<HTMLCanvasElement | null>, h: number, s: number, squareWidth: number) => void;
