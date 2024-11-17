// @ts-check

"use strict"

/**
 * @typedef {import('./types').TypeName} TypeName
 * @typedef {import('./types').TypeInfo} TypeInfo
 * @typedef {import('./types').WellKnownGlobals} WellKnownGlobals
 * @typedef {import('./types').WellKnownPrototypes} WellKnownPrototypes
 */

/** @type {TypeInfo} */
const RETURN_STRING = {
    type: "Function",
    return: { type: "String" },
}
/** @type {TypeInfo} */
const RETURN_NUMBER = {
    type: "Function",
    return: { type: "Number" },
}
/** @type {TypeInfo} */
const RETURN_BOOLEAN = {
    type: "Function",
    return: { type: "Boolean" },
}

/** @type {WellKnownGlobals} */
const WELLKNOWN_GLOBALS = {
    String: {
        ...RETURN_STRING,
        /** @type {Record<import('./types').StringProperty,TypeInfo|undefined>} */
        properties: {
            fromCharCode: RETURN_STRING,
            fromCodePoint: RETURN_STRING,
            raw: RETURN_STRING,
        },
    },
    Number: {
        ...RETURN_NUMBER,
        /** @type {Record<import('./types').NumberProperty,TypeInfo|undefined>} */
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
    Boolean: {
        ...RETURN_BOOLEAN,
        /** @type {Record<import('./types').BooleanProperty,TypeInfo|undefined>} */
        properties: {},
    },
    Symbol: {
        type: "Function",
        return: { type: "Symbol" },
        /** @type {Record<import('./types').SymbolProperty,TypeInfo|undefined>} */
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
            dispose: { type: "Symbol" },
            asyncDispose: { type: "Symbol" },
            metadata: { type: "Symbol" },
        },
    },
    BigInt: {
        type: "Function",
        return: { type: "BigInt" },
        /** @type {Record<import('./types').BigIntProperty,TypeInfo|undefined>} */
        properties: {
            asIntN: { type: "Function", return: { type: "BigInt" } },
            asUintN: { type: "Function", return: { type: "BigInt" } },
        },
    },
    Object: {
        type: "Function",
        return: { type: "Object" },
        /** @type {Record<import('./types').ObjectProperty,TypeInfo|undefined>} */
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
            prototype: { type: "Object" },
        },
    },
    Function: {
        type: "Function",
        return: { type: "Function" },
        /** @type {Record<import('./types').FunctionProperty,TypeInfo|undefined>} */
        properties: {},
    },
    Array: {
        type: "Function",
        return: { type: "Array" },
        /** @type {Record<import('./types').ArrayProperty,TypeInfo|undefined>} */
        properties: {
            from: { type: "Function", return: { type: "Array" } },
            fromAsync: { type: "Function", return: { type: "Promise" } },
            isArray: RETURN_BOOLEAN,
            of: { type: "Function", return: { type: "Array" } },
        },
    },
    Map: {
        type: "Function",
        return: { type: "Map" },
        /** @type {Record<import('./types').MapProperty,TypeInfo|undefined>} */
        properties: {
            groupBy: { type: "Function", return: { type: "Map" } },
        },
    },
    Set: {
        type: "Function",
        return: { type: "Set" },
        /** @type {Record<import('./types').SetProperty,TypeInfo|undefined>} */
        properties: {},
    },
    RegExp: {
        type: "Function",
        return: { type: "RegExp" },
        /** @type {Record<import('./types').RegExpProperty,TypeInfo|undefined>} */
        properties: {
            "$&": { type: "String" },
            "$'": { type: "String" },
            "$`": { type: "String" },
            "$+": { type: "String" },
            $_: { type: "String" },
            $1: { type: "String" },
            $2: { type: "String" },
            $3: { type: "String" },
            $4: { type: "String" },
            $5: { type: "String" },
            $6: { type: "String" },
            $7: { type: "String" },
            $8: { type: "String" },
            $9: { type: "String" },
            input: { type: "String" },
            lastMatch: { type: "String" },
            lastParen: { type: "String" },
            leftContext: { type: "String" },
            rightContext: { type: "String" },
        },
    },
    Date: {
        type: "Function",
        return: { type: "Date" },
        /** @type {Record<import('./types').DateProperty,TypeInfo|undefined>} */
        properties: {
            now: { type: "Function", return: { type: "Number" } },
            parse: { type: "Function", return: { type: "Number" } },
            UTC: { type: "Function", return: { type: "Number" } },
        },
    },
    Promise: {
        type: "Function",
        return: { type: "Promise" },
        /** @type {Record<import('./types').PromiseProperty,TypeInfo|undefined>} */
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
    DataView: {
        type: "Function",
        return: { type: "DataView" },
        /** @type {Record<import('./types').DataViewProperty,TypeInfo|undefined>} */
        properties: {},
    },
    ArrayBuffer: {
        type: "Function",
        return: { type: "ArrayBuffer" },
        /** @type {Record<import('./types').ArrayBufferProperty,TypeInfo|undefined>} */
        properties: {
            isView: RETURN_BOOLEAN,
        },
    },
    SharedArrayBuffer: {
        type: "Function",
        return: { type: "SharedArrayBuffer" },
        /** @type {Record<import('./types').SharedArrayBufferProperty,TypeInfo|undefined>} */
        properties: {},
    },
    WeakMap: {
        type: "Function",
        return: { type: "WeakMap" },
        /** @type {Record<import('./types').WeakMapProperty,TypeInfo|undefined>} */
        properties: {},
    },
    WeakSet: {
        type: "Function",
        return: { type: "WeakSet" },
        /** @type {Record<import('./types').WeakSetProperty,TypeInfo|undefined>} */
        properties: {},
    },
    Intl: {
        type: "Object",
        /** @type {Record<import('./types').IntlProperty,TypeInfo|undefined>} */
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
            DisplayNames: {
                type: "Function",
                return: { type: "Intl.DisplayNames" },
            },
            Locale: {
                type: "Function",
                return: { type: "Intl.Locale" },
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
        /** @type {Record<import('./types').IteratorProperty,TypeInfo|undefined>} */
        properties: {
            from: { type: "Function", return: { type: "Iterator" } },
        },
    },
    WeakRef: {
        type: "Function",
        return: { type: "WeakRef" },
        /** @type {Record<import('./types').WeakRefProperty,TypeInfo|undefined>} */
        properties: {},
    },
    FinalizationRegistry: {
        type: "Function",
        return: { type: "FinalizationRegistry" },
        /** @type {Record<import('./types').FinalizationRegistryProperty,TypeInfo|undefined>} */
        properties: {},
    },
    undefined: { type: "undefined" },
    NaN: { type: "Number" },
    Infinity: { type: "Number" },
}

/** @type {Record<import('./types').ObjectPrototypeProperty, TypeInfo>} */
const OBJECT_PROTOTYPE = {
    constructor: { type: "Function" },
    toString: RETURN_STRING,
    toLocaleString: RETURN_STRING,
    valueOf: { type: "Function" },
    hasOwnProperty: RETURN_BOOLEAN,
    isPrototypeOf: RETURN_BOOLEAN,
    propertyIsEnumerable: RETURN_BOOLEAN,
}
/** @type {Record<import('./types').ArrayPrototypeProperty, TypeInfo>} */
const ARRAY_PROPERTIES = {
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
    // Properties
    length: { type: "Number" },
}
/** @type {Record<import('./types').RegExpArrayPrototypeProperty, TypeInfo>} */
const REGEXP_ARRAY_PROPERTIES = new Proxy(
    {
        ...ARRAY_PROPERTIES,
        index: { type: "Number" },
        input: { type: "String" },
        groups: { type: "Object" },
        indices: { type: "Array" },
        at: { type: "Function", return: { type: "String" } },
    },
    {
        get(target, propertyName) {
            if (isFinite(Number(propertyName))) {
                return { type: "String" }
            }
            const key =
                /** @type {Exclude<import('./types').RegExpArrayPrototypeProperty, number>} */ (
                    propertyName
                )
            return target[key]
        },
    },
)
const WELLKNOWN_PROTOTYPE = /** @type {WellKnownPrototypes} */ ({
    /** @type {Record<import('./types').StringPrototypeProperty, TypeInfo>} */
    String: {
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
        isWellFormed: RETURN_BOOLEAN,
        toWellFormed: RETURN_STRING,
        // Properties
        length: { type: "Number" },
    },
    /** @type {Record<import('./types').NumberPrototypeProperty, TypeInfo>} */
    Number: {
        toExponential: RETURN_STRING,
        toFixed: RETURN_STRING,
        toPrecision: RETURN_STRING,
        valueOf: RETURN_NUMBER,
    },
    /** @type {Record<import('./types').BooleanPrototypeProperty, TypeInfo>} */
    Boolean: {
        valueOf: { type: "Boolean" },
    },
    /** @type {Record<import('./types').SymbolPrototypeProperty, TypeInfo>} */
    Symbol: {
        description: { type: "String" },
        valueOf: { type: "Symbol" },
    },
    /** @type {Record<import('./types').BigIntPrototypeProperty, TypeInfo>} */
    BigInt: {
        valueOf: { type: "BigInt" },
    },
    /** @type {Record<import('./types').FunctionPrototypeProperty, TypeInfo>} */
    Function: {
        apply: { type: "Function" },
        bind: { type: "Function", return: { type: "Function" } },
        call: { type: "Function" },
        arguments: { type: "Object" },
        caller: { type: "Function" },
        length: { type: "Number" },
        name: { type: "String" },
        prototype: { type: "Object" },
    },
    /** @type {Record<import('./types').ArrayPrototypeProperty, TypeInfo>} */
    Array: ARRAY_PROPERTIES,
    /** @type {Record<import('./types').MapPrototypeProperty, TypeInfo>} */
    Map: {
        clear: { type: "Function" },
        delete: RETURN_BOOLEAN,
        entries: { type: "Function", return: { type: "Iterator" } },
        forEach: { type: "Function" },
        get: { type: "Function" },
        has: RETURN_BOOLEAN,
        keys: { type: "Function", return: { type: "Iterator" } },
        set: { type: "Function" },
        values: { type: "Function", return: { type: "Iterator" } },
        // Properties
        size: { type: "Number" },
    },
    /** @type {Record<import('./types').SetPrototypeProperty, TypeInfo>} */
    Set: {
        add: { type: "Function" },
        clear: { type: "Function" },
        delete: RETURN_BOOLEAN,
        difference: { type: "Function", return: { type: "Set" } },
        entries: { type: "Function", return: { type: "Iterator" } },
        forEach: { type: "Function" },
        has: RETURN_BOOLEAN,
        intersection: { type: "Function", return: { type: "Set" } },
        isDisjointFrom: RETURN_BOOLEAN,
        isSubsetOf: RETURN_BOOLEAN,
        isSupersetOf: RETURN_BOOLEAN,
        keys: { type: "Function", return: { type: "Iterator" } },
        symmetricDifference: { type: "Function", return: { type: "Set" } },
        union: { type: "Function", return: { type: "Set" } },
        values: { type: "Function", return: { type: "Iterator" } },
        // Properties
        size: { type: "Number" },
    },
    /** @type {Record<import('./types').RegExpPrototypeProperty, TypeInfo>} */
    RegExp: {
        compile: { type: "Function" },
        test: RETURN_BOOLEAN,
        exec: {
            type: "Function",
            return: { type: "Array", properties: REGEXP_ARRAY_PROPERTIES },
        },
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
    },
    /** @type {Record<import('./types').DatePrototypeProperty, TypeInfo>} */
    Date: {
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
        toLocaleTimeString: RETURN_STRING,
        toTimeString: RETURN_STRING,
        toUTCString: RETURN_STRING,
        valueOf: RETURN_NUMBER,
    },
    /** @type {Record<import('./types').PromisePrototypeProperty, TypeInfo>} */
    Promise: {
        catch: { type: "Function", return: { type: "Promise" } },
        finally: { type: "Function", return: { type: "Promise" } },
        then: { type: "Function", return: { type: "Promise" } },
    },
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
    /** @type {Record<import('./types').DataViewPrototypeProperty, TypeInfo>} */
    DataView: {
        getBigInt64: { type: "Function", return: { type: "BigInt" } },
        getBigUint64: { type: "Function", return: { type: "BigInt" } },
        getFloat32: { type: "Function", return: { type: "Number" } },
        getFloat64: { type: "Function", return: { type: "Number" } },
        getInt16: { type: "Function", return: { type: "Number" } },
        getInt32: { type: "Function", return: { type: "Number" } },
        getInt8: { type: "Function", return: { type: "Number" } },
        getUint16: { type: "Function", return: { type: "Number" } },
        getUint32: { type: "Function", return: { type: "Number" } },
        getUint8: { type: "Function", return: { type: "Number" } },
        setBigInt64: { type: "Function" },
        setBigUint64: { type: "Function" },
        setFloat32: { type: "Function" },
        setFloat64: { type: "Function" },
        setInt16: { type: "Function" },
        setInt32: { type: "Function" },
        setInt8: { type: "Function" },
        setUint16: { type: "Function" },
        setUint32: { type: "Function" },
        setUint8: { type: "Function" },
        // Properties
        byteLength: { type: "Number" },
        byteOffset: { type: "Number" },
        buffer: { type: "ArrayBuffer" },
    },
    /** @type {Record<import('./types').ArrayBufferPrototypeProperty, TypeInfo>} */
    ArrayBuffer: {
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
    },
    /** @type {Record<import('./types').SharedArrayBufferPrototypeProperty, TypeInfo>} */
    SharedArrayBuffer: {
        grow: { type: "Function" },
        slice: { type: "Function", return: { type: "SharedArrayBuffer" } },
        // Properties
        byteLength: { type: "Number" },
        growable: { type: "Boolean" },
        maxByteLength: { type: "Number" },
    },
    /** @type {Record<import('./types').WeakMapPrototypeProperty, TypeInfo>} */
    WeakMap: {
        delete: RETURN_BOOLEAN,
        get: { type: "Function" },
        has: RETURN_BOOLEAN,
        set: { type: "Function" },
    },
    /** @type {Record<import('./types').WeakSetPrototypeProperty, TypeInfo>} */
    WeakSet: {
        add: { type: "Function" },
        delete: RETURN_BOOLEAN,
        has: RETURN_BOOLEAN,
    },
    /** @type {Record<import('./types').IteratorPrototypeProperty, TypeInfo>} */
    Iterator: {
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
    },
    /** @type {Record<import('./types').WeakRefPrototypeProperty, TypeInfo>} */
    WeakRef: {
        deref: { type: "Function" },
    },
    /** @type {Record<import('./types').FinalizationRegistryPrototypeProperty, TypeInfo>} */
    FinalizationRegistry: {
        register: { type: "Function" },
        unregister: RETURN_BOOLEAN,
    },
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
    return (
        OBJECT_PROTOTYPE[
            /** @type {import('./types').ObjectPrototypeProperty} */ (
                propertyName
            )
        ] ?? null
    )
}

module.exports = { WELLKNOWN_GLOBALS, getPropertyType }

/**
 * @param {TypeName} type
 * @returns {TypeInfo}
 */
function buildGlobalTypedArrayTypeInfo(type) {
    return {
        type: "Function",
        return: { type },
        /** @type {Record<import('./types').TypedArrayProperty,TypeInfo|undefined>} */
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
            from: { type: "Function", return: { type } },
            of: { type: "Function", return: { type } },
        },
    }
}

/**
 * @param {TypeName} type
 * @returns {Record<import('./types').TypedArrayPrototypeProperty, TypeInfo>}
 */
function buildTypedArrayPrototypeTypeInfo(type) {
    return {
        at: { type: "Function" },
        copyWithin: { type: "Function", return: { type } },
        entries: { type: "Function", return: { type: "Iterator" } },
        every: RETURN_BOOLEAN,
        fill: { type: "Function", return: { type } },
        filter: { type: "Function", return: { type } },
        find: { type: "Function" },
        findIndex: RETURN_NUMBER,
        findLast: { type: "Function" },
        findLastIndex: RETURN_NUMBER,
        forEach: { type: "Function" },
        includes: RETURN_BOOLEAN,
        indexOf: RETURN_NUMBER,
        join: RETURN_STRING,
        keys: { type: "Function", return: { type: "Iterator" } },
        lastIndexOf: RETURN_NUMBER,
        map: { type: "Function", return: { type } },
        reduce: { type: "Function" },
        reduceRight: { type: "Function" },
        reverse: { type: "Function", return: { type } },
        slice: { type: "Function", return: { type } },
        some: RETURN_BOOLEAN,
        sort: { type: "Function", return: { type } },
        toReversed: { type: "Function", return: { type } },
        toSorted: { type: "Function", return: { type } },
        values: { type: "Function", return: { type: "Iterator" } },
        with: { type: "Function", return: { type } },
        set: { type: "Function" },
        subarray: { type: "Function", return: { type } },
        valueOf: { type: "Function" },
        // Properties
        length: { type: "Number" },
        buffer: { type: "ArrayBuffer" },
        byteLength: { type: "Number" },
        byteOffset: { type: "Number" },
    }
}
