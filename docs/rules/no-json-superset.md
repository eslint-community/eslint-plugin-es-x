# disallow `\u2028` and `\u2029` in string literals (es/no-json-superset)

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2019 `\u2028` and `\u2029` in string literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-json-superset: error */
const u2028 = &quot;&#x2028;&quot; // a \u2028 is in this string
const u2029 = &quot;&#x2029;&quot; // a \u2029 is in this string
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/lib/rules/no-json-superset.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/tests/lib/rules/no-json-superset.js)
