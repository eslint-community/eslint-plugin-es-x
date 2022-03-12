# es-x/no-class-static-block
> disallow class static block

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2022`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, `plugin:es-x/restrict-to-es2020`, and `plugin:es-x/restrict-to-es2021`

This rule reports ES2022 class static blocks as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-class-static-block: error */
class A {
    static {
        // ...
    }
}
const B = class {
    static {
        // ...
    }
}
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/lib/rules/no-class-static-block.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/tests/lib/rules/no-class-static-block.js)
