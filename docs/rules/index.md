# Available Rules

This plugin provides the following rules.

- 🔧 mark means that the `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by the rule.

## ES2025

There is a config that enables the rules in this category: [`no-new-in-esnext`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-dynamic-import-options](./no-dynamic-import-options.md) | disallow the second parameter to `import()`. |  |
| [es-x/no-import-attributes](./no-import-attributes.md) | disallow Import Attributes. |  |
| [es-x/no-iterator-prototype-drop](./no-iterator-prototype-drop.md) | disallow the `Iterator.prototype.drop` method. |  |
| [es-x/no-iterator-prototype-every](./no-iterator-prototype-every.md) | disallow the `Iterator.prototype.every` method. |  |
| [es-x/no-iterator-prototype-filter](./no-iterator-prototype-filter.md) | disallow the `Iterator.prototype.filter` method. |  |
| [es-x/no-iterator-prototype-find](./no-iterator-prototype-find.md) | disallow the `Iterator.prototype.find` method. |  |
| [es-x/no-iterator-prototype-flatmap](./no-iterator-prototype-flatmap.md) | disallow the `Iterator.prototype.flatMap` method. |  |
| [es-x/no-iterator-prototype-foreach](./no-iterator-prototype-foreach.md) | disallow the `Iterator.prototype.forEach` method. |  |
| [es-x/no-iterator-prototype-map](./no-iterator-prototype-map.md) | disallow the `Iterator.prototype.map` method. |  |
| [es-x/no-iterator-prototype-reduce](./no-iterator-prototype-reduce.md) | disallow the `Iterator.prototype.reduce` method. |  |
| [es-x/no-iterator-prototype-some](./no-iterator-prototype-some.md) | disallow the `Iterator.prototype.some` method. |  |
| [es-x/no-iterator-prototype-take](./no-iterator-prototype-take.md) | disallow the `Iterator.prototype.take` method. |  |
| [es-x/no-iterator-prototype-toarray](./no-iterator-prototype-toarray.md) | disallow the `Iterator.prototype.toArray` method. |  |
| [es-x/no-iterator](./no-iterator.md) | disallow the `Iterator` class. |  |
| [es-x/no-json-modules](./no-json-modules.md) | disallow JSON Modules. |  |
| [es-x/no-promise-try](./no-promise-try.md) | disallow `Promise.try` function. |  |
| [es-x/no-regexp-duplicate-named-capturing-groups](./no-regexp-duplicate-named-capturing-groups.md) | disallow RegExp duplicate named capturing groups. |  |
| [es-x/no-regexp-escape](./no-regexp-escape.md) | disallow `RegExp.escape` function. |  |
| [es-x/no-regexp-modifiers](./no-regexp-modifiers.md) | disallow RegExp Modifiers. |  |
| [es-x/no-set-prototype-difference](./no-set-prototype-difference.md) | disallow the `Set.prototype.difference` method. |  |
| [es-x/no-set-prototype-intersection](./no-set-prototype-intersection.md) | disallow the `Set.prototype.intersection` method. |  |
| [es-x/no-set-prototype-isdisjointfrom](./no-set-prototype-isdisjointfrom.md) | disallow the `Set.prototype.isDisjointFrom` method. |  |
| [es-x/no-set-prototype-issubsetof](./no-set-prototype-issubsetof.md) | disallow the `Set.prototype.isSubsetOf` method. |  |
| [es-x/no-set-prototype-issupersetof](./no-set-prototype-issupersetof.md) | disallow the `Set.prototype.isSupersetOf` method. |  |
| [es-x/no-set-prototype-symmetricdifference](./no-set-prototype-symmetricdifference.md) | disallow the `Set.prototype.symmetricDifference` method. |  |
| [es-x/no-set-prototype-union](./no-set-prototype-union.md) | disallow the `Set.prototype.union` method. |  |
| [es-x/no-trailing-dynamic-import-commas](./no-trailing-dynamic-import-commas.md) | disallow trailing commas in `import()`. | 🔧 |

## ES2025 Intl API

There is a config that enables the rules in this category: [`no-new-in-esnext-intl-api`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-intl-durationformat](./no-intl-durationformat.md) | disallow the `Intl.DurationFormat` object. |  |

## ES2024

There are multiple configs that enable all rules in this category: [`no-new-in-es2024`], [`restrict-to-es3`], [`restrict-to-es5`], [`restrict-to-es2015`], [`restrict-to-es2016`], [`restrict-to-es2017`], [`restrict-to-es2018`], [`restrict-to-es2019`], [`restrict-to-es2020`], [`restrict-to-es2021`], [`restrict-to-es2022`], and [`restrict-to-es2023`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-arraybuffer-prototype-transfer](./no-arraybuffer-prototype-transfer.md) | disallow the `ArrayBuffer.prototype.transfer` method. |  |
| [es-x/no-atomics-waitasync](./no-atomics-waitasync.md) | disallow the `Atomics.waitAsync` method. |  |
| [es-x/no-map-groupby](./no-map-groupby.md) | disallow the `Map.groupBy()` method. |  |
| [es-x/no-object-groupby](./no-object-groupby.md) | disallow the `Object.groupBy()` method. |  |
| [es-x/no-promise-withresolvers](./no-promise-withresolvers.md) | disallow the `Promise.withResolvers()` method. |  |
| [es-x/no-regexp-v-flag](./no-regexp-v-flag.md) | disallow RegExp `v` flag. |  |
| [es-x/no-resizable-and-growable-arraybuffers](./no-resizable-and-growable-arraybuffers.md) | disallow resizable and growable ArrayBuffers. |  |
| [es-x/no-string-prototype-iswellformed](./no-string-prototype-iswellformed.md) | disallow the `String.prototype.isWellFormed` methods. |  |
| [es-x/no-string-prototype-towellformed](./no-string-prototype-towellformed.md) | disallow the `String.prototype.toWellFormed` methods. |  |

## ES2023

There are multiple configs that enable all rules in this category: [`no-new-in-es2023`], [`restrict-to-es3`], [`restrict-to-es5`], [`restrict-to-es2015`], [`restrict-to-es2016`], [`restrict-to-es2017`], [`restrict-to-es2018`], [`restrict-to-es2019`], [`restrict-to-es2020`], [`restrict-to-es2021`], and [`restrict-to-es2022`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-array-prototype-findlast-findlastindex](./no-array-prototype-findlast-findlastindex.md) | disallow the `Array.prototype.{findLast,findLastIndex}` methods. |  |
| [es-x/no-array-prototype-toreversed](./no-array-prototype-toreversed.md) | disallow the `Array.prototype.toReversed` method. |  |
| [es-x/no-array-prototype-tosorted](./no-array-prototype-tosorted.md) | disallow the `Array.prototype.toSorted` method. |  |
| [es-x/no-array-prototype-tospliced](./no-array-prototype-tospliced.md) | disallow the `Array.prototype.toSpliced` method. |  |
| [es-x/no-array-prototype-with](./no-array-prototype-with.md) | disallow the `Array.prototype.with` method. |  |
| [es-x/no-hashbang](./no-hashbang.md) | disallow Hashbang comments. |  |
| [es-x/no-regexp-unicode-property-escapes-2023](./no-regexp-unicode-property-escapes-2023.md) | disallow the new values of RegExp Unicode property escape sequences in ES2023. |  |

## ES2023 Intl API

There are multiple configs that enable all rules in this category: [`no-new-in-es2023-intl-api`], [`restrict-to-es-intl-api-1st-edition`], [`restrict-to-es2015-intl-api`], [`restrict-to-es2016-intl-api`], [`restrict-to-es2017-intl-api`], [`restrict-to-es2018-intl-api`], [`restrict-to-es2019-intl-api`], [`restrict-to-es2020-intl-api`], [`restrict-to-es2021-intl-api`], and [`restrict-to-es2022-intl-api`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-intl-numberformat-prototype-formatrange](./no-intl-numberformat-prototype-formatrange.md) | disallow the `NumberFormat.prototype.formatRange` method. |  |
| [es-x/no-intl-numberformat-prototype-formatrangetoparts](./no-intl-numberformat-prototype-formatrangetoparts.md) | disallow the `NumberFormat.prototype.formatRangeToParts` method. |  |
| [es-x/no-intl-pluralrules-prototype-selectrange](./no-intl-pluralrules-prototype-selectrange.md) | disallow the `PluralRules.prototype.selectRange` method. |  |

## ES2022

There are multiple configs that enable all rules in this category: [`no-new-in-es2022`], [`restrict-to-es3`], [`restrict-to-es5`], [`restrict-to-es2015`], [`restrict-to-es2016`], [`restrict-to-es2017`], [`restrict-to-es2018`], [`restrict-to-es2019`], [`restrict-to-es2020`], and [`restrict-to-es2021`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-arbitrary-module-namespace-names](./no-arbitrary-module-namespace-names.md) | disallow arbitrary module namespace names. |  |
| [es-x/no-array-prototype-at](./no-array-prototype-at.md) | disallow the `Array.prototype.at()` methods. |  |
| [es-x/no-class-instance-fields](./no-class-instance-fields.md) | disallow instance class fields. |  |
| [es-x/no-class-private-fields](./no-class-private-fields.md) | disallow private class fields. |  |
| [es-x/no-class-private-methods](./no-class-private-methods.md) | disallow private class methods. |  |
| [es-x/no-class-static-block](./no-class-static-block.md) | disallow class static block. |  |
| [es-x/no-class-static-fields](./no-class-static-fields.md) | disallow static class fields. |  |
| [es-x/no-error-cause](./no-error-cause.md) | disallow Error Cause. |  |
| [es-x/no-object-hasown](./no-object-hasown.md) | disallow the `Object.hasOwn` method. |  |
| [es-x/no-private-in](./no-private-in.md) | disallow `#x in obj`. |  |
| [es-x/no-regexp-d-flag](./no-regexp-d-flag.md) | disallow RegExp `d` flag. |  |
| [es-x/no-regexp-unicode-property-escapes-2022](./no-regexp-unicode-property-escapes-2022.md) | disallow the new values of RegExp Unicode property escape sequences in ES2022. |  |
| [es-x/no-string-prototype-at](./no-string-prototype-at.md) | disallow the `String.prototype.at()` methods. |  |
| [es-x/no-top-level-await](./no-top-level-await.md) | disallow top-level `await`. |  |

## ES2022 Intl API

There are multiple configs that enable all rules in this category: [`no-new-in-es2022-intl-api`], [`restrict-to-es-intl-api-1st-edition`], [`restrict-to-es2015-intl-api`], [`restrict-to-es2016-intl-api`], [`restrict-to-es2017-intl-api`], [`restrict-to-es2018-intl-api`], [`restrict-to-es2019-intl-api`], [`restrict-to-es2020-intl-api`], and [`restrict-to-es2021-intl-api`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-intl-segmenter](./no-intl-segmenter.md) | disallow the `Intl.Segmenter` object. |  |
| [es-x/no-intl-supportedvaluesof](./no-intl-supportedvaluesof.md) | disallow the `Intl.supportedValuesOf` method. |  |

## ES2021

There are multiple configs that enable all rules in this category: [`no-new-in-es2021`], [`restrict-to-es3`], [`restrict-to-es5`], [`restrict-to-es2015`], [`restrict-to-es2016`], [`restrict-to-es2017`], [`restrict-to-es2018`], [`restrict-to-es2019`], and [`restrict-to-es2020`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-logical-assignment-operators](./no-logical-assignment-operators.md) | disallow logical assignment operators. | 🔧 |
| [es-x/no-numeric-separators](./no-numeric-separators.md) | disallow numeric separators. | 🔧 |
| [es-x/no-promise-any](./no-promise-any.md) | disallow `Promise.any` function and `AggregateError` class. |  |
| [es-x/no-regexp-unicode-property-escapes-2021](./no-regexp-unicode-property-escapes-2021.md) | disallow the new values of RegExp Unicode property escape sequences in ES2021. |  |
| [es-x/no-string-prototype-replaceall](./no-string-prototype-replaceall.md) | disallow the `String.prototype.replaceAll` method. |  |
| [es-x/no-weakrefs](./no-weakrefs.md) | disallow the `WeakRef` and `FinalizationRegistry` class. |  |

## ES2021 Intl API

There are multiple configs that enable all rules in this category: [`no-new-in-es2021-intl-api`], [`restrict-to-es-intl-api-1st-edition`], [`restrict-to-es2015-intl-api`], [`restrict-to-es2016-intl-api`], [`restrict-to-es2017-intl-api`], [`restrict-to-es2018-intl-api`], [`restrict-to-es2019-intl-api`], and [`restrict-to-es2020-intl-api`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-intl-datetimeformat-prototype-formatrange](./no-intl-datetimeformat-prototype-formatrange.md) | disallow the `Intl.DateTimeFormat.prototype.formatRange` method. |  |
| [es-x/no-intl-displaynames](./no-intl-displaynames.md) | disallow the `Intl.DisplayNames` object. |  |
| [es-x/no-intl-listformat](./no-intl-listformat.md) | disallow the `Intl.ListFormat` object. |  |

## ES2020

There are multiple configs that enable all rules in this category: [`no-new-in-es2020`], [`restrict-to-es3`], [`restrict-to-es5`], [`restrict-to-es2015`], [`restrict-to-es2016`], [`restrict-to-es2017`], [`restrict-to-es2018`], and [`restrict-to-es2019`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-bigint](./no-bigint.md) | disallow `bigint` syntax and built-ins. |  |
| [es-x/no-dynamic-import](./no-dynamic-import.md) | disallow `import()` syntax. |  |
| [es-x/no-export-ns-from](./no-export-ns-from.md) | disallow `export * as ns`. |  |
| [es-x/no-global-this](./no-global-this.md) | disallow the `globalThis` variable. |  |
| [es-x/no-import-meta](./no-import-meta.md) | disallow `import.meta` meta property. |  |
| [es-x/no-nullish-coalescing-operators](./no-nullish-coalescing-operators.md) | disallow nullish coalescing operators. |  |
| [es-x/no-optional-chaining](./no-optional-chaining.md) | disallow optional chaining. |  |
| [es-x/no-promise-all-settled](./no-promise-all-settled.md) | disallow `Promise.allSettled` function. |  |
| [es-x/no-regexp-unicode-property-escapes-2020](./no-regexp-unicode-property-escapes-2020.md) | disallow the new values of RegExp Unicode property escape sequences in ES2020. |  |
| [es-x/no-string-prototype-matchall](./no-string-prototype-matchall.md) | disallow the `String.prototype.matchAll` method. |  |

## ES2020 Intl API

There are multiple configs that enable all rules in this category: [`no-new-in-es2020-intl-api`], [`restrict-to-es-intl-api-1st-edition`], [`restrict-to-es2015-intl-api`], [`restrict-to-es2016-intl-api`], [`restrict-to-es2017-intl-api`], [`restrict-to-es2018-intl-api`], and [`restrict-to-es2019-intl-api`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-intl-locale](./no-intl-locale.md) | disallow the `Intl.Locale` object. |  |
| [es-x/no-intl-relativetimeformat](./no-intl-relativetimeformat.md) | disallow the `Intl.RelativeTimeFormat` object. |  |

## ES2019

There are multiple configs that enable all rules in this category: [`no-new-in-es2019`], [`restrict-to-es3`], [`restrict-to-es5`], [`restrict-to-es2015`], [`restrict-to-es2016`], [`restrict-to-es2017`], and [`restrict-to-es2018`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-array-prototype-flat](./no-array-prototype-flat.md) | disallow the `Array.prototype.{flat,flatMap}` method. |  |
| [es-x/no-json-superset](./no-json-superset.md) | disallow `\u2028` and `\u2029` in string literals. | 🔧 |
| [es-x/no-object-fromentries](./no-object-fromentries.md) | disallow the `Object.fromEntries` method. |  |
| [es-x/no-optional-catch-binding](./no-optional-catch-binding.md) | disallow optional `catch` binding. |  |
| [es-x/no-regexp-unicode-property-escapes-2019](./no-regexp-unicode-property-escapes-2019.md) | disallow the new values of RegExp Unicode property escape sequences in ES2019. |  |
| [es-x/no-string-prototype-trimstart-trimend](./no-string-prototype-trimstart-trimend.md) | disallow the `String.prototype.{trimStart,trimEnd}` methods. |  |
| [es-x/no-symbol-prototype-description](./no-symbol-prototype-description.md) | disallow the `Symbol.prototype.description` property. |  |

## ES2018

There are multiple configs that enable all rules in this category: [`no-new-in-es2018`], [`restrict-to-es3`], [`restrict-to-es5`], [`restrict-to-es2015`], [`restrict-to-es2016`], and [`restrict-to-es2017`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-async-iteration](./no-async-iteration.md) | disallow async iteration. |  |
| [es-x/no-malformed-template-literals](./no-malformed-template-literals.md) | disallow template literals with invalid escape sequences. |  |
| [es-x/no-promise-prototype-finally](./no-promise-prototype-finally.md) | disallow the `Promise.prototype.finally` method. |  |
| [es-x/no-regexp-lookbehind-assertions](./no-regexp-lookbehind-assertions.md) | disallow RegExp lookbehind assertions. |  |
| [es-x/no-regexp-named-capture-groups](./no-regexp-named-capture-groups.md) | disallow RegExp named capture groups. |  |
| [es-x/no-regexp-s-flag](./no-regexp-s-flag.md) | disallow RegExp `s` flag. |  |
| [es-x/no-regexp-unicode-property-escapes](./no-regexp-unicode-property-escapes.md) | disallow RegExp Unicode property escape sequences. |  |
| [es-x/no-rest-spread-properties](./no-rest-spread-properties.md) | disallow rest/spread properties. |  |

## ES2018 Intl API

There are multiple configs that enable all rules in this category: [`no-new-in-es2018-intl-api`], [`restrict-to-es-intl-api-1st-edition`], [`restrict-to-es2015-intl-api`], [`restrict-to-es2016-intl-api`], and [`restrict-to-es2017-intl-api`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-intl-numberformat-prototype-formattoparts](./no-intl-numberformat-prototype-formattoparts.md) | disallow the `NumberFormat.prototype.formatToParts` method. |  |
| [es-x/no-intl-pluralrules](./no-intl-pluralrules.md) | disallow the `Intl.PluralRules` object. |  |

## ES2017

There are multiple configs that enable all rules in this category: [`no-new-in-es2017`], [`restrict-to-es3`], [`restrict-to-es5`], [`restrict-to-es2015`], and [`restrict-to-es2016`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-async-functions](./no-async-functions.md) | disallow async function declarations. |  |
| [es-x/no-atomics](./no-atomics.md) | disallow the `Atomics` class. |  |
| [es-x/no-object-entries](./no-object-entries.md) | disallow the `Object.entries` method. |  |
| [es-x/no-object-getownpropertydescriptors](./no-object-getownpropertydescriptors.md) | disallow the `Object.getOwnPropertyDescriptors` method. |  |
| [es-x/no-object-values](./no-object-values.md) | disallow the `Object.values` method. |  |
| [es-x/no-shared-array-buffer](./no-shared-array-buffer.md) | disallow the `SharedArrayBuffer` class. |  |
| [es-x/no-string-prototype-padstart-padend](./no-string-prototype-padstart-padend.md) | disallow the `String.prototype.{padStart,padEnd}` methods. |  |
| [es-x/no-trailing-function-commas](./no-trailing-function-commas.md) | disallow trailing commas in parameter/argument lists. | 🔧 |

## ES2017 Intl API

There are multiple configs that enable all rules in this category: [`no-new-in-es2017-intl-api`], [`restrict-to-es-intl-api-1st-edition`], [`restrict-to-es2015-intl-api`], and [`restrict-to-es2016-intl-api`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-intl-datetimeformat-prototype-formattoparts](./no-intl-datetimeformat-prototype-formattoparts.md) | disallow the `DateTimeFormat.prototype.formatToParts` method. |  |

## ES2016

There are multiple configs that enable all rules in this category: [`no-new-in-es2016`], [`restrict-to-es3`], [`restrict-to-es5`], and [`restrict-to-es2015`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-array-prototype-includes](./no-array-prototype-includes.md) | disallow the `Array.prototype.includes` method. |  |
| [es-x/no-exponential-operators](./no-exponential-operators.md) | disallow exponential operators. |  |

## ES2016 Intl API

There are multiple configs that enable all rules in this category: [`no-new-in-es2016-intl-api`], [`restrict-to-es-intl-api-1st-edition`], and [`restrict-to-es2015-intl-api`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-intl-getcanonicallocales](./no-intl-getcanonicallocales.md) | disallow the `Intl.getCanonicalLocales` method. |  |

## ES2015

There are multiple configs that enable all rules in this category: [`no-new-in-es2015`], [`restrict-to-es3`], and [`restrict-to-es5`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-array-from](./no-array-from.md) | disallow the `Array.from` method. |  |
| [es-x/no-array-of](./no-array-of.md) | disallow the `Array.of` method. |  |
| [es-x/no-array-prototype-copywithin](./no-array-prototype-copywithin.md) | disallow the `Array.prototype.copyWithin` method. |  |
| [es-x/no-array-prototype-entries](./no-array-prototype-entries.md) | disallow the `Array.prototype.entries` method. |  |
| [es-x/no-array-prototype-fill](./no-array-prototype-fill.md) | disallow the `Array.prototype.fill` method. |  |
| [es-x/no-array-prototype-find](./no-array-prototype-find.md) | disallow the `Array.prototype.find` method. |  |
| [es-x/no-array-prototype-findindex](./no-array-prototype-findindex.md) | disallow the `Array.prototype.findIndex` method. |  |
| [es-x/no-array-prototype-keys](./no-array-prototype-keys.md) | disallow the `Array.prototype.keys` method. |  |
| [es-x/no-array-prototype-values](./no-array-prototype-values.md) | disallow the `Array.prototype.values` method. |  |
| [es-x/no-arrow-functions](./no-arrow-functions.md) | disallow arrow function expressions. | 🔧 |
| [es-x/no-binary-numeric-literals](./no-binary-numeric-literals.md) | disallow binary numeric literals. |  |
| [es-x/no-block-scoped-functions](./no-block-scoped-functions.md) | disallow block-scoped function declarations. |  |
| [es-x/no-block-scoped-variables](./no-block-scoped-variables.md) | disallow block-scoped variable declarations. |  |
| [es-x/no-classes](./no-classes.md) | disallow class declarations. |  |
| [es-x/no-computed-properties](./no-computed-properties.md) | disallow computed properties. |  |
| [es-x/no-default-parameters](./no-default-parameters.md) | disallow default parameters. |  |
| [es-x/no-destructuring](./no-destructuring.md) | disallow destructuring. |  |
| [es-x/no-for-of-loops](./no-for-of-loops.md) | disallow `for-of` statements. |  |
| [es-x/no-generators](./no-generators.md) | disallow generator function declarations. |  |
| [es-x/no-map](./no-map.md) | disallow the `Map` class. |  |
| [es-x/no-math-acosh](./no-math-acosh.md) | disallow the `Math.acosh` method. |  |
| [es-x/no-math-asinh](./no-math-asinh.md) | disallow the `Math.asinh` method. |  |
| [es-x/no-math-atanh](./no-math-atanh.md) | disallow the `Math.atanh` method. |  |
| [es-x/no-math-cbrt](./no-math-cbrt.md) | disallow the `Math.cbrt` method. |  |
| [es-x/no-math-clz32](./no-math-clz32.md) | disallow the `Math.clz32` method. |  |
| [es-x/no-math-cosh](./no-math-cosh.md) | disallow the `Math.cosh` method. |  |
| [es-x/no-math-expm1](./no-math-expm1.md) | disallow the `Math.expm1` method. |  |
| [es-x/no-math-fround](./no-math-fround.md) | disallow the `Math.fround` method. |  |
| [es-x/no-math-hypot](./no-math-hypot.md) | disallow the `Math.hypot` method. |  |
| [es-x/no-math-imul](./no-math-imul.md) | disallow the `Math.imul` method. |  |
| [es-x/no-math-log10](./no-math-log10.md) | disallow the `Math.log10` method. |  |
| [es-x/no-math-log1p](./no-math-log1p.md) | disallow the `Math.log1p` method. |  |
| [es-x/no-math-log2](./no-math-log2.md) | disallow the `Math.log2` method. |  |
| [es-x/no-math-sign](./no-math-sign.md) | disallow the `Math.sign` method. |  |
| [es-x/no-math-sinh](./no-math-sinh.md) | disallow the `Math.sinh` method. |  |
| [es-x/no-math-tanh](./no-math-tanh.md) | disallow the `Math.tanh` method. |  |
| [es-x/no-math-trunc](./no-math-trunc.md) | disallow the `Math.trunc` method. |  |
| [es-x/no-modules](./no-modules.md) | disallow modules. |  |
| [es-x/no-new-target](./no-new-target.md) | disallow `new.target` meta property. |  |
| [es-x/no-number-epsilon](./no-number-epsilon.md) | disallow the `Number.EPSILON` property. |  |
| [es-x/no-number-isfinite](./no-number-isfinite.md) | disallow the `Number.isFinite` method. |  |
| [es-x/no-number-isinteger](./no-number-isinteger.md) | disallow the `Number.isInteger` method. |  |
| [es-x/no-number-isnan](./no-number-isnan.md) | disallow the `Number.isNaN` method. |  |
| [es-x/no-number-issafeinteger](./no-number-issafeinteger.md) | disallow the `Number.isSafeInteger` method. |  |
| [es-x/no-number-maxsafeinteger](./no-number-maxsafeinteger.md) | disallow the `Number.MAX_SAFE_INTEGER` property. |  |
| [es-x/no-number-minsafeinteger](./no-number-minsafeinteger.md) | disallow the `Number.MIN_SAFE_INTEGER` property. |  |
| [es-x/no-number-parsefloat](./no-number-parsefloat.md) | disallow the `Number.parseFloat` method. |  |
| [es-x/no-number-parseint](./no-number-parseint.md) | disallow the `Number.parseInt` method. |  |
| [es-x/no-object-assign](./no-object-assign.md) | disallow the `Object.assign` method. |  |
| [es-x/no-object-getownpropertysymbols](./no-object-getownpropertysymbols.md) | disallow the `Object.getOwnPropertySymbols` method. |  |
| [es-x/no-object-is](./no-object-is.md) | disallow the `Object.is` method. |  |
| [es-x/no-object-setprototypeof](./no-object-setprototypeof.md) | disallow the `Object.setPrototypeOf` method. |  |
| [es-x/no-object-super-properties](./no-object-super-properties.md) | disallow `super` property accesses in object literals. |  |
| [es-x/no-octal-numeric-literals](./no-octal-numeric-literals.md) | disallow octal numeric literals. |  |
| [es-x/no-promise](./no-promise.md) | disallow the `Promise` class. |  |
| [es-x/no-property-shorthands](./no-property-shorthands.md) | disallow property shorthands. | 🔧 |
| [es-x/no-proxy](./no-proxy.md) | disallow the `Proxy` class. |  |
| [es-x/no-reflect](./no-reflect.md) | disallow the `Reflect` class. |  |
| [es-x/no-regexp-prototype-flags](./no-regexp-prototype-flags.md) | disallow the `RegExp.prototype.flags` property. |  |
| [es-x/no-regexp-u-flag](./no-regexp-u-flag.md) | disallow RegExp `u` flag. |  |
| [es-x/no-regexp-y-flag](./no-regexp-y-flag.md) | disallow RegExp `y` flag. |  |
| [es-x/no-rest-parameters](./no-rest-parameters.md) | disallow rest parameters. |  |
| [es-x/no-set](./no-set.md) | disallow the `Set` class. |  |
| [es-x/no-spread-elements](./no-spread-elements.md) | disallow spread elements. |  |
| [es-x/no-string-fromcodepoint](./no-string-fromcodepoint.md) | disallow the `String.fromCodePoint` method. |  |
| [es-x/no-string-prototype-codepointat](./no-string-prototype-codepointat.md) | disallow the `String.prototype.codePointAt` method. |  |
| [es-x/no-string-prototype-endswith](./no-string-prototype-endswith.md) | disallow the `String.prototype.endsWith` method. |  |
| [es-x/no-string-prototype-includes](./no-string-prototype-includes.md) | disallow the `String.prototype.includes` method. |  |
| [es-x/no-string-prototype-normalize](./no-string-prototype-normalize.md) | disallow the `String.prototype.normalize` method. |  |
| [es-x/no-string-prototype-repeat](./no-string-prototype-repeat.md) | disallow the `String.prototype.repeat` method. |  |
| [es-x/no-string-prototype-startswith](./no-string-prototype-startswith.md) | disallow the `String.prototype.startsWith` method. |  |
| [es-x/no-string-raw](./no-string-raw.md) | disallow the `String.raw` method. |  |
| [es-x/no-subclassing-builtins](./no-subclassing-builtins.md) | disallow the subclassing of the built-in classes. |  |
| [es-x/no-symbol](./no-symbol.md) | disallow the `Symbol` class. |  |
| [es-x/no-template-literals](./no-template-literals.md) | disallow template literals. | 🔧 |
| [es-x/no-typed-arrays](./no-typed-arrays.md) | disallow ES2015 typed arrays. |  |
| [es-x/no-unicode-codepoint-escapes](./no-unicode-codepoint-escapes.md) | disallow Unicode code point escape sequences. | 🔧 |
| [es-x/no-weak-map](./no-weak-map.md) | disallow the `WeakMap` class. |  |
| [es-x/no-weak-set](./no-weak-set.md) | disallow the `WeakSet` class. |  |

## ES5

There are multiple configs that enable all rules in this category: [`no-new-in-es5`] and [`restrict-to-es3`]

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-accessor-properties](./no-accessor-properties.md) | disallow accessor properties. |  |
| [es-x/no-array-isarray](./no-array-isarray.md) | disallow the `Array.isArray` method. |  |
| [es-x/no-array-prototype-every](./no-array-prototype-every.md) | disallow the `Array.prototype.every` method. |  |
| [es-x/no-array-prototype-filter](./no-array-prototype-filter.md) | disallow the `Array.prototype.filter` method. |  |
| [es-x/no-array-prototype-foreach](./no-array-prototype-foreach.md) | disallow the `Array.prototype.forEach` method. |  |
| [es-x/no-array-prototype-indexof](./no-array-prototype-indexof.md) | disallow the `Array.prototype.indexOf` method. |  |
| [es-x/no-array-prototype-lastindexof](./no-array-prototype-lastindexof.md) | disallow the `Array.prototype.lastIndexOf` method. |  |
| [es-x/no-array-prototype-map](./no-array-prototype-map.md) | disallow the `Array.prototype.map` method. |  |
| [es-x/no-array-prototype-reduce](./no-array-prototype-reduce.md) | disallow the `Array.prototype.reduce` method. |  |
| [es-x/no-array-prototype-reduceright](./no-array-prototype-reduceright.md) | disallow the `Array.prototype.reduceRight` method. |  |
| [es-x/no-array-prototype-some](./no-array-prototype-some.md) | disallow the `Array.prototype.some` method. |  |
| [es-x/no-date-now](./no-date-now.md) | disallow the `Date.now` method. |  |
| [es-x/no-function-prototype-bind](./no-function-prototype-bind.md) | disallow the `Function.prototype.bind` method. |  |
| [es-x/no-json](./no-json.md) | disallow the `JSON` class. |  |
| [es-x/no-keyword-properties](./no-keyword-properties.md) | disallow reserved words as property names. |  |
| [es-x/no-object-create](./no-object-create.md) | disallow the `Object.create` method. |  |
| [es-x/no-object-defineproperties](./no-object-defineproperties.md) | disallow the `Object.defineProperties` method. |  |
| [es-x/no-object-defineproperty](./no-object-defineproperty.md) | disallow the `Object.defineProperty` method. |  |
| [es-x/no-object-freeze](./no-object-freeze.md) | disallow the `Object.freeze` method. |  |
| [es-x/no-object-getownpropertydescriptor](./no-object-getownpropertydescriptor.md) | disallow the `Object.getOwnPropertyDescriptor` method. |  |
| [es-x/no-object-getownpropertynames](./no-object-getownpropertynames.md) | disallow the `Object.getOwnPropertyNames` method. |  |
| [es-x/no-object-getprototypeof](./no-object-getprototypeof.md) | disallow the `Object.getPrototypeOf` method. |  |
| [es-x/no-object-isextensible](./no-object-isextensible.md) | disallow the `Object.isExtensible` method. |  |
| [es-x/no-object-isfrozen](./no-object-isfrozen.md) | disallow the `Object.isFrozen` method. |  |
| [es-x/no-object-issealed](./no-object-issealed.md) | disallow the `Object.isSealed` method. |  |
| [es-x/no-object-keys](./no-object-keys.md) | disallow the `Object.keys` method. |  |
| [es-x/no-object-preventextensions](./no-object-preventextensions.md) | disallow the `Object.preventExtensions` method. |  |
| [es-x/no-object-seal](./no-object-seal.md) | disallow the `Object.seal` method. |  |
| [es-x/no-string-prototype-trim](./no-string-prototype-trim.md) | disallow the `String.prototype.trim` method. |  |
| [es-x/no-trailing-commas](./no-trailing-commas.md) | disallow trailing commas in array/object literals. |  |

## Legacy

Rules in this category disallow the syntax contained in [Annex B](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html) or Legacy.\
Rules in this category are not included in any preset.

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-date-prototype-getyear-setyear](./no-date-prototype-getyear-setyear.md) | disallow the `Date.prototype.{getYear,setYear}` methods. |  |
| [es-x/no-date-prototype-togmtstring](./no-date-prototype-togmtstring.md) | disallow the `Date.prototype.toGMTString` method. | 🔧 |
| [es-x/no-escape-unescape](./no-escape-unescape.md) | disallow `escape` and `unescape`. |  |
| [es-x/no-function-declarations-in-if-statement-clauses-without-block](./no-function-declarations-in-if-statement-clauses-without-block.md) | disallow function declarations in if statement clauses without using blocks. | 🔧 |
| [es-x/no-initializers-in-for-in](./no-initializers-in-for-in.md) | disallow initializers in for-in heads. |  |
| [es-x/no-labelled-function-declarations](./no-labelled-function-declarations.md) | disallow labelled function declarations. |  |
| [es-x/no-legacy-object-prototype-accessor-methods](./no-legacy-object-prototype-accessor-methods.md) | disallow legacy `Object.prototype` accessor methods. |  |
| [es-x/no-regexp-prototype-compile](./no-regexp-prototype-compile.md) | disallow the `RegExp.prototype.compile` method. |  |
| [es-x/no-shadow-catch-param](./no-shadow-catch-param.md) | disallow identifiers from shadowing catch parameter names. |  |
| [es-x/no-string-create-html-methods](./no-string-create-html-methods.md) | disallow HTML creation methods of string instances. |  |
| [es-x/no-string-prototype-substr](./no-string-prototype-substr.md) | disallow the `String.prototype.substr` method. |  |
| [es-x/no-string-prototype-trimleft-trimright](./no-string-prototype-trimleft-trimright.md) | disallow the `String.prototype.{trimLeft,trimRight}` methods. | 🔧 |

## Non-standards

Rules in this category disallow features that are not defined in ECMAScript.\
Rules in this category are not included in any preset.

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es-x/no-nonstandard-array-properties](./no-nonstandard-array-properties.md) | disallow non-standard static properties on `Array` class. |  |
| [es-x/no-nonstandard-array-prototype-properties](./no-nonstandard-array-prototype-properties.md) | disallow non-standard properties on Array instance. |  |
| [es-x/no-nonstandard-arraybuffer-properties](./no-nonstandard-arraybuffer-properties.md) | disallow non-standard static properties on `ArrayBuffer` class. |  |
| [es-x/no-nonstandard-arraybuffer-prototype-properties](./no-nonstandard-arraybuffer-prototype-properties.md) | disallow non-standard properties on ArrayBuffer instance. |  |
| [es-x/no-nonstandard-atomics-properties](./no-nonstandard-atomics-properties.md) | disallow non-standard static properties on `Atomics`. |  |
| [es-x/no-nonstandard-bigint-properties](./no-nonstandard-bigint-properties.md) | disallow non-standard static properties on `BigInt` class. |  |
| [es-x/no-nonstandard-bigint-prototype-properties](./no-nonstandard-bigint-prototype-properties.md) | disallow non-standard properties on BigInt instance. |  |
| [es-x/no-nonstandard-boolean-properties](./no-nonstandard-boolean-properties.md) | disallow non-standard static properties on `Boolean` class. |  |
| [es-x/no-nonstandard-boolean-prototype-properties](./no-nonstandard-boolean-prototype-properties.md) | disallow non-standard properties on Boolean instance. |  |
| [es-x/no-nonstandard-dataview-properties](./no-nonstandard-dataview-properties.md) | disallow non-standard static properties on `DataView` class. |  |
| [es-x/no-nonstandard-dataview-prototype-properties](./no-nonstandard-dataview-prototype-properties.md) | disallow non-standard properties on DataView instance. |  |
| [es-x/no-nonstandard-date-properties](./no-nonstandard-date-properties.md) | disallow non-standard static properties on `Date` class. |  |
| [es-x/no-nonstandard-date-prototype-properties](./no-nonstandard-date-prototype-properties.md) | disallow non-standard properties on Date instance. |  |
| [es-x/no-nonstandard-finalizationregistry-properties](./no-nonstandard-finalizationregistry-properties.md) | disallow non-standard static properties on `FinalizationRegistry` class. |  |
| [es-x/no-nonstandard-finalizationregistry-prototype-properties](./no-nonstandard-finalizationregistry-prototype-properties.md) | disallow non-standard properties on FinalizationRegistry instance. |  |
| [es-x/no-nonstandard-function-properties](./no-nonstandard-function-properties.md) | disallow non-standard static properties on `Function` class. |  |
| [es-x/no-nonstandard-intl-collator-properties](./no-nonstandard-intl-collator-properties.md) | disallow non-standard static properties on `Intl.Collator` class. |  |
| [es-x/no-nonstandard-intl-collator-prototype-properties](./no-nonstandard-intl-collator-prototype-properties.md) | disallow non-standard properties on Intl.Collator instance. |  |
| [es-x/no-nonstandard-intl-datetimeformat-properties](./no-nonstandard-intl-datetimeformat-properties.md) | disallow non-standard static properties on `Intl.DateTimeFormat` class. |  |
| [es-x/no-nonstandard-intl-datetimeformat-prototype-properties](./no-nonstandard-intl-datetimeformat-prototype-properties.md) | disallow non-standard properties on Intl.DateTimeFormat instance. |  |
| [es-x/no-nonstandard-intl-displaynames-properties](./no-nonstandard-intl-displaynames-properties.md) | disallow non-standard static properties on `Intl.DisplayNames` class. |  |
| [es-x/no-nonstandard-intl-displaynames-prototype-properties](./no-nonstandard-intl-displaynames-prototype-properties.md) | disallow non-standard properties on Intl.DisplayNames instance. |  |
| [es-x/no-nonstandard-intl-durationformat-properties](./no-nonstandard-intl-durationformat-properties.md) | disallow non-standard static properties on `Intl.DurationFormat` class. |  |
| [es-x/no-nonstandard-intl-durationformat-prototype-properties](./no-nonstandard-intl-durationformat-prototype-properties.md) | disallow non-standard properties on Intl.DurationFormat instance. |  |
| [es-x/no-nonstandard-intl-listformat-properties](./no-nonstandard-intl-listformat-properties.md) | disallow non-standard static properties on `Intl.ListFormat` class. |  |
| [es-x/no-nonstandard-intl-listformat-prototype-properties](./no-nonstandard-intl-listformat-prototype-properties.md) | disallow non-standard properties on Intl.ListFormat instance. |  |
| [es-x/no-nonstandard-intl-locale-properties](./no-nonstandard-intl-locale-properties.md) | disallow non-standard static properties on `Intl.Locale` class. |  |
| [es-x/no-nonstandard-intl-locale-prototype-properties](./no-nonstandard-intl-locale-prototype-properties.md) | disallow non-standard properties on Intl.Locale instance. |  |
| [es-x/no-nonstandard-intl-numberformat-properties](./no-nonstandard-intl-numberformat-properties.md) | disallow non-standard static properties on `Intl.NumberFormat` class. |  |
| [es-x/no-nonstandard-intl-numberformat-prototype-properties](./no-nonstandard-intl-numberformat-prototype-properties.md) | disallow non-standard properties on Intl.NumberFormat instance. |  |
| [es-x/no-nonstandard-intl-pluralrules-properties](./no-nonstandard-intl-pluralrules-properties.md) | disallow non-standard static properties on `Intl.PluralRules` class. |  |
| [es-x/no-nonstandard-intl-pluralrules-prototype-properties](./no-nonstandard-intl-pluralrules-prototype-properties.md) | disallow non-standard properties on Intl.PluralRules instance. |  |
| [es-x/no-nonstandard-intl-properties](./no-nonstandard-intl-properties.md) | disallow non-standard static properties on `Intl`. |  |
| [es-x/no-nonstandard-intl-relativetimeformat-properties](./no-nonstandard-intl-relativetimeformat-properties.md) | disallow non-standard static properties on `Intl.RelativeTimeFormat` class. |  |
| [es-x/no-nonstandard-intl-relativetimeformat-prototype-properties](./no-nonstandard-intl-relativetimeformat-prototype-properties.md) | disallow non-standard properties on Intl.RelativeTimeFormat instance. |  |
| [es-x/no-nonstandard-intl-segmenter-properties](./no-nonstandard-intl-segmenter-properties.md) | disallow non-standard static properties on `Intl.Segmenter` class. |  |
| [es-x/no-nonstandard-intl-segmenter-prototype-properties](./no-nonstandard-intl-segmenter-prototype-properties.md) | disallow non-standard properties on Intl.Segmenter instance. |  |
| [es-x/no-nonstandard-iterator-properties](./no-nonstandard-iterator-properties.md) | disallow non-standard static properties on `Iterator` class. |  |
| [es-x/no-nonstandard-iterator-prototype-properties](./no-nonstandard-iterator-prototype-properties.md) | disallow non-standard properties on Iterator instance. |  |
| [es-x/no-nonstandard-json-properties](./no-nonstandard-json-properties.md) | disallow non-standard static properties on `JSON`. |  |
| [es-x/no-nonstandard-map-properties](./no-nonstandard-map-properties.md) | disallow non-standard static properties on `Map` class. |  |
| [es-x/no-nonstandard-map-prototype-properties](./no-nonstandard-map-prototype-properties.md) | disallow non-standard properties on Map instance. |  |
| [es-x/no-nonstandard-math-properties](./no-nonstandard-math-properties.md) | disallow non-standard static properties on `Math`. |  |
| [es-x/no-nonstandard-number-properties](./no-nonstandard-number-properties.md) | disallow non-standard static properties on `Number` class. |  |
| [es-x/no-nonstandard-number-prototype-properties](./no-nonstandard-number-prototype-properties.md) | disallow non-standard properties on Number instance. |  |
| [es-x/no-nonstandard-object-properties](./no-nonstandard-object-properties.md) | disallow non-standard static properties on `Object` class. |  |
| [es-x/no-nonstandard-promise-properties](./no-nonstandard-promise-properties.md) | disallow non-standard static properties on `Promise` class. |  |
| [es-x/no-nonstandard-promise-prototype-properties](./no-nonstandard-promise-prototype-properties.md) | disallow non-standard properties on Promise instance. |  |
| [es-x/no-nonstandard-proxy-properties](./no-nonstandard-proxy-properties.md) | disallow non-standard static properties on `Proxy` class. |  |
| [es-x/no-nonstandard-reflect-properties](./no-nonstandard-reflect-properties.md) | disallow non-standard static properties on `Reflect`. |  |
| [es-x/no-nonstandard-regexp-properties](./no-nonstandard-regexp-properties.md) | disallow non-standard static properties on `RegExp` class. |  |
| [es-x/no-nonstandard-regexp-prototype-properties](./no-nonstandard-regexp-prototype-properties.md) | disallow non-standard properties on RegExp instance. |  |
| [es-x/no-nonstandard-set-properties](./no-nonstandard-set-properties.md) | disallow non-standard static properties on `Set` class. |  |
| [es-x/no-nonstandard-set-prototype-properties](./no-nonstandard-set-prototype-properties.md) | disallow non-standard properties on Set instance. |  |
| [es-x/no-nonstandard-sharedarraybuffer-properties](./no-nonstandard-sharedarraybuffer-properties.md) | disallow non-standard static properties on `SharedArrayBuffer` class. |  |
| [es-x/no-nonstandard-sharedarraybuffer-prototype-properties](./no-nonstandard-sharedarraybuffer-prototype-properties.md) | disallow non-standard properties on SharedArrayBuffer instance. |  |
| [es-x/no-nonstandard-string-properties](./no-nonstandard-string-properties.md) | disallow non-standard static properties on `String` class. |  |
| [es-x/no-nonstandard-string-prototype-properties](./no-nonstandard-string-prototype-properties.md) | disallow non-standard properties on String instance. |  |
| [es-x/no-nonstandard-symbol-properties](./no-nonstandard-symbol-properties.md) | disallow non-standard static properties on `Symbol` class. |  |
| [es-x/no-nonstandard-symbol-prototype-properties](./no-nonstandard-symbol-prototype-properties.md) | disallow non-standard properties on Symbol instance. |  |
| [es-x/no-nonstandard-typed-array-properties](./no-nonstandard-typed-array-properties.md) | disallow non-standard static properties on typed array class. |  |
| [es-x/no-nonstandard-typed-array-prototype-properties](./no-nonstandard-typed-array-prototype-properties.md) | disallow non-standard properties on typed array instance. |  |
| [es-x/no-nonstandard-weakmap-properties](./no-nonstandard-weakmap-properties.md) | disallow non-standard static properties on `WeakMap` class. |  |
| [es-x/no-nonstandard-weakmap-prototype-properties](./no-nonstandard-weakmap-prototype-properties.md) | disallow non-standard properties on WeakMap instance. |  |
| [es-x/no-nonstandard-weakref-properties](./no-nonstandard-weakref-properties.md) | disallow non-standard static properties on `WeakRef` class. |  |
| [es-x/no-nonstandard-weakref-prototype-properties](./no-nonstandard-weakref-prototype-properties.md) | disallow non-standard properties on WeakRef instance. |  |
| [es-x/no-nonstandard-weakset-properties](./no-nonstandard-weakset-properties.md) | disallow non-standard static properties on `WeakSet` class. |  |
| [es-x/no-nonstandard-weakset-prototype-properties](./no-nonstandard-weakset-prototype-properties.md) | disallow non-standard properties on WeakSet instance. |  |

## Deprecated

😇 We don't fix bugs which are in deprecated rules since we don't have enough resources.

| Rule ID | Replaced By |
|:--------|:------------:|
| [es-x/no-array-string-prototype-at](./no-array-string-prototype-at.md) | [es-x/no-array-prototype-at](./no-array-prototype-at.md), [es-x/no-string-prototype-at](./no-string-prototype-at.md) |
| [es-x/no-class-fields](./no-class-fields.md) | [es-x/no-class-instance-fields](./no-class-instance-fields.md), [es-x/no-class-private-fields](./no-class-private-fields.md), [es-x/no-class-private-methods](./no-class-private-methods.md), [es-x/no-class-static-fields](./no-class-static-fields.md) |
| [es-x/no-object-map-groupby](./no-object-map-groupby.md) | [es-x/no-object-groupby](./no-object-groupby.md), [es-x/no-map-groupby](./no-map-groupby.md) |
| [es-x/no-string-prototype-iswellformed-towellformed](./no-string-prototype-iswellformed-towellformed.md) | [es-x/no-string-prototype-iswellformed](./no-string-prototype-iswellformed.md), [es-x/no-string-prototype-towellformed](./no-string-prototype-towellformed.md) |

[`no-new-in-esnext`]: ../configs/index.md#no-new-in-esnext
[`no-new-in-esnext-intl-api`]: ../configs/index.md#no-new-in-esnext-intl-api
[`no-new-in-es2024`]: ../configs/index.md#no-new-in-es2024
[`restrict-to-es2023`]: ../configs/index.md#restrict-to-es2023
[`restrict-to-es2023-intl-api`]: ../configs/index.md#restrict-to-es2023-intl-api
[`no-new-in-es2023`]: ../configs/index.md#no-new-in-es2023
[`restrict-to-es2022`]: ../configs/index.md#restrict-to-es2022
[`no-new-in-es2023-intl-api`]: ../configs/index.md#no-new-in-es2023-intl-api
[`restrict-to-es2022-intl-api`]: ../configs/index.md#restrict-to-es2022-intl-api
[`no-new-in-es2022`]: ../configs/index.md#no-new-in-es2022
[`restrict-to-es2021`]: ../configs/index.md#restrict-to-es2021
[`no-new-in-es2022-intl-api`]: ../configs/index.md#no-new-in-es2022-intl-api
[`restrict-to-es2021-intl-api`]: ../configs/index.md#restrict-to-es2021-intl-api
[`no-new-in-es2021`]: ../configs/index.md#no-new-in-es2021
[`restrict-to-es2020`]: ../configs/index.md#restrict-to-es2020
[`no-new-in-es2021-intl-api`]: ../configs/index.md#no-new-in-es2021-intl-api
[`restrict-to-es2020-intl-api`]: ../configs/index.md#restrict-to-es2020-intl-api
[`no-new-in-es2020`]: ../configs/index.md#no-new-in-es2020
[`restrict-to-es2019`]: ../configs/index.md#restrict-to-es2019
[`no-new-in-es2020-intl-api`]: ../configs/index.md#no-new-in-es2020-intl-api
[`restrict-to-es2019-intl-api`]: ../configs/index.md#restrict-to-es2019-intl-api
[`no-new-in-es2019`]: ../configs/index.md#no-new-in-es2019
[`restrict-to-es2018`]: ../configs/index.md#restrict-to-es2018
[`restrict-to-es2018-intl-api`]: ../configs/index.md#restrict-to-es2018-intl-api
[`no-new-in-es2018`]: ../configs/index.md#no-new-in-es2018
[`restrict-to-es2017`]: ../configs/index.md#restrict-to-es2017
[`no-new-in-es2018-intl-api`]: ../configs/index.md#no-new-in-es2018-intl-api
[`restrict-to-es2017-intl-api`]: ../configs/index.md#restrict-to-es2017-intl-api
[`no-new-in-es2017`]: ../configs/index.md#no-new-in-es2017
[`restrict-to-es2016`]: ../configs/index.md#restrict-to-es2016
[`no-new-in-es2017-intl-api`]: ../configs/index.md#no-new-in-es2017-intl-api
[`restrict-to-es2016-intl-api`]: ../configs/index.md#restrict-to-es2016-intl-api
[`no-new-in-es2016`]: ../configs/index.md#no-new-in-es2016
[`restrict-to-es2015`]: ../configs/index.md#restrict-to-es2015
[`no-new-in-es2016-intl-api`]: ../configs/index.md#no-new-in-es2016-intl-api
[`restrict-to-es2015-intl-api`]: ../configs/index.md#restrict-to-es2015-intl-api
[`no-new-in-es2015`]: ../configs/index.md#no-new-in-es2015
[`restrict-to-es5`]: ../configs/index.md#restrict-to-es5
[`restrict-to-es-intl-api-1st-edition`]: ../configs/index.md#restrict-to-es-intl-api-1st-edition
[`no-new-in-es5`]: ../configs/index.md#no-new-in-es5
[`restrict-to-es3`]: ../configs/index.md#restrict-to-es3
