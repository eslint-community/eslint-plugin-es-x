# disallow the `WeakMap` class (es/no-weak-map)

This rule reports ES2015 `WeakMap` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let map = new WeakMap()
```

## 📚 References

- [Rule source](../../lib/rules/no-weak-map.js)
- [Test source](../../tests/lib/rules/no-weak-map.js)
