"use strict"

module.exports = {
    overrides: [
        {
            files: ["enhanceApp.mjs"],
            parserOptions: {
                sourceType: "module",
            },
            globals: {
                window: false,
            },
        },
    ],
}
