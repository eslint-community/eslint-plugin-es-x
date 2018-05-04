# disallow async function declarations (es/no-async-functions)

This rule reports ES2017 [async functions](https://github.com/tc39/ecmascript-asyncawait) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
async function f1() {}
let f2 = async function() {}
let f3 = async () => {}
let obj = { async f4() {} }
class A { async f5() {} }
```

## 📚 References

- [Rule source](../../lib/rules/no-async-functions.js)
- [Test source](../../tests/lib/rules/no-async-functions.js)
