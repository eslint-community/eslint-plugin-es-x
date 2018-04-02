# disallow rest/spread properties (es/no-rest-spread-properties)

This rule reports ES2018 [rest/spread properties](https://github.com/tc39/proposal-object-rest-spread#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let obj = {...obj0}
let {a, ...rest} = obj
;({a, ...rest} = obj)
function f({a, ...rest}) {}
```
