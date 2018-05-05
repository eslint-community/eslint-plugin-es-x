# disallow the `Object.setPrototypeOf` method (es/no-object-setprototypeof)

This rule reports ES2015 `Object.setPrototypeOf` as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
Object.setPrototypeOf(obj, proto)
```

## 📚 References

- [Rule source](../../lib/rules/no-object-setprototypeof.js)
- [Test source](../../tests/lib/rules/no-object-setprototypeof.js)
