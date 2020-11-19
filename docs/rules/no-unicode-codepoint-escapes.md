# es/no-unicode-codepoint-escapes
> disallow Unicode code point escape sequences

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2015`, `plugin:es/restrict-to-es3`, and `plugin:es/restrict-to-es5`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 Unicode code point escape sequences as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-unicode-codepoint-escapes: error */
const a\u{31} = `foo`
const a2 = &quot;a\u{62}b&quot;
" />

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es/no-unicode-codepoint-escapes: error */
const a\u0031 = `foo`
const a2 = &quot;a\u0062b&quot;
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-unicode-codepoint-escapes.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-unicode-codepoint-escapes.js)
