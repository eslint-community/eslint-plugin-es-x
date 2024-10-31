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
  | "ArrayBuffer"
  | "SharedArrayBuffer"
  | "Object"
  | "Number"
  | "Boolean"
  | "BigInt"
  | "Iterator"
  | "null"
  | "undefined";

type TypeInfo = {
  type: TypeName;
  return?: TypeInfo;
  properties?: Record<string, TypeInfo | undefined>;
};

export type WellKnownGlobals = Record<
  string,
  | TypeInfo
  | undefined
>;

export type WellKnownPrototypes = Record<
  string,
  Record<string, TypeInfo | undefined> | undefined
>;
