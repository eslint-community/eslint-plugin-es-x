# Available Rules

This plugin provides the following rules.

- 🔧 mark means that the `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by the rule.

## ES2021

There is no config which enables all rules in this category.

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-aggregate-error](./no-aggregate-error.md) | disallow the `AggregateError` class. |  |
| [es/no-logical-assignment-operators](./no-logical-assignment-operators.md) | disallow logical assignment operators. | 🔧 |
| [es/no-numeric-separators](./no-numeric-separators.md) | disallow numeric separators. |  |
| [es/no-promise-any](./no-promise-any.md) | disallow `Promise.any` function. |  |
| [es/no-weak-ref](./no-weak-ref.md) | disallow the `WeakRef` class. |  |

## ES2020

There are multiple configs which enable all rules in this category: `plugin:es/no-new-in-es2020`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, `plugin:es/restrict-to-es2017`, `plugin:es/restrict-to-es2018`, and `plugin:es/restrict-to-es2019`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-bigint](./no-bigint.md) | disallow `bigint` syntax and built-ins. |  |
| [es/no-dynamic-import](./no-dynamic-import.md) | disallow `import()` syntax. |  |
| [es/no-export-ns-from](./no-export-ns-from.md) | disallow `export * as ns`. |  |
| [es/no-global-this](./no-global-this.md) | disallow the `globalThis` variable. |  |
| [es/no-import-meta](./no-import-meta.md) | disallow `import.meta` meta property. |  |
| [es/no-nullish-coalescing-operators](./no-nullish-coalescing-operators.md) | disallow nullish coalescing operators. |  |
| [es/no-optional-chaining](./no-optional-chaining.md) | disallow optional chaining. |  |
| [es/no-promise-all-settled](./no-promise-all-settled.md) | disallow `Promise.allSettled` function. |  |

## ES2019

There are multiple configs which enable all rules in this category: `plugin:es/no-new-in-es2019`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, `plugin:es/restrict-to-es2017`, and `plugin:es/restrict-to-es2018`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-json-superset](./no-json-superset.md) | disallow `\u2028` and `\u2029` in string literals. | 🔧 |
| [es/no-object-fromentries](./no-object-fromentries.md) | disallow the `Object.fromEntries` method. |  |
| [es/no-optional-catch-binding](./no-optional-catch-binding.md) | disallow optional `catch` binding. |  |
| [es/no-regexp-unicode-property-escapes-2019](./no-regexp-unicode-property-escapes-2019.md) | disallow the new values of RegExp Unicode property escape sequences in ES2019. |  |

## ES2018

There are multiple configs which enable all rules in this category: `plugin:es/no-new-in-es2018`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, and `plugin:es/restrict-to-es2017`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-async-iteration](./no-async-iteration.md) | disallow async iteration. |  |
| [es/no-malformed-template-literals](./no-malformed-template-literals.md) | disallow template literals with invalid escape sequences. |  |
| [es/no-regexp-lookbehind-assertions](./no-regexp-lookbehind-assertions.md) | disallow RegExp lookbehind assertions. |  |
| [es/no-regexp-named-capture-groups](./no-regexp-named-capture-groups.md) | disallow RegExp named capture groups. |  |
| [es/no-regexp-s-flag](./no-regexp-s-flag.md) | disallow RegExp `s` flag. |  |
| [es/no-regexp-unicode-property-escapes](./no-regexp-unicode-property-escapes.md) | disallow RegExp Unicode property escape sequences. |  |
| [es/no-rest-spread-properties](./no-rest-spread-properties.md) | disallow rest/spread properties. |  |

## ES2017

There are multiple configs which enable all rules in this category: `plugin:es/no-new-in-es2017`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, and `plugin:es/restrict-to-es2016`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-async-functions](./no-async-functions.md) | disallow async function declarations. |  |
| [es/no-atomics](./no-atomics.md) | disallow the `Atomics` class. |  |
| [es/no-object-entries](./no-object-entries.md) | disallow the `Object.entries` method. |  |
| [es/no-object-getownpropertydescriptors](./no-object-getownpropertydescriptors.md) | disallow the `Object.getOwnPropertyDescriptors` method. |  |
| [es/no-object-values](./no-object-values.md) | disallow the `Object.values` method. |  |
| [es/no-shared-array-buffer](./no-shared-array-buffer.md) | disallow the `SharedArrayBuffer` class. |  |
| [es/no-trailing-function-commas](./no-trailing-function-commas.md) | disallow trailing commas in parameter/argument lists. | 🔧 |

## ES2016

There are multiple configs which enable all rules in this category: `plugin:es/no-new-in-es2016`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, and `plugin:es/restrict-to-es2015`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-exponential-operators](./no-exponential-operators.md) | disallow exponential operators. |  |

## ES2015

There are multiple configs which enable all rules in this category: `plugin:es/no-new-in-es2015`, `plugin:es/restrict-to-es3`, and `plugin:es/restrict-to-es5`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-array-from](./no-array-from.md) | disallow the `Array.from` method. |  |
| [es/no-array-of](./no-array-of.md) | disallow the `Array.of` method. |  |
| [es/no-arrow-functions](./no-arrow-functions.md) | disallow arrow function expressions. | 🔧 |
| [es/no-binary-numeric-literals](./no-binary-numeric-literals.md) | disallow binary numeric literals. |  |
| [es/no-block-scoped-functions](./no-block-scoped-functions.md) | disallow block-scoped function declarations. |  |
| [es/no-block-scoped-variables](./no-block-scoped-variables.md) | disallow block-scoped variable declarations. |  |
| [es/no-classes](./no-classes.md) | disallow class declarations. |  |
| [es/no-computed-properties](./no-computed-properties.md) | disallow computed properties. |  |
| [es/no-default-parameters](./no-default-parameters.md) | disallow default parameters. |  |
| [es/no-destructuring](./no-destructuring.md) | disallow destructuring. |  |
| [es/no-for-of-loops](./no-for-of-loops.md) | disallow `for-of` statements. |  |
| [es/no-generators](./no-generators.md) | disallow generator function declarations. |  |
| [es/no-map](./no-map.md) | disallow the `Map` class. |  |
| [es/no-math-acosh](./no-math-acosh.md) | disallow the `Math.acosh` method. |  |
| [es/no-math-asinh](./no-math-asinh.md) | disallow the `Math.asinh` method. |  |
| [es/no-math-atanh](./no-math-atanh.md) | disallow the `Math.atanh` method. |  |
| [es/no-math-cbrt](./no-math-cbrt.md) | disallow the `Math.cbrt` method. |  |
| [es/no-math-clz32](./no-math-clz32.md) | disallow the `Math.clz32` method. |  |
| [es/no-math-cosh](./no-math-cosh.md) | disallow the `Math.cosh` method. |  |
| [es/no-math-expm1](./no-math-expm1.md) | disallow the `Math.expm1` method. |  |
| [es/no-math-fround](./no-math-fround.md) | disallow the `Math.fround` method. |  |
| [es/no-math-hypot](./no-math-hypot.md) | disallow the `Math.hypot` method. |  |
| [es/no-math-imul](./no-math-imul.md) | disallow the `Math.imul` method. |  |
| [es/no-math-log10](./no-math-log10.md) | disallow the `Math.log10` method. |  |
| [es/no-math-log1p](./no-math-log1p.md) | disallow the `Math.log1p` method. |  |
| [es/no-math-log2](./no-math-log2.md) | disallow the `Math.log2` method. |  |
| [es/no-math-sign](./no-math-sign.md) | disallow the `Math.sign` method. |  |
| [es/no-math-sinh](./no-math-sinh.md) | disallow the `Math.sinh` method. |  |
| [es/no-math-tanh](./no-math-tanh.md) | disallow the `Math.tanh` method. |  |
| [es/no-math-trunc](./no-math-trunc.md) | disallow the `Math.trunc` method. |  |
| [es/no-modules](./no-modules.md) | disallow modules. |  |
| [es/no-new-target](./no-new-target.md) | disallow `new.target` meta property. |  |
| [es/no-number-epsilon](./no-number-epsilon.md) | disallow the `Number.EPSILON` property. |  |
| [es/no-number-isfinite](./no-number-isfinite.md) | disallow the `Number.isFinite` method. |  |
| [es/no-number-isinteger](./no-number-isinteger.md) | disallow the `Number.isInteger` method. |  |
| [es/no-number-isnan](./no-number-isnan.md) | disallow the `Number.isNaN` method. |  |
| [es/no-number-issafeinteger](./no-number-issafeinteger.md) | disallow the `Number.isSafeInteger` method. |  |
| [es/no-number-maxsafeinteger](./no-number-maxsafeinteger.md) | disallow the `Number.MAX_SAFE_INTEGER` property. |  |
| [es/no-number-minsafeinteger](./no-number-minsafeinteger.md) | disallow the `Number.MIN_SAFE_INTEGER` property. |  |
| [es/no-number-parsefloat](./no-number-parsefloat.md) | disallow the `Number.parseFloat` method. |  |
| [es/no-number-parseint](./no-number-parseint.md) | disallow the `Number.parseInt` method. |  |
| [es/no-object-assign](./no-object-assign.md) | disallow the `Object.assign` method. |  |
| [es/no-object-getownpropertysymbols](./no-object-getownpropertysymbols.md) | disallow the `Object.getOwnPropertySymbols` method. |  |
| [es/no-object-is](./no-object-is.md) | disallow the `Object.is` method. |  |
| [es/no-object-setprototypeof](./no-object-setprototypeof.md) | disallow the `Object.setPrototypeOf` method. |  |
| [es/no-object-super-properties](./no-object-super-properties.md) | disallow `super` property accesses in object literals. |  |
| [es/no-octal-numeric-literals](./no-octal-numeric-literals.md) | disallow octal numeric literals. |  |
| [es/no-promise](./no-promise.md) | disallow the `Promise` class. |  |
| [es/no-property-shorthands](./no-property-shorthands.md) | disallow property shorthands. | 🔧 |
| [es/no-proxy](./no-proxy.md) | disallow the `Proxy` class. |  |
| [es/no-reflect](./no-reflect.md) | disallow the `Reflect` class. |  |
| [es/no-regexp-u-flag](./no-regexp-u-flag.md) | disallow RegExp `u` flag. |  |
| [es/no-regexp-y-flag](./no-regexp-y-flag.md) | disallow RegExp `y` flag. |  |
| [es/no-rest-parameters](./no-rest-parameters.md) | disallow rest parameters. |  |
| [es/no-set](./no-set.md) | disallow the `Set` class. |  |
| [es/no-spread-elements](./no-spread-elements.md) | disallow spread elements. |  |
| [es/no-string-fromcodepoint](./no-string-fromcodepoint.md) | disallow the `String.fromCodePoint` method. |  |
| [es/no-string-raw](./no-string-raw.md) | disallow the `String.raw` method. |  |
| [es/no-subclassing-builtins](./no-subclassing-builtins.md) | disallow the subclassing of the built-in classes. |  |
| [es/no-symbol](./no-symbol.md) | disallow the `Symbol` class. |  |
| [es/no-template-literals](./no-template-literals.md) | disallow template literals. | 🔧 |
| [es/no-typed-arrays](./no-typed-arrays.md) | disallow ES2015 typed arrays. |  |
| [es/no-unicode-codepoint-escapes](./no-unicode-codepoint-escapes.md) | disallow Unicode code point escape sequences. | 🔧 |
| [es/no-weak-map](./no-weak-map.md) | disallow the `WeakMap` class. |  |
| [es/no-weak-set](./no-weak-set.md) | disallow the `WeakSet` class. |  |

## ES5

There are multiple configs which enable all rules in this category: `plugin:es/no-new-in-es5` and `plugin:es/restrict-to-es3`

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-accessor-properties](./no-accessor-properties.md) | disallow accessor properties. |  |
| [es/no-array-isarray](./no-array-isarray.md) | disallow the `Array.isArray` method. |  |
| [es/no-date-now](./no-date-now.md) | disallow the `Date.now` method. |  |
| [es/no-json](./no-json.md) | disallow the `JSON` class. |  |
| [es/no-keyword-properties](./no-keyword-properties.md) | disallow reserved words as property names. |  |
| [es/no-object-defineproperties](./no-object-defineproperties.md) | disallow the `Object.defineProperties` method. |  |
| [es/no-object-defineproperty](./no-object-defineproperty.md) | disallow the `Object.defineProperty` method. |  |
| [es/no-object-freeze](./no-object-freeze.md) | disallow the `Object.freeze` method. |  |
| [es/no-object-getownpropertydescriptor](./no-object-getownpropertydescriptor.md) | disallow the `Object.getOwnPropertyDescriptor` method. |  |
| [es/no-object-getownpropertynames](./no-object-getownpropertynames.md) | disallow the `Object.getOwnPropertyNames` method. |  |
| [es/no-object-getprototypeof](./no-object-getprototypeof.md) | disallow the `Object.getPrototypeOf` method. |  |
| [es/no-object-isextensible](./no-object-isextensible.md) | disallow the `Object.isExtensible` method. |  |
| [es/no-object-isfrozen](./no-object-isfrozen.md) | disallow the `Object.isFrozen` method. |  |
| [es/no-object-issealed](./no-object-issealed.md) | disallow the `Object.isSealed` method. |  |
| [es/no-object-keys](./no-object-keys.md) | disallow the `Object.keys` method. |  |
| [es/no-object-preventextensions](./no-object-preventextensions.md) | disallow the `Object.preventExtensions` method. |  |
| [es/no-object-seal](./no-object-seal.md) | disallow the `Object.seal` method. |  |
| [es/no-trailing-commas](./no-trailing-commas.md) | disallow trailing commas in array/object literals. |  |

