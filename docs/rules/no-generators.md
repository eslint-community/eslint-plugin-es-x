# disallow generator function declarations (es/no-generators)

This rule reports ES2015 generator function declarations as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-generators: error */
function* f1() {}
const f2 = function*() {}
const obj = {
    *f3() {}
}
class A {
    *f4() {}
}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-generators.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-generators.js)
