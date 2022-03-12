# es-x/no-string-fromcodepoint
> disallow the `String.fromCodePoint` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 `String.fromCodePoint` as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-string-fromcodepoint: error */
const thumbUp = String.fromCodePoint(0x1F44D)
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/lib/rules/no-string-fromcodepoint.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/tests/lib/rules/no-string-fromcodepoint.js)
