# disallow the `WeakRef` class (es/no-weak-ref)

This rule reports ES2021 [`WeakRef` class](https://github.com/tc39/proposal-weakrefs) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-weak-ref: error */
let ref = new WeakRef()
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-weak-ref.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-weak-ref.js)
