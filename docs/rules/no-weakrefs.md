# es-x/no-weakrefs
> disallow the `WeakRef` and `FinalizationRegistry` class

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2021`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, and `plugin:es-x/restrict-to-es2020`

This rule reports ES2021 [WeakRefs](https://github.com/tc39/proposal-weakrefs) as errors.
This proposal includes the following two:

- `WeakRef` class
- `FinalizationRegistry` class

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-weakrefs: error */
let ref = new WeakRef()
let finalizationGroup = new FinalizationRegistry(() =&gt; {})
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/lib/rules/no-weakrefs.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/tests/lib/rules/no-weakrefs.js)
