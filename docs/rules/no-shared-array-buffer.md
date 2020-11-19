# es/no-shared-array-buffer
> disallow the `SharedArrayBuffer` class

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2017`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, and `plugin:es/restrict-to-es2016`

This rule reports ES2017 `SharedArrayBuffer` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-shared-array-buffer: error */
let buffer = new SharedArrayBuffer(10)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-shared-array-buffer.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-shared-array-buffer.js)
