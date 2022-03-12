/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    overrides: [
        {
            files: ["*.vue"],
            extends: [
                require.resolve("./+browser.js"),
                require.resolve("./+modules.js"),
            ],
            parser: require.resolve("vue-eslint-parser"),
            rules: {
                // Enabled rules
                "@mysticatea/vue/array-bracket-spacing": ["error", "never"],
                "@mysticatea/vue/arrow-spacing": "error",
                "@mysticatea/vue/block-spacing": "error",
                "@mysticatea/vue/brace-style": "error",
                "@mysticatea/vue/camelcase": "error",
                "@mysticatea/vue/comma-dangle": [
                    "error",
                    {
                        arrays: "always",
                        objects: "always",
                        imports: "always",
                        exports: "always",
                        functions: "always",
                    },
                ],
                "@mysticatea/vue/comment-directive": "error",
                "@mysticatea/vue/dot-location": "error",
                "@mysticatea/vue/eqeqeq": [
                    "error",
                    "always",
                    { null: "ignore" },
                ],
                "@mysticatea/vue/jsx-uses-vars": "error",
                "@mysticatea/vue/key-spacing": "error",
                "@mysticatea/vue/keyword-spacing": "error",
                "@mysticatea/vue/match-component-file-name": "error",
                "@mysticatea/vue/max-attributes-per-line": [
                    "error",
                    {
                        singleline: 3,
                        multiline: {
                            max: 1,
                            allowFirstLine: false,
                        },
                    },
                ],
                "@mysticatea/vue/no-async-in-computed-properties": "error",
                "@mysticatea/vue/no-boolean-default": "error",
                "@mysticatea/vue/no-deprecated-scope-attribute": "error",
                "@mysticatea/vue/no-dupe-keys": "error",
                "@mysticatea/vue/no-duplicate-attributes": "error",
                "@mysticatea/vue/no-empty-pattern": "error",
                "@mysticatea/vue/no-parsing-error": "error",
                "@mysticatea/vue/no-reserved-keys": "error",
                "@mysticatea/vue/no-shared-component-data": "error",
                "@mysticatea/vue/no-side-effects-in-computed-properties":
                    "error",
                "@mysticatea/vue/no-template-key": "error",
                "@mysticatea/vue/no-textarea-mustache": "error",
                "@mysticatea/vue/no-unused-vars": "error",
                "@mysticatea/vue/object-curly-spacing": ["error", "always"],
                "@mysticatea/vue/require-component-is": "error",
                "@mysticatea/vue/require-direct-export": "error",
                "@mysticatea/vue/require-render-return": "error",
                "@mysticatea/vue/require-v-for-key": "error",
                "@mysticatea/vue/require-valid-default-prop": "error",
                "@mysticatea/vue/return-in-computed-property": "error",
                "@mysticatea/vue/space-infix-ops": "error",
                "@mysticatea/vue/space-unary-ops": "error",
                "@mysticatea/vue/v-on-function-call": "error",
                "@mysticatea/vue/v-slot-style": "error",
                "@mysticatea/vue/valid-template-root": "error",
                "@mysticatea/vue/valid-v-bind": "error",
                "@mysticatea/vue/valid-v-cloak": "error",
                "@mysticatea/vue/valid-v-else-if": "error",
                "@mysticatea/vue/valid-v-else": "error",
                "@mysticatea/vue/valid-v-for": "error",
                "@mysticatea/vue/valid-v-html": "error",
                "@mysticatea/vue/valid-v-if": "error",
                "@mysticatea/vue/valid-v-model": "error",
                "@mysticatea/vue/valid-v-on": "error",
                "@mysticatea/vue/valid-v-once": "error",
                "@mysticatea/vue/valid-v-pre": "error",
                "@mysticatea/vue/valid-v-show": "error",
                "@mysticatea/vue/valid-v-slot": "error",
                "@mysticatea/vue/valid-v-text": "error",
                "@mysticatea/vue/attribute-hyphenation": "error",
                "@mysticatea/vue/html-end-tags": "error",
                "@mysticatea/vue/html-indent": ["error", 4],
                "@mysticatea/vue/html-self-closing": "error",
                "@mysticatea/vue/mustache-interpolation-spacing": "error",
                "@mysticatea/vue/name-property-casing": "error",
                "@mysticatea/vue/no-multi-spaces": "error",
                "@mysticatea/vue/require-default-prop": "error",
                "@mysticatea/vue/require-prop-types": "error",
                "@mysticatea/vue/v-bind-style": "error",
                "@mysticatea/vue/v-on-style": "error",
                "@mysticatea/vue/attributes-order": "error",
                "@mysticatea/vue/html-quotes": "error",
                "@mysticatea/vue/order-in-components": "error",
                "@mysticatea/vue/this-in-template": "error",
                "@mysticatea/vue/html-closing-bracket-newline": [
                    "error",
                    {
                        singleline: "never",
                        multiline: "always",
                    },
                ],
                "@mysticatea/vue/html-closing-bracket-spacing": "error",
                "@mysticatea/vue/prop-name-casing": "error",
                "@mysticatea/vue/component-name-in-template-casing": [
                    "error",
                    "kebab-case",
                ],
                "@mysticatea/vue/multiline-html-element-content-newline":
                    "error",
                "@mysticatea/vue/singleline-html-element-content-newline":
                    "error",
                "@mysticatea/vue/no-spaces-around-equal-signs-in-attribute":
                    "error",
                "@mysticatea/vue/no-template-shadow": "error",
                "@mysticatea/vue/no-unused-components": "error",
                "@mysticatea/vue/no-use-v-if-with-v-for": "error",
                "@mysticatea/vue/no-v-html": "error",
                "@mysticatea/vue/require-prop-type-constructor": "error",
                "@mysticatea/vue/use-v-on-exact": "error",

                // Disabled rules (prefer prettier)
                "@mysticatea/vue/no-restricted-syntax": "off",
                "@mysticatea/vue/script-indent": "off",
            },
        },
    ],
}
