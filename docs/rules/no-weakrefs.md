# es/no-weakrefs
> disallow the `WeakRef` and `FinalizationRegistry` class

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-esnext`

This rule reports ES2021 [WeakRefs](https://github.com/tc39/proposal-weakrefs) as errors.
This proposal includes the following two:

- `WeakRef` class
- `FinalizationRegistry` class

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-weakrefs: error */
let ref = new WeakRef()
let finalizationGroup = new FinalizationRegistry(() =&gt; {})
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-weakrefs.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-weakrefs.js)
