// @ts-check

"use strict"

/**
 * @typedef {import('./types').TypeName} TypeName
 * @typedef {import('./types').TypeInfo} TypeInfo
 * @typedef {import('./types').WellKnownGlobals} WellKnownGlobals
 * @typedef {import('./types').WellKnownPrototypes} WellKnownPrototypes
 */

const RETURN_STRING = /** @type {const} */ ({
    type: "Function",
    return: { type: "String" },
})

/** @type {WellKnownGlobals} */
const WELLKNOWN_GLOBALS = {
    String: RETURN_STRING,
    Number: { type: "Function", return: { type: "Number" } },
    Boolean: { type: "Function", return: { type: "Boolean" } },
    Symbol: { type: "Function", return: { type: "Symbol" } },
    BigInt: { type: "Function", return: { type: "BigInt" } },
    Object: { type: "Function", return: { type: "Object" } },
    Function: { type: "Function", return: { type: "Function" } },
    Array: { type: "Function", return: { type: "Array" } },
    RegExp: { type: "Function", return: { type: "RegExp" } },
    Date: { type: "Function", return: { type: "Date" } },
    Promise: { type: "Function", return: { type: "Promise" } },
    Int8Array: { type: "Function", return: { type: "Int8Array" } },
    Uint8Array: { type: "Function", return: { type: "Uint8Array" } },
    Uint8ClampedArray: {
        type: "Function",
        return: { type: "Uint8ClampedArray" },
    },
    Int16Array: { type: "Function", return: { type: "Int16Array" } },
    Uint16Array: { type: "Function", return: { type: "Uint16Array" } },
    Int32Array: { type: "Function", return: { type: "Int32Array" } },
    Uint32Array: { type: "Function", return: { type: "Uint32Array" } },
    Float32Array: { type: "Function", return: { type: "Float32Array" } },
    Float64Array: { type: "Function", return: { type: "Float64Array" } },
    BigInt64Array: { type: "Function", return: { type: "BigInt64Array" } },
    BigUint64Array: {
        type: "Function",
        return: { type: "BigUint64Array" },
    },
    ArrayBuffer: { type: "Function", return: { type: "ArrayBuffer" } },
    SharedArrayBuffer: {
        type: "Function",
        return: { type: "SharedArrayBuffer" },
    },
    Intl: {
        type: "Object",
        properties: {
            Collator: {
                type: "Function",
                return: { type: "Intl.Collator" },
            },
            DateTimeFormat: {
                type: "Function",
                return: { type: "Intl.DateTimeFormat" },
            },
            ListFormat: {
                type: "Function",
                return: { type: "Intl.ListFormat" },
            },
            NumberFormat: {
                type: "Function",
                return: { type: "Intl.NumberFormat" },
            },
            PluralRules: {
                type: "Function",
                return: { type: "Intl.PluralRules" },
            },
            RelativeTimeFormat: {
                type: "Function",
                return: { type: "Intl.RelativeTimeFormat" },
            },
            Segmenter: {
                type: "Function",
                return: { type: "Intl.Segmenter" },
            },
        },
    },
    Iterator: {
        type: "Function",
        return: { type: "Iterator" },
        properties: {
            from: { type: "Function", return: { type: "Iterator" } },
        },
    },
    undefined: { type: "undefined" },
    NaN: { type: "Number" },
    Infinity: { type: "Number" },
}

/**
 * @typedef {"constructor"
 *   | "toString"
 *   | "toLocaleString"
 *   | "valueOf"
 *   | "hasOwnProperty"
 *   | "isPrototypeOf"
 *   | "propertyIsEnumerable"} ObjectKeys
 */

const OBJECT_PROTOTYPE = /** @type {Record<ObjectKeys, TypeInfo>} */ ({
    constructor: { type: "Function" },
    toString: { type: "Function", return: { type: "String" } },
    toLocaleString: { type: "Function", return: { type: "String" } },
    valueOf: { type: "Function" },
    hasOwnProperty: { type: "Function", return: { type: "Boolean" } },
    isPrototypeOf: { type: "Function", return: { type: "Boolean" } },
    propertyIsEnumerable: { type: "Function", return: { type: "Boolean" } },
})
const WELLKNOWN_PROTOTYPE = /** @type {WellKnownPrototypes} */ ({
    String: /** @type {Record<(keyof String) & string, TypeInfo>} */ ({
        ...OBJECT_PROTOTYPE,
        // HTML
        anchor: RETURN_STRING,
        big: RETURN_STRING,
        blink: RETURN_STRING,
        bold: RETURN_STRING,
        fixed: RETURN_STRING,
        fontcolor: RETURN_STRING,
        fontsize: RETURN_STRING,
        italics: RETURN_STRING,
        link: RETURN_STRING,
        small: RETURN_STRING,
        strike: RETURN_STRING,
        sub: RETURN_STRING,
        sup: RETURN_STRING,
        // ES
        charAt: RETURN_STRING,
        at: RETURN_STRING,
        charCodeAt: { type: "Function", return: { type: "Number" } },
        codePointAt: { type: "Function", return: { type: "Number" } },
        concat: RETURN_STRING,
        endsWith: { type: "Function", return: { type: "Boolean" } },
        includes: { type: "Function", return: { type: "Boolean" } },
        indexOf: { type: "Function", return: { type: "Number" } },
        lastIndexOf: { type: "Function", return: { type: "Number" } },
        length: { type: "Number" },
        localeCompare: { type: "Function", return: { type: "Number" } },
        match: { type: "Function", return: { type: "Array" } },
        matchAll: { type: "Function", return: { type: "Iterator" } },
        normalize: RETURN_STRING,
        padEnd: RETURN_STRING,
        padStart: RETURN_STRING,
        repeat: RETURN_STRING,
        replace: RETURN_STRING,
        replaceAll: RETURN_STRING,
        search: { type: "Function", return: { type: "Number" } },
        slice: RETURN_STRING,
        split: { type: "Function", return: { type: "Array" } },
        startsWith: { type: "Function", return: { type: "Boolean" } },
        substr: RETURN_STRING,
        substring: RETURN_STRING,
        toLowerCase: RETURN_STRING,
        toLocaleLowerCase: RETURN_STRING,
        toUpperCase: RETURN_STRING,
        toLocaleUpperCase: RETURN_STRING,
        trim: RETURN_STRING,
        trimEnd: RETURN_STRING,
        trimLeft: RETURN_STRING,
        trimRight: RETURN_STRING,
        trimStart: RETURN_STRING,
        valueOf: RETURN_STRING,
    }),
    Iterator:
        /** @type {Record<(keyof IteratorObject) & string, TypeInfo>} */ ({
            next: { type: "Function" },
            return: { type: "Function" },
            throw: { type: "Function" },
            // iterator-helpers
            map: { type: "Function", return: { type: "Iterator" } },
            filter: { type: "Function", return: { type: "Iterator" } },
            take: { type: "Function", return: { type: "Iterator" } },
            drop: { type: "Function", return: { type: "Iterator" } },
            flatMap: { type: "Function", return: { type: "Iterator" } },
            reduce: { type: "Function" },
            toArray: { type: "Function", return: { type: "Array" } },
            forEach: { type: "Function" },
            some: { type: "Function", return: { type: "Boolean" } },
            every: { type: "Function", return: { type: "Boolean" } },
            find: { type: "Function" },
        }),
})

module.exports = { WELLKNOWN_GLOBALS, WELLKNOWN_PROTOTYPE }
