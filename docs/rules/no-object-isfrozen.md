# disallow the `Object.isFrozen` method (es/no-object-isfrozen)

This rule reports ES5 `Object.isFrozen` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-isfrozen: error */
var frozen = Object.isFrozen(obj)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-object-isfrozen.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-object-isfrozen.js)
