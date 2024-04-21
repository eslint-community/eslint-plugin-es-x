/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = [
    {
        name: "eslint-internal/config/_override-2015.js",
        languageOptions: {
            ecmaVersion: 2015,
            globals: {
                ArrayBuffer: "readonly",
                DataView: "readonly",
                Float32Array: "readonly",
                Float64Array: "readonly",
                Int16Array: "readonly",
                Int32Array: "readonly",
                Int8Array: "readonly",
                Map: "readonly",
                Promise: "readonly",
                Proxy: "readonly",
                Reflect: "readonly",
                Set: "readonly",
                Symbol: "readonly",
                Uint16Array: "readonly",
                Uint32Array: "readonly",
                Uint8Array: "readonly",
                Uint8ClampedArray: "readonly",
                WeakMap: "readonly",
                WeakSet: "readonly",
            },
        },
        rules: {
            // Enabled rules as errors
            "arrow-body-style": "error",
            "constructor-super": "error",
            "default-param-last": "error",
            "no-class-assign": "error",
            "no-const-assign": "error",
            "no-dupe-class-members": "error",
            "no-duplicate-imports": ["error", { includeExports: true }],
            "no-import-assign": "error",
            "no-new-symbol": "error",
            "no-template-curly-in-string": "error",
            "no-this-before-super": "error",
            "no-useless-computed-key": "error",
            "no-useless-constructor": "error",
            "no-useless-rename": "error",
            "no-var": "error",
            "object-shorthand": [
                "error",
                "always",
                { avoidExplicitReturnArrows: true },
            ],
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "prefer-numeric-literals": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",
            "prefer-template": "error",
            "require-unicode-regexp": "error",
            "require-yield": "error",
            "symbol-description": "error",

            // Enabled rules as warnings
            "class-methods-use-this": "warn",

            // Disabled rules as favor of Prettier.
            "arrow-parens": "off",
            "arrow-spacing": "off",
            "generator-star-spacing": "off",
            "no-confusing-arrow": "off",
            "rest-spread-spacing": "off",
            "template-curly-spacing": "off",
            "yield-star-spacing": "off",

            // Desabled rules
            "no-inner-declarations": "off",
            "no-restricted-imports": "off",
            "prefer-destructuring": "off",
            "sort-imports": "off",

            //
            // Plugins
            //
            "my/my-no-this-in-static": "error",
            "my/my-no-useless-rest-spread": "error",
            "my/my-prefer-for-of": "error",
        },
    },
]
