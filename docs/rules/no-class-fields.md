---
title: "es-x/no-class-fields"
description: "disallow class fields"
since: "v5.0.0"
---

# es-x/no-class-fields
> disallow class fields

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2022`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, `plugin:es-x/restrict-to-es2020`, and `plugin:es-x/restrict-to-es2021`

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
