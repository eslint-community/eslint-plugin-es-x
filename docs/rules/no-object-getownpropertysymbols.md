# disallow `Object.getOwnPropertySymbols` method (es/no-object-getownpropertysymbols)

This rule reports ES2015 `Object.getOwnPropertySymbols` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const symbols = Object.getOwnPropertySymbols(obj)
```

## 📚 References

- [Rule source](../../lib/rules/no-object-getownpropertysymbols.js)
- [Test source](../../tests/lib/rules/no-object-getownpropertysymbols.js)
