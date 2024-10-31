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
const RETURN_NUMBER = /** @type {const} */ ({
    type: "Function",
    return: { type: "Number" },
})
const RETURN_BOOLEAN = /** @type {const} */ ({
    type: "Function",
    return: { type: "Boolean" },
})

/**
 * @param {TypeName} type
 * @returns {TypeInfo}
 */
function buildGlobalTypedArrayTypeInfo(type) {
    return {
        type: "Function",
        return: { type },
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
            from: { type: "Function", return: { type } },
            of: { type: "Function", return: { type } },
        },
    }
}

/**
 * @param {TypeName} _type
 */
function buildTypedArrayPrototypeTypeInfo(_type) {
    return /** @type {Record<(keyof RelativeIndexable) & string, TypeInfo>} */ ({
        at: { type: "Function" },
    })
}

/** @type {WellKnownGlobals} */
const WELLKNOWN_GLOBALS = {
    String: {
        ...RETURN_STRING,
        properties: {
            fromCharCode: RETURN_STRING,
            fromCodePoint: RETURN_STRING,
            raw: RETURN_STRING,
        },
    },
    Number: {
        ...RETURN_NUMBER,
        properties: {
            EPSILON: { type: "Number" },
            MAX_SAFE_INTEGER: { type: "Number" },
            MAX_VALUE: { type: "Number" },
            MIN_SAFE_INTEGER: { type: "Number" },
            MIN_VALUE: { type: "Number" },
            NaN: { type: "Number" },
            NEGATIVE_INFINITY: { type: "Number" },
            POSITIVE_INFINITY: { type: "Number" },
            isFinite: RETURN_BOOLEAN,
            isInteger: RETURN_BOOLEAN,
            isNaN: RETURN_BOOLEAN,
            isSafeInteger: RETURN_BOOLEAN,
            parseFloat: RETURN_NUMBER,
            parseInt: RETURN_NUMBER,
        },
    },
    Boolean: { type: "Function", return: { type: "Boolean" } },
    Symbol: {
        type: "Function",
        return: { type: "Symbol" },
        properties: {
            for: { type: "Function", return: { type: "Symbol" } },
            keyFor: RETURN_STRING,
            asyncIterator: { type: "Symbol" },
            hasInstance: { type: "Symbol" },
            isConcatSpreadable: { type: "Symbol" },
            iterator: { type: "Symbol" },
            match: { type: "Symbol" },
            matchAll: { type: "Symbol" },
            replace: { type: "Symbol" },
            search: { type: "Symbol" },
            species: { type: "Symbol" },
            split: { type: "Symbol" },
            toPrimitive: { type: "Symbol" },
            toStringTag: { type: "Symbol" },
            unscopables: { type: "Symbol" },
        },
    },
    BigInt: {
        type: "Function",
        return: { type: "BigInt" },
        properties: {
            asIntN: { type: "Function", return: { type: "BigInt" } },
            asUintN: { type: "Function", return: { type: "BigInt" } },
        },
    },
    Object: {
        type: "Function",
        return: { type: "Object" },
        properties: {
            assign: { type: "Function", return: { type: "Object" } },
            create: { type: "Function", return: { type: "Object" } },
            defineProperties: { type: "Function", return: { type: "Object" } },
            defineProperty: { type: "Function", return: { type: "Object" } },
            entries: { type: "Function", return: { type: "Array" } },
            freeze: { type: "Function", return: { type: "Object" } },
            fromEntries: { type: "Function", return: { type: "Object" } },
            getOwnPropertyDescriptor: {
                type: "Function",
                return: { type: "Object" },
            },
            getOwnPropertyDescriptors: {
                type: "Function",
                return: { type: "Object" },
            },
            getOwnPropertyNames: {
                type: "Function",
                return: { type: "Array" },
            },
            getOwnPropertySymbols: {
                type: "Function",
                return: { type: "Array" },
            },
            getPrototypeOf: { type: "Function", return: { type: "Object" } },
            groupBy: { type: "Function", return: { type: "Object" } },
            hasOwn: RETURN_BOOLEAN,
            is: RETURN_BOOLEAN,
            isExtensible: RETURN_BOOLEAN,
            isFrozen: RETURN_BOOLEAN,
            isSealed: RETURN_BOOLEAN,
            keys: { type: "Function", return: { type: "Array" } },
            preventExtensions: { type: "Function", return: { type: "Object" } },
            seal: { type: "Function", return: { type: "Object" } },
            setPrototypeOf: { type: "Function", return: { type: "Object" } },
            values: { type: "Function", return: { type: "Array" } },
        },
    },
    Function: { type: "Function", return: { type: "Function" } },
    Array: {
        type: "Function",
        return: { type: "Array" },
        properties: {
            from: { type: "Function", return: { type: "Array" } },
            fromAsync: { type: "Function", return: { type: "Promise" } },
            isArray: RETURN_BOOLEAN,
            of: { type: "Function", return: { type: "Array" } },
        },
    },
    RegExp: { type: "Function", return: { type: "RegExp" } },
    Date: {
        type: "Function",
        return: { type: "Date" },
        properties: {
            now: { type: "Function", return: { type: "Number" } },
            parse: { type: "Function", return: { type: "Number" } },
            UTC: { type: "Function", return: { type: "Number" } },
        },
    },
    Promise: {
        type: "Function",
        return: { type: "Promise" },
        properties: {
            all: { type: "Function", return: { type: "Promise" } },
            allSettled: { type: "Function", return: { type: "Promise" } },
            any: { type: "Function", return: { type: "Promise" } },
            race: { type: "Function", return: { type: "Promise" } },
            reject: { type: "Function", return: { type: "Promise" } },
            resolve: { type: "Function", return: { type: "Promise" } },
            try: { type: "Function", return: { type: "Promise" } },
            withResolvers: {
                type: "Function",
                return: {
                    type: "Object",
                    properties: {
                        promise: { type: "Promise" },
                        resolve: { type: "Function" },
                        reject: { type: "Function" },
                    },
                },
            },
        },
    },
    Int8Array: buildGlobalTypedArrayTypeInfo("Int8Array"),
    Uint8Array: buildGlobalTypedArrayTypeInfo("Uint8Array"),
    Uint8ClampedArray: buildGlobalTypedArrayTypeInfo("Uint8ClampedArray"),
    Int16Array: buildGlobalTypedArrayTypeInfo("Int16Array"),
    Uint16Array: buildGlobalTypedArrayTypeInfo("Uint16Array"),
    Int32Array: buildGlobalTypedArrayTypeInfo("Int32Array"),
    Uint32Array: buildGlobalTypedArrayTypeInfo("Uint32Array"),
    Float32Array: buildGlobalTypedArrayTypeInfo("Float32Array"),
    Float64Array: buildGlobalTypedArrayTypeInfo("Float64Array"),
    BigInt64Array: buildGlobalTypedArrayTypeInfo("BigInt64Array"),
    BigUint64Array: buildGlobalTypedArrayTypeInfo("BigUint64Array"),
    ArrayBuffer: {
        type: "Function",
        return: { type: "ArrayBuffer" },
        properties: {
            isView: RETURN_BOOLEAN,
        },
    },
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
            getCanonicalLocales: {
                type: "Function",
                return: { type: "Array" },
            },
            supportedValuesOf: {
                type: "Function",
                return: { type: "Array" },
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

const OBJECT_PROTOTYPE = /** @type {const} */ ({
    constructor: { type: "Function" },
    toString: RETURN_STRING,
    toLocaleString: RETURN_STRING,
    valueOf: { type: "Function" },
    hasOwnProperty: RETURN_BOOLEAN,
    isPrototypeOf: RETURN_BOOLEAN,
    propertyIsEnumerable: RETURN_BOOLEAN,
})
const WELLKNOWN_PROTOTYPE = /** @type {WellKnownPrototypes} */ ({
    String: /** @type {Record<(keyof String) & string, TypeInfo>} */ ({
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
        charCodeAt: RETURN_NUMBER,
        codePointAt: RETURN_NUMBER,
        concat: RETURN_STRING,
        endsWith: RETURN_BOOLEAN,
        includes: RETURN_BOOLEAN,
        indexOf: RETURN_NUMBER,
        lastIndexOf: RETURN_NUMBER,
        localeCompare: RETURN_NUMBER,
        match: { type: "Function", return: { type: "Array" } },
        matchAll: { type: "Function", return: { type: "Iterator" } },
        normalize: RETURN_STRING,
        padEnd: RETURN_STRING,
        padStart: RETURN_STRING,
        repeat: RETURN_STRING,
        replace: RETURN_STRING,
        replaceAll: RETURN_STRING,
        search: RETURN_NUMBER,
        slice: RETURN_STRING,
        split: { type: "Function", return: { type: "Array" } },
        startsWith: RETURN_BOOLEAN,
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
        // Properties
        length: { type: "Number" },
    }),
    Number: /** @type {Record<(keyof Number) & string, TypeInfo>} */ ({
        toExponential: RETURN_STRING,
        toFixed: RETURN_STRING,
        toPrecision: RETURN_STRING,
        valueOf: RETURN_NUMBER,
    }),
    Boolean: /** @type {Record<(keyof Boolean) & string, TypeInfo>} */ ({
        valueOf: { type: "Boolean" },
    }),
    BigInt: /** @type {Record<(keyof BigInt) & string, TypeInfo>} */ ({
        valueOf: { type: "BigInt" },
    }),
    Function: /** @type {Record<(keyof Function) & string, TypeInfo>} */ ({
        apply: { type: "Function" },
        bind: { type: "Function", return: { type: "Function" } },
        call: { type: "Function" },
    }),
    Array: /** @type {Record<(keyof Array) & string, TypeInfo>} */ ({
        at: { type: "Function" },
        concat: { type: "Function", return: { type: "Array" } },
        copyWithin: { type: "Function", return: { type: "Array" } },
        entries: { type: "Function", return: { type: "Iterator" } },
        every: RETURN_BOOLEAN,
        fill: { type: "Function", return: { type: "Array" } },
        filter: { type: "Function", return: { type: "Array" } },
        find: { type: "Function" },
        findIndex: RETURN_NUMBER,
        findLast: { type: "Function" },
        findLastIndex: RETURN_NUMBER,
        flat: { type: "Function", return: { type: "Array" } },
        flatMap: { type: "Function", return: { type: "Array" } },
        forEach: { type: "Function" },
        includes: RETURN_BOOLEAN,
        indexOf: RETURN_NUMBER,
        join: RETURN_STRING,
        keys: { type: "Function", return: { type: "Iterator" } },
        lastIndexOf: RETURN_NUMBER,
        map: { type: "Function", return: { type: "Array" } },
        pop: { type: "Function" },
        push: { type: "Function" },
        reduce: { type: "Function" },
        reduceRight: { type: "Function" },
        reverse: { type: "Function", return: { type: "Array" } },
        shift: { type: "Function" },
        slice: { type: "Function", return: { type: "Array" } },
        some: RETURN_BOOLEAN,
        sort: { type: "Function", return: { type: "Array" } },
        splice: { type: "Function", return: { type: "Array" } },
        toReversed: { type: "Function", return: { type: "Array" } },
        toSorted: { type: "Function", return: { type: "Array" } },
        toSpliced: { type: "Function", return: { type: "Array" } },
        unshift: { type: "Function" },
        values: { type: "Function", return: { type: "Iterator" } },
        with: { type: "Function", return: { type: "Array" } },
        toString: RETURN_STRING,
        toLocaleString: RETURN_STRING,
        // Properties
        length: { type: "Number" },
    }),
    RegExp: /** @type {Record<(keyof RegExp) & string, TypeInfo>} */ ({
        compile: { type: "Function" },
        test: RETURN_BOOLEAN,
        exec: { type: "Function", return: { type: "Array" } },
        // Properties
        dotAll: { type: "Boolean" },
        flags: { type: "String" },
        global: { type: "Boolean" },
        hasIndices: { type: "Boolean" },
        ignoreCase: { type: "Boolean" },
        lastIndex: { type: "Number" },
        multiline: { type: "Boolean" },
        source: { type: "String" },
        sticky: { type: "Boolean" },
        unicode: { type: "Boolean" },
        unicodeSets: { type: "Boolean" },
    }),
    Date: /** @type {Record<(keyof Date) & string, TypeInfo>} */ ({
        getDate: RETURN_NUMBER,
        getDay: RETURN_NUMBER,
        getFullYear: RETURN_NUMBER,
        getHours: RETURN_NUMBER,
        getMilliseconds: RETURN_NUMBER,
        getMinutes: RETURN_NUMBER,
        getMonth: RETURN_NUMBER,
        getSeconds: RETURN_NUMBER,
        getTime: RETURN_NUMBER,
        getTimezoneOffset: RETURN_NUMBER,
        getUTCDate: RETURN_NUMBER,
        getUTCDay: RETURN_NUMBER,
        getUTCFullYear: RETURN_NUMBER,
        getUTCHours: RETURN_NUMBER,
        getUTCMilliseconds: RETURN_NUMBER,
        getUTCMinutes: RETURN_NUMBER,
        getUTCMonth: RETURN_NUMBER,
        getUTCSeconds: RETURN_NUMBER,
        getYear: RETURN_NUMBER,
        setDate: RETURN_NUMBER,
        setFullYear: RETURN_NUMBER,
        setHours: RETURN_NUMBER,
        setMilliseconds: RETURN_NUMBER,
        setMinutes: RETURN_NUMBER,
        setMonth: RETURN_NUMBER,
        setSeconds: RETURN_NUMBER,
        setTime: RETURN_NUMBER,
        setUTCDate: RETURN_NUMBER,
        setUTCFullYear: RETURN_NUMBER,
        setUTCHours: RETURN_NUMBER,
        setUTCMilliseconds: RETURN_NUMBER,
        setUTCMinutes: RETURN_NUMBER,
        setUTCMonth: RETURN_NUMBER,
        setUTCSeconds: RETURN_NUMBER,
        setYear: RETURN_NUMBER,
        toDateString: RETURN_STRING,
        toISOString: RETURN_STRING,
        toJSON: RETURN_STRING,
        toGMTString: RETURN_STRING,
        toLocaleDateString: RETURN_STRING,
        toLocaleString: RETURN_STRING,
        toLocaleTimeString: RETURN_STRING,
        toTimeString: RETURN_STRING,
        toUTCString: RETURN_STRING,
        valueOf: RETURN_NUMBER,
        toString: RETURN_STRING,
        // bug? https://github.com/microsoft/TypeScript/issues/51636
        getVarDate: { type: "undefined" },
    }),
    Int8Array: buildTypedArrayPrototypeTypeInfo("Int8Array"),
    Uint8Array: buildTypedArrayPrototypeTypeInfo("Uint8Array"),
    Uint8ClampedArray: buildTypedArrayPrototypeTypeInfo("Uint8ClampedArray"),
    Int16Array: buildTypedArrayPrototypeTypeInfo("Int16Array"),
    Uint16Array: buildTypedArrayPrototypeTypeInfo("Uint16Array"),
    Int32Array: buildTypedArrayPrototypeTypeInfo("Int32Array"),
    Uint32Array: buildTypedArrayPrototypeTypeInfo("Uint32Array"),
    Float32Array: buildTypedArrayPrototypeTypeInfo("Float32Array"),
    Float64Array: buildTypedArrayPrototypeTypeInfo("Float64Array"),
    BigInt64Array: buildTypedArrayPrototypeTypeInfo("BigInt64Array"),
    BigUint64Array: buildTypedArrayPrototypeTypeInfo("BigUint64Array"),
    ArrayBuffer:
        /** @type {Record<(keyof ArrayBuffer) & string, TypeInfo>} */ ({
            resize: { type: "Function" },
            slice: { type: "Function", return: { type: "ArrayBuffer" } },
            transfer: { type: "Function", return: { type: "ArrayBuffer" } },
            transferToFixedLength: {
                type: "Function",
                return: { type: "ArrayBuffer" },
            },
            // Properties
            byteLength: { type: "Number" },
            detached: { type: "Boolean" },
            maxByteLength: { type: "Number" },
            resizable: { type: "Boolean" },
        }),
    SharedArrayBuffer:
        /** @type {Record<(keyof SharedArrayBuffer) & string, TypeInfo>} */ ({
            grow: { type: "Function" },
            slice: { type: "Function", return: { type: "SharedArrayBuffer" } },
            // Properties
            byteLength: { type: "Number" },
            growable: { type: "Boolean" },
            maxByteLength: { type: "Number" },
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
            some: RETURN_BOOLEAN,
            every: RETURN_BOOLEAN,
            find: { type: "Function" },
        }),
})

/**
 * @param {TypeInfo} typeInfo
 * @param {string} propertyName
 * @returns {TypeInfo | null}
 */
function getPropertyType(typeInfo, propertyName) {
    const prop = typeInfo.properties?.[propertyName]
    if (prop) {
        return prop
    }
    const proto = WELLKNOWN_PROTOTYPE[typeInfo.type]?.[propertyName]
    if (proto) {
        return proto
    }
    return OBJECT_PROTOTYPE[propertyName] ?? null
}

module.exports = { WELLKNOWN_GLOBALS, getPropertyType }
