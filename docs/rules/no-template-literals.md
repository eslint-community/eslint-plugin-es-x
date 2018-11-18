# disallow template literals (es/no-template-literals)

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 template literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-template-literals: error */
const a1 = `foo`
const a2 = `foo${bar}baz`
const a3 = tag`foo`
" />

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es/no-template-literals: error */
const a1 = &quot;foo&quot;
const a2 = &quot;foo&quot;+bar+&quot;baz&quot;
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/lib/rules/no-template-literals.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/tests/lib/rules/no-template-literals.js)
