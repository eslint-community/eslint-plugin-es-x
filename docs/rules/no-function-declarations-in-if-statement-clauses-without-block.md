# es-x/no-function-declarations-in-if-statement-clauses-without-block
> disallow function declarations in if statement clauses without using blocks

This rule reports Annex B feature [the function declarations in if statement clauses without using blocks](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-functiondeclarations-in-ifstatement-statement-clauses) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" source-type="script" code="/*eslint es-x/no-function-declarations-in-if-statement-clauses-without-block: error */
if (a)
  function f1() {}
else
  function f2() {}
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-function-declarations-in-if-statement-clauses-without-block.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-function-declarations-in-if-statement-clauses-without-block.js)
