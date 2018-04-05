# disallow Unicode code point escape sequences (es/no-unicode-codepoint-escapes)

This rule reports ES2015 Unicode code point escape sequences as errors.

- :wrench: The `--fix` option on the [command line](http://eslint.org/docs/user-guide/command-line-interface#fix) can automatically fix some of the problems reported by this rule.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const a\u{31} = `foo`
const a2 = "a\u{62}b"
```

👌 Examples of **correct** code for this rule:

```js
const a\u0031 = `foo`
const a2 = "a\u0062b"
```
