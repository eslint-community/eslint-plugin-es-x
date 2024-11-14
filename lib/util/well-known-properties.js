"use strict"

const objectPrototypeProperties = new Set([
    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-object-prototype-object
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
    "__proto__",
    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__",
])

const objectProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-object-constructor
    "assign",
    "create",
    "defineProperties",
    "defineProperty",
    "entries",
    "freeze",
    "fromEntries",
    "getOwnPropertyDescriptor",
    "getOwnPropertyDescriptors",
    "getOwnPropertyNames",
    "getOwnPropertySymbols",
    "getPrototypeOf",
    "groupBy",
    "hasOwn",
    "is",
    "isExtensible",
    "isFrozen",
    "isSealed",
    "keys",
    "preventExtensions",
    "prototype",
    "seal",
    "setPrototypeOf",
    "values",
])

const functionProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-function-constructor
    "prototype",
])

const functionPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-function-prototype-object

    "apply",
    "bind",
    "call",
    "constructor",
    "toString",
    // Symbol.hasInstance

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function-instances
    "length",
    "name",
    "prototype",
])

const booleanProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-boolean-constructor
    "prototype",
])

const booleanPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-boolean-prototype-object
    "constructor",
    "toString",
    "valueOf",
])

const symbolProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-symbol-constructor
    "asyncIterator",
    "for",
    "hasInstance",
    "isConcatSpreadable",
    "iterator",
    "keyFor",
    "match",
    "matchAll",
    "prototype",
    "replace",
    "search",
    "species",
    "split",
    "toPrimitive",
    "toStringTag",
    "unscopables",
])

const symbolPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-symbol-prototype-object
    "description",
    "toString",
    "valueOf",
    // Symbol.toPrimitive
    // Symbol.toStringTag
])

const numberProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-properties-of-the-number-constructor
    "EPSILON",
    "isFinite",
    "isInteger",
    "isNaN",
    "isSafeInteger",
    "MAX_SAFE_INTEGER",
    "MAX_VALUE",
    "MIN_SAFE_INTEGER",
    "MIN_VALUE",
    "NaN",
    "NEGATIVE_INFINITY",
    "parseFloat",
    "parseInt",
    "POSITIVE_INFINITY",
    "prototype",
])

const numberPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-properties-of-the-number-prototype-object
    "constructor",
    "toExponential",
    "toFixed",
    "toLocaleString",
    "toPrecision",
    "toString",
    "valueOf",
])

const bigintProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-properties-of-the-bigint-constructor
    "asIntN",
    "asUintN",
    "prototype",
])

const bigintPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-properties-of-the-bigint-prototype-object
    "constructor",
    "toLocaleString",
    "toString",
    "valueOf",
])

const mathProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-value-properties-of-the-math-object
    "E",
    "LN10",
    "LN2",
    "LOG10E",
    "LOG2E",
    "PI",
    "SQRT1_2",
    "SQRT2",
    // Symbol.toStringTag

    // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-function-properties-of-the-math-object
    "abs",
    "acos",
    "acosh",
    "asin",
    "asinh",
    "atan",
    "atanh",
    "atan2",
    "cbrt",
    "ceil",
    "clz32",
    "cos",
    "cosh",
    "exp",
    "expm1",
    "floor",
    "fround",
    "hypot",
    "imul",
    "log",
    "log1p",
    "log10",
    "log2",
    "max",
    "min",
    "pow",
    "random",
    "round",
    "sign",
    "sin",
    "sinh",
    "sqrt",
    "tan",
    "tanh",
    "trunc",
])

const dateProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-properties-of-the-date-constructor
    "now",
    "parse",
    "prototype",
    "UTC",
])

const datePrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-properties-of-the-date-prototype-object
    "constructor",
    "getDate",
    "getDay",
    "getFullYear",
    "getHours",
    "getMilliseconds",
    "getMinutes",
    "getMonth",
    "getSeconds",
    "getTime",
    "getTimezoneOffset",
    "getUTCDate",
    "getUTCDay",
    "getUTCFullYear",
    "getUTCHours",
    "getUTCMilliseconds",
    "getUTCMinutes",
    "getUTCMonth",
    "getUTCSeconds",
    "setDate",
    "setFullYear",
    "setHours",
    "setMilliseconds",
    "setMinutes",
    "setMonth",
    "setSeconds",
    "setTime",
    "setUTCDate",
    "setUTCFullYear",
    "setUTCHours",
    "setUTCMilliseconds",
    "setUTCMinutes",
    "setUTCMonth",
    "setUTCSeconds",
    "toDateString",
    "toISOString",
    "toJSON",
    "toLocaleDateString",
    "toLocaleString",
    "toLocaleTimeString",
    "toString",
    "toTimeString",
    "toUTCString",
    "valueOf",
    // Symbol.toPrimitive

    // https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-additional-properties-of-the-date.prototype-object
    "getYear",
    "setYear",
    "toGMTString",
])

const stringProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/text-processing.html#sec-properties-of-the-string-constructor
    "fromCharCode",
    "fromCodePoint",
    "prototype",
    "raw",
])

const stringPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/text-processing.html#sec-properties-of-the-string-prototype-object
    "at",
    "charAt",
    "charCodeAt",
    "codePointAt",
    "concat",
    "constructor",
    "endsWith",
    "includes",
    "indexOf",
    "isWellFormed",
    "lastIndexOf",
    "localeCompare",
    "match",
    "matchAll",
    "normalize",
    "padEnd",
    "padStart",
    "repeat",
    "replace",
    "replaceAll",
    "search",
    "slice",
    "split",
    "startsWith",
    "substring",
    "toLocaleLowerCase",
    "toLocaleUpperCase",
    "toLowerCase",
    "toString",
    "toUpperCase",
    "toWellFormed",
    "trim",
    "trimEnd",
    "trimStart",
    "valueOf",
    // Symbol.iterator

    // https://tc39.es/ecma262/multipage/text-processing.html#sec-properties-of-string-instances
    "length",

    // https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-additional-properties-of-the-string.prototype-object
    "substr",
    "anchor",
    "big",
    "blink",
    "bold",
    "fixed",
    "fontcolor",
    "fontsize",
    "italics",
    "link",
    "small",
    "strike",
    "sub",
    "sup",
    "trimLeft",
    "trimRight",
])

const regexpProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/text-processing.html#sec-properties-of-the-regexp-constructor
    "prototype",
    // Symbol.species

    // https://github.com/tc39/proposal-regexp-legacy-features/
    "input",
    "$_",
    "lastMatch",
    "$&",
    "lastParen",
    "$+",
    "leftContext",
    "$`",
    "rightContext",
    "$'",
    "$1",
    "$2",
    "$3",
    "$4",
    "$5",
    "$6",
    "$7",
    "$8",
    "$9",
])

const regexpPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/text-processing.html#sec-properties-of-the-regexp-prototype-object
    "constructor",
    "exec",
    "dotAll",
    "flags",
    "global",
    "hasIndices",
    "ignoreCase",
    // Symbol.match
    // Symbol.matchAll
    "multiline",
    // Symbol.replace
    // Symbol.search
    "source",
    // Symbol.split
    "sticky",
    "test",
    "toString",
    "unicode",
    "unicodeSets",

    // https://tc39.es/ecma262/multipage/text-processing.html#sec-properties-of-regexp-instances
    "lastIndex",

    // https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-additional-properties-of-the-regexp.prototype-object
    "compile",
])

module.exports = {
    objectProperties,
    objectPrototypeProperties,
    functionProperties,
    functionPrototypeProperties,
    booleanProperties,
    booleanPrototypeProperties,
    symbolProperties,
    symbolPrototypeProperties,
    numberProperties,
    numberPrototypeProperties,
    bigintProperties,
    bigintPrototypeProperties,
    mathProperties,
    dateProperties,
    datePrototypeProperties,
    stringProperties,
    stringPrototypeProperties,
    regexpProperties,
    regexpPrototypeProperties,
}
