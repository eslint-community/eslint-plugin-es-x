# disallow the `Proxy` class (es/no-proxy)

This rule reports ES2015 `Proxy` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-proxy: error */
let p = new Proxy(obj, hooks)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.1/lib/rules/no-proxy.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.1/tests/lib/rules/no-proxy.js)
