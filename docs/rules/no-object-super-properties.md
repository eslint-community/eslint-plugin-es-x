# disallow `super` property accesses in object literals (es/no-object-super-properties)

This rule reports ES2015 `super` property accesses in object literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-super-properties: error */
let a = {
    __proto__: obj,
    f1() { super.a },
    f2() { super.f() }
}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/lib/rules/no-object-super-properties.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/tests/lib/rules/no-object-super-properties.js)
