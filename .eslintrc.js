"use strict"

module.exports = {
    extends: ["plugin:mysticatea/es2015", "plugin:mysticatea/+eslint-plugin"],
    overrides: [
        {
            files: ["scripts/*.js"],
            rules: {
                "require-jsdoc": "off",
            },
        },
    ],
}
