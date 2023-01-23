---
title: "es-x/no-string-create-html-methods"
description: "disallow HTML creation methods of string instances"
since: "v5.1.0"
---

# es-x/no-string-create-html-methods
> disallow HTML creation methods of string instances

This rule reports Annex B feature `String.prototype.{anchor,big,blink,bold,fixed,fontcolor,fontsize,italics,link,small,strike,sub,sup}` methods as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-string-create-html-methods: [error, { aggressive: true }] */
foo.anchor('nm')
foo.big()
foo.blink()
foo.bold()
foo.fixed()
foo.fontcolor('red')
foo.fontsize(7)
foo.italics()
foo.link('https://example.com/')
foo.small()
foo.strike()
foo.sub()
foo.sup()
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-string-create-html-methods: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v5.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-string-create-html-methods.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-string-create-html-methods.js)
