# disallow the `FinalizationRegistry` class (es/no-finalization-registry)

This rule reports ES2021 [`FinalizationRegistry` class](https://github.com/tc39/proposal-weakrefs) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-finalization-registry: error */
const registry = new FinalizationRegistry(foo =&gt; {
  // ...
})
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-finalization-registry.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-finalization-registry.js)
