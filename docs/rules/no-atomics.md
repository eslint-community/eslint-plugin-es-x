# disallow the `Atomics` class (es/no-atomics)

This rule reports ES2017 `Atomics` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
Atomics.add(buffer, 0, 2)
```

## 📚 References

- [Rule source](../../lib/rules/no-atomics.js)
- [Test source](../../tests/lib/rules/no-atomics.js)
