# disallow the `String.raw` method (es/no-string-raw)

This rule reports ES2015 `String.raw` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const pattern = String.raw`[\w_$]+`
```

## 📚 References

- [Rule source](../../lib/rules/no-string-raw.js)
- [Test source](../../tests/lib/rules/no-string-raw.js)
