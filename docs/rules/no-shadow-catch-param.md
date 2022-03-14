# es-x/no-shadow-catch-param
> disallow identifiers from shadowing catch parameter names

This rule reports identifiers from shadowing catch parameter names as errors.

See [Annex B - VariableStatements in Catch Blocks](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-variablestatements-in-catch-blocks).

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-shadow-catch-param: error */
try {
} catch (e) {
    var e
}
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-shadow-catch-param.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-shadow-catch-param.js)
