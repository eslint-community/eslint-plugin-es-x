/* Since typescript doesn't define the types yet, we'll work around the issue by defining the types ourselves. */
declare namespace Intl {
    interface DurationFormat {
        format(duration: any): any;
        formatToParts(duration: any): any;
        resolvedOptions(): any;
    }

    const DurationFormat: {
        prototype: DurationFormat;
        new (...args:any[]): DurationFormat;
        supportedLocalesOf(...args:any[]): any;
    };
}

interface Float16Array<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike> extends Float32Array<TArrayBuffer> {
}

interface Float16ArrayConstructor {
    new (): Float16Array<ArrayBuffer>;
    new (elements: Iterable<number>): Float16Array<ArrayBuffer>;
    from(arrayLike: Iterable<number>): Float16Array<ArrayBuffer>;
    from<T>(arrayLike: Iterable<T>, mapfn?: (v: T, k: number) => number, thisArg?: any): Float16Array<ArrayBuffer>;
}

declare const Float16Array: Float16ArrayConstructor
