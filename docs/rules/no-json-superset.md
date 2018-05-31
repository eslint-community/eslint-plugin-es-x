# disallow `\u2028` and `\u2029` in string literals (es/no-json-superset)

- 🔧 The `--fix` option on the [command line](http://eslint.org/docs/user-guide/command-line-interface#fix) can automatically fix some of the problems reported by this rule.

This rule reports ES2019 `\u2028` and `\u2029` in string literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const u2028 = " " // \u2028 in this string
const u2029 = " " // \u2029 in this string
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-json-superset.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-json-superset.js)
