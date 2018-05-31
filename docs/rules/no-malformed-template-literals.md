# disallow template literals with invalid escape sequences (es/no-malformed-template-literals)

This rule reports ES2018 [template literals with invalid escape sequences](https://github.com/tc39/proposal-template-literal-revision#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
tag`\unicode`
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-malformed-template-literals.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-malformed-template-literals.js)
