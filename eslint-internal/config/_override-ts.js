/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            extends: [require.resolve("./+modules.js")],
            parser: require.resolve("@typescript-eslint/parser"),
            parserOptions: {
                loggerFn: false,
                project: "tsconfig.json",
            },
            rules: {
                // Enabled rules
                "@mysticatea/ts/adjacent-overload-signatures": "error",
                "@mysticatea/ts/array-type": "error",
                "@mysticatea/ts/await-thenable": "error",
                "@mysticatea/ts/ban-ts-ignore": "error",
                "@mysticatea/ts/class-name-casing": "error",
                "@mysticatea/ts/consistent-type-assertions": "error",
                "@mysticatea/ts/explicit-member-accessibility": "error",
                "@mysticatea/ts/interface-name-prefix": "error",
                "@mysticatea/ts/member-naming": "error",
                "@mysticatea/ts/no-array-constructor": "error",
                "@mysticatea/ts/no-empty-interface": "error",
                "@mysticatea/ts/no-extraneous-class": "error",
                "@mysticatea/ts/no-floating-promises": "error",
                "@mysticatea/ts/no-for-in-array": "error",
                "@mysticatea/ts/no-inferrable-types": "error",
                "@mysticatea/ts/no-misused-new": "error",
                "@mysticatea/ts/no-misused-promises": "error",
                "@mysticatea/ts/no-parameter-properties": "error",
                "@mysticatea/ts/no-require-imports": "error",
                "@mysticatea/ts/no-this-alias": [
                    "error",
                    { allowDestructuring: true },
                ],
                "@mysticatea/ts/no-unnecessary-qualifier": "error",
                "@mysticatea/ts/no-unnecessary-type-arguments": "error",
                "@mysticatea/ts/no-unnecessary-type-assertion": "error",
                "@mysticatea/ts/no-var-requires": "error",
                // https://github.com/typescript-eslint/typescript-eslint/issues/454
                "@mysticatea/ts/prefer-function-type": "off",
                "@mysticatea/ts/prefer-includes": "error",
                "@mysticatea/ts/prefer-namespace-keyword": "error",
                // https://github.com/typescript-eslint/typescript-eslint/issues/946
                "@mysticatea/ts/prefer-readonly": "off",
                "@mysticatea/ts/prefer-regexp-exec": "error",
                "@mysticatea/ts/prefer-string-starts-ends-with": "error",
                "@mysticatea/ts/restrict-plus-operands": "error",
                "@mysticatea/ts/require-array-sort-compare": "error",
                "@mysticatea/ts/triple-slash-reference": "error",
                // なんか誤検知が多い...
                "@mysticatea/ts/unbound-method": [
                    "off",
                    { ignoreStatic: true },
                ],
                // https://github.com/typescript-eslint/typescript-eslint/issues/452
                "@mysticatea/ts/unified-signatures": "off",
                "prettier/prettier": [
                    "error",
                    {
                        tabWidth: 4,
                        semi: false,
                        trailingComma: "all",
                        parser: "typescript",
                    },
                    {
                        usePrettierrc: false,
                    },
                ],

                // Replacements
                camelcase: "off",
                "@mysticatea/ts/camelcase": "error",
                "no-empty-function": "off",
                "@mysticatea/ts/no-empty-function": "error",
                "no-useless-constructor": "off",
                "@mysticatea/ts/no-useless-constructor": "error",
                "require-await": "off",
                "@mysticatea/ts/require-await": "error",

                // Disabled rules
                "func-style": "off",
                "init-declarations": "off",
                "lines-between-class-members": "off",
                "no-dupe-class-members": "off",
                "no-invalid-this": "off",
                "no-loop-func": "off",
                "no-redeclare": "off",
                "no-undef": "off",
                "no-unused-vars": "off",
                "no-use-before-define": "off",
                "one-var": "off",
                "@mysticatea/ts/ban-types": "off",
                "@mysticatea/ts/brace-style": "off", // favor of Prettier.
                "@mysticatea/ts/consistent-type-definitions": "off",
                "@mysticatea/ts/explicit-function-return-type": "off", // I want but this is not so...
                "@mysticatea/ts/func-call-spacing": "off", // favor of Prettier.
                "@mysticatea/ts/generic-type-naming": "off",
                "@mysticatea/ts/indent": "off", // favor of Prettier.
                "@mysticatea/ts/member-delimiter-style": "off", // favor of Prettier.
                "@mysticatea/ts/member-ordering": "off",
                "@mysticatea/ts/no-explicit-any": "off",
                "@mysticatea/ts/no-extra-parens": "off", // favor of Prettier.
                "@mysticatea/ts/no-magic-numbers": "off",
                "@mysticatea/ts/no-namespace": "off", // I like the namespace for interfaces (type only things).
                "@mysticatea/ts/no-non-null-assertion": "off",
                "@mysticatea/ts/no-type-alias": "off",
                "@mysticatea/ts/no-unnecessary-condition": "off", // This was problematic for test code.
                "@mysticatea/ts/no-unused-vars": "off", // tsc verifies it.
                "@mysticatea/ts/no-use-before-define": "off", // tsc verifies it.
                "@mysticatea/ts/prefer-for-of": "off",
                "@mysticatea/ts/promise-function-async": "off",
                "@mysticatea/ts/quotes": "off", // favor of Prettier.
                "@mysticatea/ts/semi": "off", // favor of Prettier.
                "@mysticatea/ts/strict-boolean-expressions": "off",
                "@mysticatea/ts/type-annotation-spacing": "off", // favor of Prettier.
                "@mysticatea/ts/typedef": "off",
            },
        },
        {
            files: ["*.d.ts"],
            rules: {
                strict: "off",
            },
        },
    ],
}
