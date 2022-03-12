# es/no-class-static-block
> disallow class static block

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-esnext`

This rule reports ES2022 class static blocks as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-class-static-block: error */
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

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-class-static-block.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-class-static-block.js)
