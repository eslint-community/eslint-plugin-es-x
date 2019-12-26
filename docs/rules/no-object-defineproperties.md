# disallow the `Object.defineProperties` method (es/no-object-defineproperties)

This rule reports ES5 `Object.defineProperties` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-defineproperties: error */
Object.defineProperties(obj, {})
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v2.0.0/lib/rules/no-object-defineproperties.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v2.0.0/tests/lib/rules/no-object-defineproperties.js)
