# disallow the `Object.defineProperty` method (es/no-object-defineproperty)

This rule reports ES5 `Object.defineProperty` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-defineproperty: error */
Object.defineProperty(obj, &quot;prop&quot;, {})
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-object-defineproperty.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-object-defineproperty.js)
