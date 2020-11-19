# es/no-async-functions
> disallow async function declarations

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2017`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, and `plugin:es/restrict-to-es2016`

This rule reports ES2017 [async functions](https://github.com/tc39/ecmascript-asyncawait) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-async-functions: error */
async function f1() {}
let f2 = async function() {}
let f3 = async () =&gt; {}
let obj = { async f4() {} }
class A { async f5() {} }
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-async-functions.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-async-functions.js)
