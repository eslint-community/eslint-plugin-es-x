---
title: "es-x/no-function-declarations-in-if-statement-clauses-without-block"
description: "disallow function declarations in if statement clauses without using blocks"
since: "v5.1.0"
---

# es-x/no-function-declarations-in-if-statement-clauses-without-block
> disallow function declarations in if statement clauses without using blocks

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports Annex B feature [the function declarations in if statement clauses without using blocks](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-functiondeclarations-in-ifstatement-statement-clauses) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground fix type="bad" source-type="script">

```js
/*eslint es-x/no-function-declarations-in-if-statement-clauses-without-block: error */
if (a)
  function f1() {}
else
  function f2() {}
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-function-declarations-in-if-statement-clauses-without-block.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-function-declarations-in-if-statement-clauses-without-block.js)
