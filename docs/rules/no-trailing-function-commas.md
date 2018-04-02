# disallow trailing function commas (es/no-trailing-function-commas)

This rule reports ES2017 [trailing function commas](https://github.com/tc39/proposal-trailing-function-commas#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
async function f1(a,) {}
let f2 = async function(a,) {}
let f3 = async (a,) => {}
let obj = { async f4(a,) {} }
class A { async f5(a,) {} }

foo(a,)
new F(a,)
```
