# disallow exponential operators (es/no-exponential-operators)

This rule reports ES2016 [exponential operators](https://github.com/rwaldron/exponentiation-operator#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let a = a ** 2
let a **= b
```

## 📚 References

- [Rule source](../../lib/rules/no-exponential-operators.js)
- [Test source](../../tests/lib/rules/no-exponential-operators.js)
