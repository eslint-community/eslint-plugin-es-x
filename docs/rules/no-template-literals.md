# disallow template literals (es/no-template-literals)

- 🔧 The `--fix` option on the [command line](http://eslint.org/docs/user-guide/command-line-interface#fix) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 template literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const a1 = `foo`
const a2 = `foo${bar}baz`
const a3 = tag`foo`
```

👌 Examples of **correct** code for this rule:

```js
const a1 = "foo"
const a2 = "foo"+bar+"baz"
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-template-literals.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-template-literals.js)
