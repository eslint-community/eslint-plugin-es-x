"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-hashbang.js")

if (!RuleTester.isSupported(2023)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-hashbang.")
    return
}

new RuleTester().run("no-hashbang", rule, {
    valid: [
        "/* comment */",
        "/** comment */",
        "// comment",
        `call() /** comment */
        // comment
        `,
    ],
    invalid: [
        {
            code: `#!/usr/bin/env node
            // in the Script Goal
            'use strict';
            console.log(1);
            `,
            errors: ["ES2023 Hashbang comments are forbidden."],
        },
        {
            code: `#!/usr/bin/env node
            // in the Module Goal
            export {};
            console.log(1);
            `,
            parserOptions: { sourceType: "module" },
            errors: ["ES2023 Hashbang comments are forbidden."],
        },
    ],
})
