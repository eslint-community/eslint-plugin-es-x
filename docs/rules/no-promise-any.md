# es-x/no-promise-any
> disallow `Promise.any` function and `AggregateError` class

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2021`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, and `plugin:es-x/restrict-to-es2020`

This rule reports ES2021 [`Promise.any`](https://github.com/tc39/proposal-promise-any) as errors.
This proposal includes the following two:

- `Promise.any` function
- `AggregateError` class

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-promise-any: error */
const p = Promise.any(promises).catch(error =&gt; {
    if (error instanceof AggregateError) {
        // Do something.
    }
})
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-promise-any.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-promise-any.js)
