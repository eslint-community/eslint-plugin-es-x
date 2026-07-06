import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-hashbang.ts"

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
            errors: ["ES2023 Hashbang comments are forbidden."],
            languageOptions: { sourceType: "module" },
        },
    ],
})
