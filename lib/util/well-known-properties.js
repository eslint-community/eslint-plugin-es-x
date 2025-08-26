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

const functionPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-function-prototype-object

    "apply",
    "bind",
    "call",
    "constructor",
    "toString",
    // [ %Symbol.hasInstance% ]

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function-instances
    "length",
    "name",
    "prototype",
])

const objectProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

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
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-function-constructor
    "prototype",
])

const booleanProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

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
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-symbol-constructor
    "asyncDispose",
    "asyncIterator",
    "dispose",
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
    // [ %Symbol.toPrimitive% ]
    // [ %Symbol.toStringTag% ]
])

const errorProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-error-constructor
    "prototype",
    "isError",
])

const errorPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-properties-of-the-error-prototype-object
    "constructor",
    "message",
    "name",
    "toString",
])

const numberProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

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
    ...functionPrototypeProperties,

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
    // [ %Symbol.toStringTag% ]

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
    "f16round",
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
    "sumPrecise",
    "tan",
    "tanh",
    "trunc",
])

const dateProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

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
    // [ %Symbol.toPrimitive% ]

    // https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-additional-properties-of-the-date.prototype-object
    "getYear",
    "setYear",
    "toGMTString",
])

const stringProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

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
    // [ %Symbol.iterator% ]

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
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/text-processing.html#sec-properties-of-the-regexp-constructor
    "escape",
    "prototype",
    // [ %Symbol.species% ]

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
    // [ %Symbol.match% ]
    // [ %Symbol.matchAll% ]
    "multiline",
    // [ %Symbol.replace% ]
    // [ %Symbol.search% ]
    "source",
    // [ %Symbol.split% ]
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

const arrayProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-constructor
    "from",
    "fromAsync",
    "isArray",
    "of",
    "prototype",
    // [ %Symbol.species% ]
])

const arrayPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-prototype-object
    "at",
    "concat",
    "constructor",
    "copyWithin",
    "entries",
    "every",
    "fill",
    "filter",
    "find",
    "findIndex",
    "findLast",
    "findLastIndex",
    "flat",
    "flatMap",
    "forEach",
    "includes",
    "indexOf",
    "join",
    "keys",
    "lastIndexOf",
    "map",
    "pop",
    "push",
    "reduce",
    "reduceRight",
    "reverse",
    "shift",
    "slice",
    "some",
    "sort",
    "splice",
    "toLocaleString",
    "toReversed",
    "toSorted",
    "toSpliced",
    "toString",
    "unshift",
    "values",
    "with",
    // [ %Symbol.iterator% ]
    // [ %Symbol.unscopables% ]

    // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-array-instances
    "length",

    // RegExp results
    // https://tc39.es/ecma262/multipage/text-processing.html#sec-regexpbuiltinexec
    "index",
    "input",
    "groups",
    "indices",
])

const typedArrayProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-%typedarray%-intrinsic-object
    "from",
    "of",
    "prototype",
    // [ %Symbol.species% ]

    // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-typedarray-constructors
    "BYTES_PER_ELEMENT",
    "prototype",
])

const typedArrayPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-%typedarrayprototype%-object
    "at",
    "buffer",
    "byteLength",
    "byteOffset",
    "constructor",
    "copyWithin",
    "entries",
    "every",
    "fill",
    "filter",
    "find",
    "findIndex",
    "findLast",
    "findLastIndex",
    "forEach",
    "includes",
    "indexOf",
    "join",
    "keys",
    "lastIndexOf",
    "length",
    "map",
    "reduce",
    "reduceRight",
    "reverse",
    "set",
    "slice",
    "some",
    "sort",
    "subarray",
    "toLocaleString",
    "toReversed",
    "toSorted",
    "toString",
    "values",
    "with",
    // [ %Symbol.iterator% ]
    // [ %Symbol.toStringTag% ]

    // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-typedarray-prototype-objects
    "BYTES_PER_ELEMENT",
    "constructor",
])

const uint8ArrayProperties = new Set([
    ...typedArrayProperties,

    "fromBase64",
    "fromHex",
])
const uint8ArrayPrototypeProperties = new Set([
    ...typedArrayPrototypeProperties,

    "setFromBase64",
    "setFromHex",
    "toBase64",
    "toHex",
])

const mapProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/keyed-collections.html#sec-properties-of-the-map-constructor
    "groupBy",
    "prototype",
    // [ %Symbol.species% ]
])

const mapPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/keyed-collections.html#sec-properties-of-the-map-prototype-object
    "clear",
    "constructor",
    "delete",
    "entries",
    "forEach",
    "get",
    "has",
    "keys",
    "set",
    "size",
    "values",
    // [ %Symbol.iterator% ]
    // [ %Symbol.toStringTag% ]
])

const setProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/keyed-collections.html#sec-properties-of-the-set-constructor
    "prototype",
    // [ %Symbol.species% ]
])

const setPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/keyed-collections.html#sec-properties-of-the-set-prototype-object
    "add",
    "clear",
    "constructor",
    "delete",
    "difference",
    "entries",
    "forEach",
    "has",
    "intersection",
    "isDisjointFrom",
    "isSubsetOf",
    "isSupersetOf",
    "keys",
    "size",
    "symmetricDifference",
    "union",
    "values",
    // [ %Symbol.iterator% ]
    // [ %Symbol.toStringTag% ]
])

const weakMapProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/keyed-collections.html#sec-properties-of-the-weakmap-constructor
    "prototype",
    // [ %Symbol.species% ]
])

const weakMapPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/keyed-collections.html#sec-properties-of-the-weakmap-prototype-object
    "constructor",
    "delete",
    "get",
    "has",
    "set",
    // [ %Symbol.toStringTag% ]
])

const weakSetProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/keyed-collections.html#sec-properties-of-the-weakset-constructor
    "prototype",
    // [ %Symbol.species% ]
])

const weakSetPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/keyed-collections.html#sec-properties-of-the-weakset-prototype-object
    "add",
    "constructor",
    "delete",
    "has",
    // [ %Symbol.toStringTag% ]
])

const arrayBufferProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/structured-data.html#sec-properties-of-the-arraybuffer-constructor
    "isView",
    "prototype",
    // [ %Symbol.species% ]
])

const arrayBufferPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/structured-data.html#sec-properties-of-the-arraybuffer-prototype-object
    "byteLength",
    "constructor",
    "detached",
    "maxByteLength",
    "resizable",
    "resize",
    "slice",
    "transfer",
    "transferToFixedLength",
    // [ %Symbol.toStringTag% ]
])

const sharedArrayBufferProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/structured-data.html#sec-properties-of-the-sharedarraybuffer-constructor
    "prototype",
    // [ %Symbol.species% ]
])

const sharedArrayBufferPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/structured-data.html#sec-properties-of-the-sharedarraybuffer-prototype-object
    "byteLength",
    "constructor",
    "grow",
    "growable",
    "maxByteLength",
    "slice",
    // [ %Symbol.toStringTag% ]
])

const dataViewProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/structured-data.html#sec-properties-of-the-dataview-constructor
    "prototype",
    // [ %Symbol.species% ]
])

const dataViewPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/structured-data.html#sec-properties-of-the-dataview-prototype-object
    "buffer",
    "byteLength",
    "byteOffset",
    "constructor",
    "getBigInt64",
    "getBigUint64",
    "getFloat16",
    "getFloat32",
    "getFloat64",
    "getInt8",
    "getInt16",
    "getInt32",
    "getUint8",
    "getUint16",
    "getUint32",
    "setBigInt64",
    "setBigUint64",
    "setFloat16",
    "setFloat32",
    "setFloat64",
    "setInt8",
    "setInt16",
    "setInt32",
    "setUint8",
    "setUint16",
    "setUint32",
    // [ %Symbol.toStringTag% ]
])

const atomicsProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/structured-data.html#sec-atomics-object
    "add",
    "and",
    "compareExchange",
    "exchange",
    "isLockFree",
    "load",
    "or",
    "store",
    "sub",
    "wait",
    "waitAsync",
    "notify",
    "xor",
    // [ %Symbol.toStringTag% ]
])

const jsonProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/structured-data.html#sec-json-object
    "parse",
    "stringify",
    // [ %Symbol.toStringTag% ]
])

const weakRefProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/managing-memory.html#sec-properties-of-the-weak-ref-constructor
    "prototype",
])

const weakRefPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/managing-memory.html#sec-properties-of-the-weak-ref-prototype-object
    "constructor",
    "deref",
    // [ %Symbol.toStringTag% ]
])

const finalizationRegistryProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/managing-memory.html#sec-properties-of-the-finalization-registry-constructor
    "prototype",
])

const finalizationRegistryPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/managing-memory.html#sec-properties-of-the-finalization-registry-prototype-object
    "constructor",
    "register",
    "unregister",
    // [ %Symbol.toStringTag% ]
])

const iteratorProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-the-iterator-constructor
    "from",
    "prototype",
])

const iteratorPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#table-iterator-interface-required-properties
    "next",

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#table-iterator-interface-optional-properties
    "return",
    "throw",

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-%iteratorhelperprototype%-object
    "next",
    "return",
    // [ %Symbol.toStringTag% ]

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-%iterator.prototype%-object
    "constructor",
    "drop",
    "every",
    "filter",
    "find",
    "flatMap",
    "forEach",
    "map",
    "reduce",
    "some",
    "take",
    "toArray",
    // [ %Symbol.iterator% ]
    // [ %Symbol.toStringTag% ]

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-asynciteratorprototype
    // [ %Symbol.asyncIterator%% ]
])

const disposableStackProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-the-disposablestack-constructor
    "prototype",
])

const disposableStackPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-the-disposablestack-prototype-object
    "adopt",
    "constructor",
    "defer",
    "dispose",
    "disposed",
    "move",
    "use",
    // [ %Symbol.dispose% ]
    // [ %Symbol.toStringTag% ]
])

const asyncDisposableStackProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-the-asyncdisposablestack-constructor
    "prototype",
])

const asyncDisposableStackPrototypeProperties = new Set([
    ...objectPrototypeProperties,
    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-the-asyncdisposablestack-prototype-object
    "adopt",
    "constructor",
    "defer",
    "disposeAsync",
    "disposed",
    "move",
    "use",
    // [ %Symbol.asyncDispose% ]
    // [ %Symbol.toStringTag% ]
])

const promiseProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-the-promise-constructor
    "all",
    "allSettled",
    "any",
    "prototype",
    "race",
    "reject",
    "resolve",
    "try",
    "withResolvers",
    // [ %Symbol.species% ]
])

const promisePrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-the-promise-prototype-object
    "catch",
    "constructor",
    "finally",
    "then",
    // [ %Symbol.toStringTag% ]
])

const reflectProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma262/multipage/reflection.html#sec-reflect-object
    "apply",
    "construct",
    "defineProperty",
    "deleteProperty",
    "get",
    "getOwnPropertyDescriptor",
    "getPrototypeOf",
    "has",
    "isExtensible",
    "ownKeys",
    "preventExtensions",
    "set",
    "setPrototypeOf",
    // [ %Symbol.toStringTag% ]
])

const proxyProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-objects
    "revocable",
])

const intlProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#intl-object
    // [ %Symbol.toStringTag% ]

    // https://tc39.es/ecma402/#sec-constructor-properties-of-the-intl-object
    "Collator",
    "DateTimeFormat",
    "DisplayNames",
    "DurationFormat",
    "ListFormat",
    "Locale",
    "NumberFormat",
    "PluralRules",
    "RelativeTimeFormat",
    "Segmenter",

    // https://tc39.es/ecma402/#sec-function-properties-of-the-intl-object
    "getCanonicalLocales",
    "supportedValuesOf",
])

const intlCollatorProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-the-intl-collator-constructor
    "prototype",
    "supportedLocalesOf",
    // [ %Symbol.toStringTag% ]
])

const intlCollatorPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-the-intl-collator-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "compare",
    "resolvedOptions",
])

const intlDateTimeFormatProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-datetimeformat-constructor
    "prototype",
    "supportedLocalesOf",
])

const intlDateTimeFormatPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-datetimeformat-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "format",
    "formatToParts",
    "formatRange",
    "formatRangeToParts",
    "resolvedOptions",
])

const intlDisplayNamesProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-displaynames-constructor
    "prototype",
    "supportedLocalesOf",
])

const intlDisplayNamesPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-displaynames-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "of",
    "resolvedOptions",
])

const intlDurationFormatProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-durationformat-constructor
    "prototype",
    "supportedLocalesOf",
])

const intlDurationFormatPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-durationformat-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "format",
    "formatToParts",
    "resolvedOptions",
])

const intlListFormatProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-listformat-constructor
    "prototype",
    "supportedLocalesOf",
])

const intlListFormatPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-listformat-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "format",
    "formatToParts",
    "resolvedOptions",
])

const intlLocaleProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-locale-constructor
    "prototype",
])

const intlLocalePrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-locale-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "maximize",
    "minimize",
    "toString",
    "baseName",
    "calendar",
    "caseFirst",
    "collation",
    "hourCycle",
    "numeric",
    "numberingSystem",
    "language",
    "script",
    "region",
])

const intlNumberFormatProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-numberformat-constructor
    "prototype",
    "supportedLocalesOf",
])

const intlNumberFormatPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-numberformat-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "format",
    "formatToParts",
    "formatRange",
    "formatRangeToParts",
    "resolvedOptions",
])

const intlPluralRulesProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-pluralrules-constructor
    "prototype",
    "supportedLocalesOf",
])

const intlPluralRulesPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-pluralrules-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "select",
    "selectRange",
    "resolvedOptions",
])

const intlRelativeTimeFormatProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-relativetimeformat-constructor
    "prototype",
    "supportedLocalesOf",
])

const intlRelativeTimeFormatPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-relativetimeformat-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "format",
    "formatToParts",
    "resolvedOptions",
])

const intlSegmenterProperties = new Set([
    ...objectPrototypeProperties,
    ...functionPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-segmenter-constructor
    "prototype",
    "supportedLocalesOf",
])

const intlSegmenterPrototypeProperties = new Set([
    ...objectPrototypeProperties,

    // https://tc39.es/ecma402/#sec-properties-of-intl-segmenter-prototype-object
    "constructor",
    // [ %Symbol.toStringTag% ]
    "segment",
    "resolvedOptions",
])

module.exports = {
    // ECMA 262 ECMAScript Language Specification
    objectProperties,
    objectPrototypeProperties,
    functionProperties,
    functionPrototypeProperties,
    booleanProperties,
    booleanPrototypeProperties,
    symbolProperties,
    symbolPrototypeProperties,
    errorProperties,
    errorPrototypeProperties,
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
    arrayProperties,
    arrayPrototypeProperties,
    typedArrayProperties,
    typedArrayPrototypeProperties,
    uint8ArrayProperties,
    uint8ArrayPrototypeProperties,
    mapProperties,
    mapPrototypeProperties,
    setProperties,
    setPrototypeProperties,
    weakMapProperties,
    weakMapPrototypeProperties,
    weakSetProperties,
    weakSetPrototypeProperties,
    arrayBufferProperties,
    arrayBufferPrototypeProperties,
    sharedArrayBufferProperties,
    sharedArrayBufferPrototypeProperties,
    dataViewProperties,
    dataViewPrototypeProperties,
    atomicsProperties,
    jsonProperties,
    weakRefProperties,
    weakRefPrototypeProperties,
    finalizationRegistryProperties,
    finalizationRegistryPrototypeProperties,
    iteratorProperties,
    iteratorPrototypeProperties,
    disposableStackProperties,
    disposableStackPrototypeProperties,
    asyncDisposableStackProperties,
    asyncDisposableStackPrototypeProperties,

    promiseProperties,
    promisePrototypeProperties,
    reflectProperties,
    proxyProperties,
    // ECMA 402 ECMAScript Internationalization API
    intlProperties,
    intlCollatorProperties,
    intlCollatorPrototypeProperties,
    intlDateTimeFormatProperties,
    intlDateTimeFormatPrototypeProperties,
    intlDisplayNamesProperties,
    intlDisplayNamesPrototypeProperties,
    intlDurationFormatProperties,
    intlDurationFormatPrototypeProperties,
    intlListFormatProperties,
    intlListFormatPrototypeProperties,
    intlLocaleProperties,
    intlLocalePrototypeProperties,
    intlNumberFormatProperties,
    intlNumberFormatPrototypeProperties,
    intlPluralRulesProperties,
    intlPluralRulesPrototypeProperties,
    intlRelativeTimeFormatProperties,
    intlRelativeTimeFormatPrototypeProperties,
    intlSegmenterProperties,
    intlSegmenterPrototypeProperties,
}
