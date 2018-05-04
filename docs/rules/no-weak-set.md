# disallow the `WeakSet` class (es/no-weak-set)

This rule reports ES2015 `WeakSet` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let set = new WeakSet()
```

## 📚 References

- [Rule source](../../lib/rules/no-weak-set.js)
- [Test source](../../tests/lib/rules/no-weak-set.js)
