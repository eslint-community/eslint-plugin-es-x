# es-x/no-new-target
> disallow `new.target` meta property

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 `new.target` meta property as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-new-target: error */
class A {
    constructor() {
        doSomething(new.target)
    }
}
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/lib/rules/no-new-target.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/tests/lib/rules/no-new-target.js)
