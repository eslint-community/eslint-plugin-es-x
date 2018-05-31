# disallow the `WeakSet` class (es/no-weak-set)

This rule reports ES2015 `WeakSet` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let set = new WeakSet()
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-weak-set.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-weak-set.js)
