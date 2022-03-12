/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    overrides: [
        {
            files: ["**/test/**", "**/tests/**"],
            globals: {
                after: "readonly",
                afterEach: "readonly",
                before: "readonly",
                beforeEach: "readonly",
                describe: "readonly",
                it: "readonly",
                mocha: "readonly",
                xdescribe: "readonly",
                xit: "readonly",
            },
            rules: {
                "max-nested-callbacks": "off",
            },
        },
    ],
}
