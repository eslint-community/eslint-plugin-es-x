# es/no-top-level-await
> disallow top-level `await`

This rule reports ES2022 [Top-level `await`](https://github.com/tc39/proposal-top-level-await) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-top-level-await: error */
await expr;
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-top-level-await.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-top-level-await.js)
