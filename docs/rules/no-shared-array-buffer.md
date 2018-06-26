# disallow the `SharedArrayBuffer` class (es/no-shared-array-buffer)

This rule reports ES2017 `SharedArrayBuffer` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-shared-array-buffer: error */
let buffer = new SharedArrayBuffer(10)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.0/lib/rules/no-shared-array-buffer.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.0/tests/lib/rules/no-shared-array-buffer.js)
