# disallow the `Reflect` class (es/no-reflect)

This rule reports ES2015 `Reflect` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let value = Reflect.get(obj, key)
```

## 📚 References

- [Rule source](../../lib/rules/no-reflect.js)
- [Test source](../../tests/lib/rules/no-reflect.js)
