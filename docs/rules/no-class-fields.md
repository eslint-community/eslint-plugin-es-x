# es/no-class-fields
> disallow class fields

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-esnext`

This rule reports class fields as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-class-fields: error */
class A {
    a = 0
    #b = 0

    #c() {}
    get #d() {}
    set #d(v) {}

    static e = 0
    static #f = 0
    static #g() {}
    static get #h() {}
    static set #h(v) {}

    fn () {
        this.#b++
        A.#f++
        this.#c()
        A.#g()
    }
}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-class-fields.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-class-fields.js)
