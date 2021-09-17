# es/no-array-string-prototype-at
> disallow the `{Array,String}.prototype.at()` methods

This rule reports ES2022 [`{Array,String,TypedArray}.prototype.at` methods](https://github.com/tc39/proposal-relative-indexing-method) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-array-string-prototype-at: [error, { aggressive: true }] */
foo.at(-1)
'str'.at(-1)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-array-string-prototype-at.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-array-string-prototype-at.js)
