import type globals from "globals"

export type BuiltinGlobalObjectName =
    | keyof typeof globals.builtin
    // ES2027 but not included in globals.builtin
    | "Temporal"
    | "AsyncDisposableStack"
    | "DisposableStack"

export type GlobalObjectName = keyof typeof globalThis
type IsNever<T> = [T] extends [never] ? true : false
export type GlobalObjectProperties<N extends GlobalObjectName> =
    IsNever<keyof (typeof globalThis)[N]> extends true
        ? never
        : keyof (typeof globalThis)[N] & string
