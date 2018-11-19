# disallow rest/spread properties (es/no-rest-spread-properties)

This rule reports ES2018 [rest/spread properties](https://github.com/tc39/proposal-object-rest-spread#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-rest-spread-properties: error */
let obj = {...obj0}
let {a, ...rest} = obj
;({a, ...rest} = obj)
function f({a, ...rest}) {}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.0/lib/rules/no-rest-spread-properties.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.0/tests/lib/rules/no-rest-spread-properties.js)
