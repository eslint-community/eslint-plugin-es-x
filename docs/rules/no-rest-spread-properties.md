# es/no-rest-spread-properties
> disallow rest/spread properties

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2018`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, and `plugin:es/restrict-to-es2017`

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

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-rest-spread-properties.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-rest-spread-properties.js)
