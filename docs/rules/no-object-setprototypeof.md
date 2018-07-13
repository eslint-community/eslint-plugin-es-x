# disallow the `Object.setPrototypeOf` method (es/no-object-setprototypeof)

This rule reports ES2015 `Object.setPrototypeOf` as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-setprototypeof: error */
Object.setPrototypeOf(obj, proto)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/lib/rules/no-object-setprototypeof.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/tests/lib/rules/no-object-setprototypeof.js)
