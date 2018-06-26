# disallow the `WeakMap` class (es/no-weak-map)

This rule reports ES2015 `WeakMap` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-weak-map: error */
let map = new WeakMap()
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.0/lib/rules/no-weak-map.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.0/tests/lib/rules/no-weak-map.js)
