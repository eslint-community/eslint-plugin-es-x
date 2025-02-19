export type TypeName =
  | "Array"
  | "Date"
  | "Function"
  | "Intl.Collator"
  | "Intl.DateTimeFormat"
  | "Intl.ListFormat"
  | "Intl.NumberFormat"
  | "Intl.PluralRules"
  | "Intl.RelativeTimeFormat"
  | "Intl.Segmenter"
  | "Intl.DisplayNames"
  | "Intl.Locale"
  | "Intl.DurationFormat"
  | "Promise"
  | "RegExp"
  | "String"
  | "Symbol"
  | "Int8Array"
  | "Uint8Array"
  | "Uint8ClampedArray"
  | "Int16Array"
  | "Uint16Array"
  | "Int32Array"
  | "Uint32Array"
  | "Float32Array"
  | "Float64Array"
  | "BigInt64Array"
  | "BigUint64Array"
  | "DataView"
  | "ArrayBuffer"
  | "SharedArrayBuffer"
  | "Object"
  | "Number"
  | "Boolean"
  | "BigInt"
  | "Iterator"
  | "Map"
  | "Set"
  | "WeakMap"
  | "WeakSet"
  | "WeakRef"
  | "FinalizationRegistry"
  | "null"
  | "undefined";

type TypeInfo = {
  type: TypeName;
  return?: TypeInfo;
  properties?: Record<string, TypeInfo | undefined>;
  prototypeType?: TypeName;
};

export type WellKnownGlobals = Record<string, TypeInfo | undefined>;

export type WellKnownPrototypes = Record<
  string,
  Record<string, TypeInfo | undefined> | undefined
>;

type ExcludeProperty = "prototype" | typeof Symbol.species;
type ExcludePrototypeProperty =
  | "toString"
  | "toLocaleString"
  | typeof Symbol.iterator
  | typeof Symbol.toPrimitive
  | typeof Symbol.toStringTag
  | typeof Symbol.hasInstance
  | typeof Symbol.unscopables
  | typeof Symbol.match
  | typeof Symbol.replace
  | typeof Symbol.search
  | typeof Symbol.split
  | typeof Symbol.matchAll
  | typeof Symbol.species
  | typeof Symbol.dispose
  | typeof Symbol.metadata;

export type ObjectProperty = keyof typeof Object;
export type ObjectPrototypeProperty = keyof Object;
export type StringProperty = Exclude<keyof typeof String, ExcludeProperty>;
export type StringPrototypeProperty = Exclude<
  keyof String,
  ExcludePrototypeProperty
>;
export type NumberProperty = Exclude<keyof typeof Number, ExcludeProperty>;
export type NumberPrototypeProperty = Exclude<
  keyof Number,
  ExcludePrototypeProperty
>;
export type BooleanProperty = Exclude<keyof typeof Boolean, ExcludeProperty>;
export type BooleanPrototypeProperty = Exclude<
  keyof Boolean,
  ExcludePrototypeProperty
>;
export type SymbolProperty = Exclude<keyof typeof Symbol, ExcludeProperty>;
export type SymbolPrototypeProperty = Exclude<
  keyof Symbol,
  ExcludePrototypeProperty
>;
export type BigIntProperty = Exclude<keyof typeof BigInt, ExcludeProperty>;
export type BigIntPrototypeProperty = Exclude<
  keyof BigInt,
  ExcludePrototypeProperty
>;
export type FunctionProperty = Exclude<keyof typeof Function, ExcludeProperty>;
export type FunctionPrototypeProperty = Exclude<
  keyof Function,
  ExcludePrototypeProperty
>;
export type ArrayProperty = Exclude<keyof typeof Array, ExcludeProperty>;
export type ArrayPrototypeProperty = Exclude<
  keyof Array<any>,
  ExcludePrototypeProperty
>;
export type MapProperty = Exclude<keyof typeof Map, ExcludeProperty>;
export type MapPrototypeProperty = Exclude<
  keyof Map<any, any>,
  ExcludePrototypeProperty
>;
export type SetProperty = Exclude<keyof typeof Set, ExcludeProperty>;
export type SetPrototypeProperty = Exclude<
  keyof Set<any>,
  ExcludePrototypeProperty
>;
export type RegExpProperty = Exclude<keyof typeof RegExp, ExcludeProperty>;
export type RegExpPrototypeProperty = Exclude<
  keyof RegExp,
  ExcludePrototypeProperty
>;
export type RegExpArrayPrototypeProperty = Exclude<
  keyof RegExpExecArray,
  ExcludePrototypeProperty
>;
export type DateProperty = Exclude<keyof typeof Date, ExcludeProperty>;
export type DatePrototypeProperty =
  | Exclude<keyof Date, ExcludePrototypeProperty | "getVarDate">
  | "getYear"
  | "setYear"
  | "toGMTString";
export type PromiseProperty =
  | Exclude<keyof typeof Promise, ExcludeProperty>
  | "try";
export type PromisePrototypeProperty = Exclude<
  keyof Promise<any>,
  ExcludePrototypeProperty
>;
export type DataViewProperty = Exclude<
  keyof typeof DataView,
  ExcludeProperty
>;
export type DataViewPrototypeProperty = Exclude<
  keyof DataView,
  ExcludePrototypeProperty
>;
export type ArrayBufferProperty = Exclude<
  keyof typeof ArrayBuffer,
  ExcludeProperty
>;
export type ArrayBufferPrototypeProperty =
  | Exclude<keyof ArrayBuffer, ExcludePrototypeProperty>
  | "resize"
  | "transfer"
  | "transferToFixedLength"
  | "detached"
  | "maxByteLength"
  | "resizable";
export type SharedArrayBufferProperty = Exclude<
  keyof typeof SharedArrayBuffer,
  ExcludeProperty
>;
export type SharedArrayBufferPrototypeProperty =
  | Exclude<keyof SharedArrayBuffer, ExcludePrototypeProperty>
  | "grow"
  | "growable"
  | "maxByteLength";
export type WeakMapProperty = Exclude<keyof typeof WeakMap, ExcludeProperty>;
export type WeakMapPrototypeProperty = Exclude<
  keyof WeakMap<any, any>,
  ExcludePrototypeProperty
>;
export type WeakSetProperty = Exclude<keyof typeof WeakSet, ExcludeProperty>;
export type WeakSetPrototypeProperty = Exclude<
  keyof WeakSet<any>,
  ExcludePrototypeProperty
>;
export type WeakRefProperty = Exclude<keyof typeof WeakRef, ExcludeProperty>;
export type WeakRefPrototypeProperty = Exclude<
  keyof WeakRef<any>,
  ExcludePrototypeProperty
>;
export type FinalizationRegistryProperty = Exclude<keyof typeof FinalizationRegistry, ExcludeProperty>;
export type FinalizationRegistryPrototypeProperty = Exclude<
  keyof FinalizationRegistry<any>,
  ExcludePrototypeProperty
>;
export type IntlProperty = Exclude<keyof typeof Intl, ExcludeProperty> | 'DurationFormat';
export type IteratorProperty = Exclude<keyof typeof Iterator, ExcludeProperty>;
export type IteratorPrototypeProperty = Exclude<
  keyof IteratorObject<any>,
  ExcludePrototypeProperty
>;
export type TypedArrayProperty = Exclude<
  keyof typeof Int8Array,
  ExcludeProperty
>;
export type TypedArrayPrototypeProperty = Exclude<
  keyof Int8Array,
  ExcludePrototypeProperty | "BYTES_PER_ELEMENT"
>;
