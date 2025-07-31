"use strict"

const assert = require("assert")

const wellKnownProperties = require("../../../lib/util/well-known-properties")

describe("well-known-properties", () => {
    it("should have Object static properties", () => {
        for (const element of getAllProperties(Object)) {
            assert.ok(
                wellKnownProperties.objectProperties.has(element),
                `Object.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Object instance properties", () => {
        for (const element of getAllProperties({})) {
            assert.ok(
                wellKnownProperties.objectPrototypeProperties.has(element),
                `Object.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Function static properties", () => {
        for (const element of getAllProperties(Function)) {
            assert.ok(
                wellKnownProperties.functionProperties.has(element),
                `Function.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Function instance properties", () => {
        for (const element of getAllProperties(() => 0)) {
            assert.ok(
                wellKnownProperties.functionPrototypeProperties.has(element),
                `Function.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Boolean static properties", () => {
        for (const element of getAllProperties(Boolean)) {
            assert.ok(
                wellKnownProperties.booleanProperties.has(element),
                `Boolean.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Boolean instance properties", () => {
        for (const element of getAllProperties(true)) {
            assert.ok(
                wellKnownProperties.booleanPrototypeProperties.has(element),
                `Boolean.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Symbol static properties", () => {
        for (const element of getAllProperties(Symbol)) {
            assert.ok(
                wellKnownProperties.symbolProperties.has(element),
                `Symbol.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Symbol instance properties", () => {
        for (const element of getAllProperties(Symbol("test"))) {
            assert.ok(
                wellKnownProperties.symbolPrototypeProperties.has(element),
                `Symbol.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Error static properties", () => {
        for (const element of getAllProperties(Error)) {
            assert.ok(
                wellKnownProperties.errorProperties.has(element),
                `Error.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Error instance properties", () => {
        for (const element of getAllProperties(new Error())) {
            assert.ok(
                wellKnownProperties.errorPrototypeProperties.has(element),
                `Error.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Number static properties", () => {
        for (const element of getAllProperties(Number)) {
            assert.ok(
                wellKnownProperties.numberProperties.has(element),
                `Number.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Number instance properties", () => {
        for (const element of getAllProperties(0)) {
            assert.ok(
                wellKnownProperties.numberPrototypeProperties.has(element),
                `Number.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have BigInt static properties", () => {
        for (const element of getAllProperties(BigInt)) {
            assert.ok(
                wellKnownProperties.bigintProperties.has(element),
                `BigInt.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have BigInt instance properties", () => {
        for (const element of getAllProperties(0n)) {
            assert.ok(
                wellKnownProperties.bigintPrototypeProperties.has(element),
                `BigInt.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Math static properties", () => {
        for (const element of getAllProperties(Math)) {
            assert.ok(
                wellKnownProperties.mathProperties.has(element),
                `Math.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Date static properties", () => {
        for (const element of getAllProperties(Date)) {
            assert.ok(
                wellKnownProperties.dateProperties.has(element),
                `Date.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Date instance properties", () => {
        for (const element of getAllProperties(new Date())) {
            assert.ok(
                wellKnownProperties.datePrototypeProperties.has(element),
                `Date.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have String static properties", () => {
        for (const element of getAllProperties(String)) {
            assert.ok(
                wellKnownProperties.stringProperties.has(element),
                `String.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have String instance properties", () => {
        for (const element of getAllProperties("")) {
            assert.ok(
                wellKnownProperties.stringPrototypeProperties.has(element),
                `String.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have RegExp static properties", () => {
        for (const element of getAllProperties(RegExp)) {
            assert.ok(
                wellKnownProperties.regexpProperties.has(element),
                `RegExp.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have RegExp instance properties", () => {
        for (const element of getAllProperties(/test/u)) {
            assert.ok(
                wellKnownProperties.regexpPrototypeProperties.has(element),
                `RegExp.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Array static properties", () => {
        for (const element of getAllProperties(Array)) {
            assert.ok(
                wellKnownProperties.arrayProperties.has(element),
                `Array.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Array instance properties", () => {
        for (const element of getAllProperties([])) {
            assert.ok(
                wellKnownProperties.arrayPrototypeProperties.has(element),
                `Array.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have TypedArray static properties", () => {
        for (const element of getAllProperties(Int8Array)) {
            assert.ok(
                wellKnownProperties.typedArrayProperties.has(element),
                `TypedArray.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have TypedArray instance properties", () => {
        for (const element of getAllProperties(new Int8Array())) {
            assert.ok(
                wellKnownProperties.typedArrayPrototypeProperties.has(element),
                `TypedArray.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Map static properties", () => {
        for (const element of getAllProperties(Map)) {
            assert.ok(
                wellKnownProperties.mapProperties.has(element),
                `Map.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Map instance properties", () => {
        for (const element of getAllProperties(new Map())) {
            assert.ok(
                wellKnownProperties.mapPrototypeProperties.has(element),
                `Map.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Set static properties", () => {
        for (const element of getAllProperties(Set)) {
            assert.ok(
                wellKnownProperties.setProperties.has(element),
                `Set.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Set instance properties", () => {
        for (const element of getAllProperties(new Set())) {
            assert.ok(
                wellKnownProperties.setPrototypeProperties.has(element),
                `Set.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have WeakMap static properties", () => {
        for (const element of getAllProperties(WeakMap)) {
            assert.ok(
                wellKnownProperties.weakMapProperties.has(element),
                `WeakMap.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have WeakMap instance properties", () => {
        for (const element of getAllProperties(new WeakMap())) {
            assert.ok(
                wellKnownProperties.weakMapPrototypeProperties.has(element),
                `WeakMap.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have WeakSet static properties", () => {
        for (const element of getAllProperties(WeakSet)) {
            assert.ok(
                wellKnownProperties.weakSetProperties.has(element),
                `WeakSet.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have WeakSet instance properties", () => {
        for (const element of getAllProperties(new WeakSet())) {
            assert.ok(
                wellKnownProperties.weakSetPrototypeProperties.has(element),
                `WeakSet.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have ArrayBuffer static properties", () => {
        for (const element of getAllProperties(ArrayBuffer)) {
            assert.ok(
                wellKnownProperties.arrayBufferProperties.has(element),
                `ArrayBuffer.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have ArrayBuffer instance properties", () => {
        for (const element of getAllProperties(new ArrayBuffer())) {
            assert.ok(
                wellKnownProperties.arrayBufferPrototypeProperties.has(element),
                `ArrayBuffer.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have SharedArrayBuffer static properties", () => {
        for (const element of getAllProperties(SharedArrayBuffer)) {
            assert.ok(
                wellKnownProperties.sharedArrayBufferProperties.has(element),
                `SharedArrayBuffer.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have SharedArrayBuffer instance properties", () => {
        for (const element of getAllProperties(new SharedArrayBuffer())) {
            assert.ok(
                wellKnownProperties.sharedArrayBufferPrototypeProperties.has(
                    element,
                ),
                `SharedArrayBuffer.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have DataView static properties", () => {
        for (const element of getAllProperties(DataView)) {
            assert.ok(
                wellKnownProperties.dataViewProperties.has(element),
                `DataView.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have DataView instance properties", () => {
        for (const element of getAllProperties(
            new DataView(new ArrayBuffer()),
        )) {
            assert.ok(
                wellKnownProperties.dataViewPrototypeProperties.has(element),
                `DataView.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Atomics static properties", () => {
        for (const element of getAllProperties(Atomics)) {
            assert.ok(
                wellKnownProperties.atomicsProperties.has(element),
                `Atomics.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have JSON static properties", () => {
        for (const element of getAllProperties(JSON)) {
            assert.ok(
                wellKnownProperties.jsonProperties.has(element),
                `JSON.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have WeakRef static properties", () => {
        for (const element of getAllProperties(WeakRef)) {
            assert.ok(
                wellKnownProperties.weakRefProperties.has(element),
                `WeakRef.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have WeakRef instance properties", () => {
        for (const element of getAllProperties(new WeakRef({}))) {
            assert.ok(
                wellKnownProperties.weakRefPrototypeProperties.has(element),
                `WeakRef.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have FinalizationRegistry static properties", () => {
        for (const element of getAllProperties(FinalizationRegistry)) {
            assert.ok(
                wellKnownProperties.finalizationRegistryProperties.has(element),
                `FinalizationRegistry.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have FinalizationRegistry instance properties", () => {
        for (const element of getAllProperties(
            new FinalizationRegistry(() => 0),
        )) {
            assert.ok(
                wellKnownProperties.finalizationRegistryPrototypeProperties.has(
                    element,
                ),
                `FinalizationRegistry.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    if (globalThis.Iterator) {
        it("should have Iterator static properties", () => {
            for (const element of getAllProperties(Iterator)) {
                assert.ok(
                    wellKnownProperties.iteratorProperties.has(element),
                    `Iterator.${String(element)} should be a well-known property`,
                )
            }
        })
    }
    it("should have Iterator instance properties", () => {
        for (const element of getAllProperties(
            Object.getPrototypeOf([].values()),
        )) {
            assert.ok(
                wellKnownProperties.iteratorPrototypeProperties.has(element),
                `Iterator.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    if (globalThis.DisposableStack) {
        it("should have DisposableStack static properties", () => {
            for (const element of getAllProperties(DisposableStack)) {
                assert.ok(
                    wellKnownProperties.disposableStackProperties.has(element),
                    `DisposableStack.${String(element)} should be a well-known property`,
                )
            }
        })
        it("should have DisposableStack instance properties", () => {
            for (const element of getAllProperties(new DisposableStack())) {
                assert.ok(
                    wellKnownProperties.disposableStackPrototypeProperties.has(
                        element,
                    ),
                    `DisposableStack.prototype.${String(element)} should be a well-known property`,
                )
            }
        })
    }
    if (globalThis.AsyncDisposableStack) {
        it("should have AsyncDisposableStack static properties", () => {
            for (const element of getAllProperties(AsyncDisposableStack)) {
                assert.ok(
                    wellKnownProperties.asyncDisposableStackProperties.has(
                        element,
                    ),
                    `AsyncDisposableStack.${String(element)} should be a well-known property`,
                )
            }
        })
        it("should have AsyncDisposableStack instance properties", () => {
            for (const element of getAllProperties(
                new AsyncDisposableStack(),
            )) {
                assert.ok(
                    wellKnownProperties.asyncDisposableStackPrototypeProperties.has(
                        element,
                    ),
                    `AsyncDisposableStack.prototype.${String(element)} should be a well-known property`,
                )
            }
        })
    }
    it("should have Promise static properties", () => {
        for (const element of getAllProperties(Promise)) {
            assert.ok(
                wellKnownProperties.promiseProperties.has(element),
                `Promise.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Promise instance properties", () => {
        for (const element of getAllProperties(new Promise(() => 0))) {
            assert.ok(
                wellKnownProperties.promisePrototypeProperties.has(element),
                `Promise.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Reflect static properties", () => {
        for (const element of getAllProperties(Reflect)) {
            assert.ok(
                wellKnownProperties.reflectProperties.has(element),
                `Reflect.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Proxy static properties", () => {
        for (const element of getAllProperties(Proxy)) {
            assert.ok(
                wellKnownProperties.proxyProperties.has(element),
                `Proxy.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl static properties", () => {
        for (const element of getAllProperties(Intl)) {
            assert.ok(
                wellKnownProperties.intlProperties.has(element),
                `Intl.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.Collator static properties", () => {
        for (const element of getAllProperties(Intl.Collator)) {
            assert.ok(
                wellKnownProperties.intlCollatorProperties.has(element),
                `Intl.Collator.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.Collator instance properties", () => {
        for (const element of getAllProperties(new Intl.Collator())) {
            assert.ok(
                wellKnownProperties.intlCollatorPrototypeProperties.has(
                    element,
                ),
                `Intl.Collator.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.DateTimeFormat static properties", () => {
        for (const element of getAllProperties(Intl.DateTimeFormat)) {
            assert.ok(
                wellKnownProperties.intlDateTimeFormatProperties.has(element),
                `Intl.DateTimeFormat.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.DateTimeFormat instance properties", () => {
        for (const element of getAllProperties(new Intl.DateTimeFormat())) {
            assert.ok(
                wellKnownProperties.intlDateTimeFormatPrototypeProperties.has(
                    element,
                ),
                `Intl.DateTimeFormat.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.DisplayNames static properties", () => {
        for (const element of getAllProperties(Intl.DisplayNames)) {
            assert.ok(
                wellKnownProperties.intlDisplayNamesProperties.has(element),
                `Intl.DisplayNames.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.DisplayNames instance properties", () => {
        for (const element of getAllProperties(
            new Intl.DisplayNames(["en"], {
                type: "language",
            }),
        )) {
            assert.ok(
                wellKnownProperties.intlDisplayNamesPrototypeProperties.has(
                    element,
                ),
                `Intl.DisplayNames.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    if (Intl.DurationFormat) {
        it("should have Intl.DurationFormat static properties", () => {
            for (const element of getAllProperties(Intl.DurationFormat)) {
                assert.ok(
                    wellKnownProperties.intlDurationFormatProperties.has(
                        element,
                    ),
                    `Intl.DurationFormat.${String(element)} should be a well-known property`,
                )
            }
        })
        it("should have Intl.DurationFormat instance properties", () => {
            for (const element of getAllProperties(new Intl.DurationFormat())) {
                assert.ok(
                    wellKnownProperties.intlDurationFormatPrototypeProperties.has(
                        element,
                    ),
                    `Intl.DurationFormat.prototype.${String(element)} should be a well-known property`,
                )
            }
        })
    }
    it("should have Intl.ListFormat static properties", () => {
        for (const element of getAllProperties(Intl.ListFormat)) {
            assert.ok(
                wellKnownProperties.intlListFormatProperties.has(element),
                `Intl.ListFormat.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.ListFormat instance properties", () => {
        for (const element of getAllProperties(new Intl.ListFormat())) {
            assert.ok(
                wellKnownProperties.intlListFormatPrototypeProperties.has(
                    element,
                ),
                `Intl.ListFormat.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.Locale static properties", () => {
        for (const element of getAllProperties(Intl.Locale)) {
            assert.ok(
                wellKnownProperties.intlLocaleProperties.has(element),
                `Intl.Locale.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.Locale instance properties", () => {
        for (const element of getAllProperties(new Intl.Locale("en-US"))) {
            assert.ok(
                wellKnownProperties.intlLocalePrototypeProperties.has(element),
                `Intl.Locale.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.NumberFormat static properties", () => {
        for (const element of getAllProperties(Intl.NumberFormat)) {
            assert.ok(
                wellKnownProperties.intlNumberFormatProperties.has(element),
                `Intl.NumberFormat.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.NumberFormat instance properties", () => {
        for (const element of getAllProperties(new Intl.NumberFormat())) {
            assert.ok(
                wellKnownProperties.intlNumberFormatPrototypeProperties.has(
                    element,
                ),
                `Intl.NumberFormat.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.PluralRules static properties", () => {
        for (const element of getAllProperties(Intl.PluralRules)) {
            assert.ok(
                wellKnownProperties.intlPluralRulesProperties.has(element),
                `Intl.PluralRules.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.PluralRules instance properties", () => {
        for (const element of getAllProperties(new Intl.PluralRules())) {
            assert.ok(
                wellKnownProperties.intlPluralRulesPrototypeProperties.has(
                    element,
                ),
                `Intl.PluralRules.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.RelativeTimeFormat static properties", () => {
        for (const element of getAllProperties(Intl.RelativeTimeFormat)) {
            assert.ok(
                wellKnownProperties.intlRelativeTimeFormatProperties.has(
                    element,
                ),
                `Intl.RelativeTimeFormat.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.RelativeTimeFormat instance properties", () => {
        for (const element of getAllProperties(new Intl.RelativeTimeFormat())) {
            assert.ok(
                wellKnownProperties.intlRelativeTimeFormatPrototypeProperties.has(
                    element,
                ),
                `Intl.RelativeTimeFormat.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.Segmenter static properties", () => {
        for (const element of getAllProperties(Intl.Segmenter)) {
            assert.ok(
                wellKnownProperties.intlSegmenterProperties.has(element),
                `Intl.Segmenter.${String(element)} should be a well-known property`,
            )
        }
    })
    it("should have Intl.Segmenter instance properties", () => {
        for (const element of getAllProperties(new Intl.Segmenter())) {
            assert.ok(
                wellKnownProperties.intlSegmenterPrototypeProperties.has(
                    element,
                ),
                `Intl.Segmenter.prototype.${String(element)} should be a well-known property`,
            )
        }
    })
})

// eslint-disable-next-line complexity
function* getAllProperties(object) {
    for (const key of Object.getOwnPropertyNames(object)) {
        if (
            ((key === "arguments" || key === "caller") &&
                object === Function.prototype) ||
            (key === "stack" && object instanceof Error) ||
            ((key === "prepareStackTrace" || key === "stackTraceLimit") &&
                object === Error)
        ) {
            // Skip Non-standard property
            continue
        }
        if (
            // https://github.com/tc39/proposal-atomics-microwait
            (key === "pause" && object === Atomics) ||
            // https://github.com/tc39/proposal-error-capturestacktrace
            (key === "captureStackTrace" && object === Error) ||
            // https://github.com/tc39/proposal-json-parse-with-source
            ((key === "rawJSON" || key === "isRawJSON") && object === JSON) ||
            // https://github.com/tc39/proposal-intl-locale-info
            ((key === "firstDayOfWeek" ||
                key === "getCalendars" ||
                key === "getCollations" ||
                key === "getHourCycles" ||
                key === "getNumberingSystems" ||
                key === "getTimeZones" ||
                key === "getTextInfo" ||
                key === "getWeekInfo" ||
                key === "calendars" ||
                key === "collations" ||
                key === "hourCycles" ||
                key === "numberingSystems" ||
                key === "textInfo" ||
                key === "timeZones" ||
                key === "weekInfo") &&
                object === Intl.Locale.prototype)
        ) {
            // Skip ESNext property
            continue
        }
        yield key
    }
    // yield* Object.getOwnPropertySymbols(object)
    const p = Object.getPrototypeOf(object)
    if (p) {
        yield* getAllProperties(p)
    }
}
