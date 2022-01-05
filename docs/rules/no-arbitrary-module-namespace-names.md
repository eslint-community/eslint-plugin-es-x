# es/no-arbitrary-module-namespace-names
> disallow arbitrary module namespace names

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-esnext`

This rule reports ES2022 arbitrary module namespace names as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-arbitrary-module-namespace-names: error */
export * as &quot;ns&quot; from &quot;mod&quot;
export {foo as &quot;bar&quot;} from &quot;mod&quot;
import {&quot;foo&quot; as bar} from &quot;mod&quot;
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-arbitrary-module-namespace-names.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-arbitrary-module-namespace-names.js)
