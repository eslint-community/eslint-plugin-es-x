# disallow generator function declarations (es/no-generators)

This rule reports ES2015 generator function declarations as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
function* f1() {}
const f2 = function*() {}
const obj = {
    *f3() {}
}
class A {
    *f4() {}
}
```

## 📚 References

- [Rule source](../../lib/rules/no-generators.js)
- [Test source](../../tests/lib/rules/no-generators.js)
