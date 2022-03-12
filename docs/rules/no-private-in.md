# es/no-private-in
> disallow `#x in obj`

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-esnext`

This rule reports ES2022 private in (`#x in obj`) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-private-in: error */
class A {
    #x;
    fn () {
        var hasX = #x in obj;
    }
}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-private-in.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-private-in.js)
