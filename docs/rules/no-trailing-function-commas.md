# disallow trailing commas in parameter/argument lists (es/no-trailing-function-commas)

This rule reports ES2017 [trailing commas in parameter/argument lists](https://github.com/tc39/proposal-trailing-function-commas#readme) as errors.

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

## 📚 References

- [Rule source](../../lib/rules/no-trailing-function-commas.js)
- [Test source](../../tests/lib/rules/no-trailing-function-commas.js)
