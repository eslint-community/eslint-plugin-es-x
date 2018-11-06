# disallow rest parameters (es/no-rest-parameters)

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

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/lib/rules/no-rest-parameters.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/tests/lib/rules/no-rest-parameters.js)
