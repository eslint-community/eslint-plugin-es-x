# disallow block-scoped function declarations (es/no-block-scoped-functions)

This rule reports ES2015 block-scoped function declarations as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
if (a) {
    function f() {}
} else {
    function g() {}
}
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-block-scoped-functions.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-block-scoped-functions.js)
