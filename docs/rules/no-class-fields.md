---
title: "es-x/no-class-fields"
description: "disallow class fields"
since: "v5.0.0"
---

# es-x/no-class-fields
> disallow class fields

- 🚫 This rule was deprecated and replaced by [es-x/no-class-instance-fields](./no-class-instance-fields.md), [es-x/no-class-private-fields](./no-class-private-fields.md), [es-x/no-class-private-methods](./no-class-private-methods.md), and [es-x/no-class-static-fields](./no-class-static-fields.md) rules.

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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-class-fields.ts)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-class-fields.ts)
