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
