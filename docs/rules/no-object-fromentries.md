# es/no-object-fromentries
> disallow the `Object.fromEntries` method

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2019`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, `plugin:es/restrict-to-es2017`, and `plugin:es/restrict-to-es2018`

This rule reports ES2019 `Object.fromEntries` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-fromentries: error */
const obj = Object.fromEntries(map)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-object-fromentries.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-object-fromentries.js)
