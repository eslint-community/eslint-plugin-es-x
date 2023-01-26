"use strict"

module.exports = {
    rules: {
        "node/no-missing-import": "off",
        "node/no-extraneous-import": "off",
        "node/file-extension-in-import": "off",
        "node/no-extraneous-require": "off",
    },
    globals: {
        window: "readonly",
        document: "readonly",
    },
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                "vue/multiline-html-element-content-newline": "off",
                "vue/singleline-html-element-content-newline": "off",
                "vue/name-property-casing": "off",
                "vue/html-self-closing": "off",
                "vue/comma-dangle": "off",
            },
        },
    ],
}
