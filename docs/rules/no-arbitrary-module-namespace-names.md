# es-x/no-arbitrary-module-namespace-names
> disallow arbitrary module namespace names

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2022`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, `plugin:es-x/restrict-to-es2020`, and `plugin:es-x/restrict-to-es2021`

This rule reports ES2022 arbitrary module namespace names as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-arbitrary-module-namespace-names: error */
export * as &quot;ns&quot; from &quot;mod&quot;
export {foo as &quot;bar&quot;} from &quot;mod&quot;
import {&quot;foo&quot; as bar} from &quot;mod&quot;
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/lib/rules/no-arbitrary-module-namespace-names.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/tests/lib/rules/no-arbitrary-module-namespace-names.js)
