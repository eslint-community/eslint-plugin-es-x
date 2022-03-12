# es-x/no-async-functions
> disallow async function declarations

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2017`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, and `plugin:es-x/restrict-to-es2016`

This rule reports ES2017 [async functions](https://github.com/tc39/ecmascript-asyncawait) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-async-functions: error */
async function f1() {}
let f2 = async function() {}
let f3 = async () =&gt; {}
let obj = { async f4() {} }
class A { async f5() {} }
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-async-functions.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-async-functions.js)
