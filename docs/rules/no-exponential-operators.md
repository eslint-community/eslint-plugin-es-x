# disallow exponential operators (es/no-exponential-operators)

This rule reports ES2016 [exponential operators](https://github.com/rwaldron/exponentiation-operator#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let a = a ** 2
let a **= b
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-exponential-operators.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-exponential-operators.js)
