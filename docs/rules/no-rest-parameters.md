# es/no-rest-parameters
> disallow rest parameters

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2015`, `plugin:es/restrict-to-es3`, and `plugin:es/restrict-to-es5`

This rule reports ES2015 rest parameters as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-rest-parameters: error */
function f1(...args) {}
let f2 = function(...args) {}
let f3 = (...args) =&gt; {}
let obj = { f4(...args) {} }
class A { f5(...args) {} }
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-rest-parameters.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-rest-parameters.js)
