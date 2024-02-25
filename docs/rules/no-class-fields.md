---
title: "es-x/no-class-fields"
description: "disallow class fields"
since: "v5.0.0"
---

# es-x/no-class-fields
> disallow class fields

- ✅ The following configurations enable this rule: [no-new-in-es2022], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], and [restrict-to-es2021]

This rule reports class fields as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-class-fields: error */
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
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-class-fields.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-class-fields.js)

[no-new-in-es2022]: ../configs/index.md#no-new-in-es2022
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
[restrict-to-es2018]: ../configs/index.md#restrict-to-es2018
[restrict-to-es2019]: ../configs/index.md#restrict-to-es2019
[restrict-to-es2020]: ../configs/index.md#restrict-to-es2020
[restrict-to-es2021]: ../configs/index.md#restrict-to-es2021
