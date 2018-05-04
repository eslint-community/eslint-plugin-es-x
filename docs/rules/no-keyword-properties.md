# disallow reserved words as property names (es/no-keyword-properties)

This rule reports ES5 reserved words as property names as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
var a = { if: 1, class: 2 }
a.if = 2
a.class = 3
```

## 📚 References

- [Rule source](../../lib/rules/no-keyword-properties.js)
- [Test source](../../tests/lib/rules/no-keyword-properties.js)
