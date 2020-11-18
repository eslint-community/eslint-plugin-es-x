# disallow `Promise.any` function (es/no-aggregate-error)

This rule reports ES2021 [`AggregateError` class](https://github.com/tc39/proposal-promise-any) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-aggregate-error: error */
try {
  throw new AggregateError([new Error('Error')], 'Error');
} catch (e) {
  console.log(e instanceof AggregateError);
}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-aggregate-error.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-aggregate-error.js)
