# es/no-import-meta
> disallow `import.meta` meta property

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2020`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, `plugin:es/restrict-to-es2017`, `plugin:es/restrict-to-es2018`, and `plugin:es/restrict-to-es2019`

This rule reports ES2020 [import.meta](https://github.com/tc39/proposal-import-meta) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-import-meta: error */
import.meta
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-import-meta.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-import-meta.js)
