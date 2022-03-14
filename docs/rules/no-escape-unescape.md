# es-x/no-escape-unescape
> disallow `escape` and `unescape`

This rule reports Annex B feature `escape` and `unescape` as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-escape-unescape: error */
escape('%&')
unescape('%25%26')
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-escape-unescape.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-escape-unescape.js)
