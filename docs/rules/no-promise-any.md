# es/no-promise-any
> disallow `Promise.any` function and `AggregateError` class

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2021`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, `plugin:es/restrict-to-es2017`, `plugin:es/restrict-to-es2018`, `plugin:es/restrict-to-es2019`, and `plugin:es/restrict-to-es2020`

This rule reports ES2021 [`Promise.any`](https://github.com/tc39/proposal-promise-any) as errors.
This proposal includes the following two:

- `Promise.any` function
- `AggregateError` class

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-promise-any: error */
const p = Promise.any(promises).catch(error =&gt; {
    if (error instanceof AggregateError) {
        // Do something.
    }
})
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-promise-any.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-promise-any.js)
