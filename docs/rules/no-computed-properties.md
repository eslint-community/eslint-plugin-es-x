# disallow computed properties (es/no-computed-properties)

This rule reports ES2015 computed properties as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-computed-properties: error */
const obj = {
    [a]: 1,
    [b]() {},
    get [c]() {},
    set [c](value) {},
}
class A {
    [a]() {}
}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-computed-properties.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-computed-properties.js)
