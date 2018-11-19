# disallow the `Atomics` class (es/no-atomics)

This rule reports ES2017 `Atomics` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-atomics: error */
Atomics.add(buffer, 0, 2)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.0/lib/rules/no-atomics.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.0/tests/lib/rules/no-atomics.js)
