# disallow template literals (es/no-template-literals)

This rule reports ES2015 template literals as errors.

- :wrench: The `--fix` option on the [command line](http://eslint.org/docs/user-guide/command-line-interface#fix) can automatically fix some of the problems reported by this rule.

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

- [Rule source](../../lib/rules/no-template-literals.js)
- [Test source](../../tests/lib/rules/no-template-literals.js)
