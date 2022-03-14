# es-x/no-labelled-function-declarations
> disallow labelled function declarations

This rule reports Annex B feature [the labelled function declarations](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-labelled-function-declarations) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" source-type="script" code="/*eslint es-x/no-labelled-function-declarations: error */
label: function f() {}
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-labelled-function-declarations.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-labelled-function-declarations.js)
