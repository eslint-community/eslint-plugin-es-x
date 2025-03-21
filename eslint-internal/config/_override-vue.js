/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const files = ["**/*.vue", "*.vue"]

module.exports = [
    ...require("./+browser.js").map((config) => ({ ...config, files })),
    ...require("./+modules.js").map((config) => ({ ...config, files })),
    {
        name: "eslint-internal/config/_override-vue.js",
        files,
        plugins: {
            get vue() {
                return require("eslint-plugin-vue")
            },
        },
        processor: "vue/vue",
        languageOptions: {
            sourceType: "module",
            get parser() {
                return require("vue-eslint-parser")
            },
        },
        rules: {
            // Enabled rules
            "vue/array-bracket-spacing": ["error", "never"],
            "vue/arrow-spacing": "error",
            "vue/block-spacing": "error",
            "vue/brace-style": "error",
            "vue/camelcase": "error",
            "vue/comma-dangle": [
                "error",
                {
                    arrays: "always",
                    objects: "always",
                    imports: "always",
                    exports: "always",
                    functions: "always",
                },
            ],
            "vue/comment-directive": "error",
            "vue/dot-location": "error",
            "vue/eqeqeq": ["error", "always", { null: "ignore" }],
            "vue/jsx-uses-vars": "error",
            "vue/key-spacing": "error",
            "vue/keyword-spacing": "error",
            "vue/match-component-file-name": "error",
            "vue/first-attribute-linebreak": ["error"],
            "vue/max-attributes-per-line": [
                "error",
                {
                    singleline: 3,
                    multiline: {
                        max: 1,
                    },
                },
            ],
            "vue/no-async-in-computed-properties": "error",
            "vue/no-boolean-default": "error",
            "vue/no-deprecated-scope-attribute": "error",
            "vue/no-dupe-keys": "error",
            "vue/no-duplicate-attributes": "error",
            "vue/no-empty-pattern": "error",
            "vue/no-parsing-error": "error",
            "vue/no-reserved-keys": "error",
            "vue/no-shared-component-data": "error",
            "vue/no-side-effects-in-computed-properties": "error",
            "vue/no-template-key": "error",
            "vue/no-textarea-mustache": "error",
            "vue/no-unused-vars": "error",
            "vue/object-curly-spacing": ["error", "always"],
            "vue/require-component-is": "error",
            "vue/require-direct-export": "error",
            "vue/require-render-return": "error",
            "vue/require-v-for-key": "error",
            "vue/require-valid-default-prop": "error",
            "vue/return-in-computed-property": "error",
            "vue/space-infix-ops": "error",
            "vue/space-unary-ops": "error",
            "vue/v-on-handler-style": "error",
            "vue/v-slot-style": "error",
            "vue/valid-template-root": "error",
            "vue/valid-v-bind": "error",
            "vue/valid-v-cloak": "error",
            "vue/valid-v-else-if": "error",
            "vue/valid-v-else": "error",
            "vue/valid-v-for": "error",
            "vue/valid-v-html": "error",
            "vue/valid-v-if": "error",
            "vue/valid-v-model": "error",
            "vue/valid-v-on": "error",
            "vue/valid-v-once": "error",
            "vue/valid-v-pre": "error",
            "vue/valid-v-show": "error",
            "vue/valid-v-slot": "error",
            "vue/valid-v-text": "error",
            "vue/attribute-hyphenation": "error",
            "vue/html-end-tags": "error",
            "vue/html-indent": ["error", 4],
            "vue/html-self-closing": "error",
            "vue/mustache-interpolation-spacing": "error",
            "vue/component-definition-name-casing": "error",
            "vue/no-multi-spaces": "error",
            "vue/require-default-prop": "error",
            "vue/require-prop-types": "error",
            "vue/v-bind-style": "error",
            "vue/v-on-style": "error",
            "vue/attributes-order": "error",
            "vue/html-quotes": "error",
            "vue/order-in-components": "error",
            "vue/this-in-template": "error",
            "vue/html-closing-bracket-newline": [
                "error",
                {
                    singleline: "never",
                    multiline: "always",
                },
            ],
            "vue/html-closing-bracket-spacing": "error",
            "vue/prop-name-casing": "error",
            "vue/component-name-in-template-casing": ["error", "kebab-case"],
            "vue/multiline-html-element-content-newline": "error",
            "vue/singleline-html-element-content-newline": "error",
            "vue/no-spaces-around-equal-signs-in-attribute": "error",
            "vue/no-template-shadow": "error",
            "vue/no-unused-components": "error",
            "vue/no-use-v-if-with-v-for": "error",
            "vue/no-v-html": "error",
            "vue/require-prop-type-constructor": "error",
            "vue/use-v-on-exact": "error",

            // Disabled rules (prefer prettier)
            "vue/no-restricted-syntax": "off",
            "vue/script-indent": "off",
        },
    },
]
