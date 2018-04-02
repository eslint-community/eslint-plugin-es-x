# disallow rest parameters (es/no-rest-parameters)

This rule reports ES2015 rest parameters as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
function f1(...args) {}
let f2 = function(...args) {}
let f3 = (...args) => {}
let obj = { f4(...args) {} }
class A { f5(...args) {} }
```
