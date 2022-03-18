export default ({
    _Vue, // the version of Vue being used in the VuePress app
    _options, // the options for the root Vue instance
    _router, // the router instance for the app
    _siteData, // site metadata
}) => {
    if (typeof window !== "undefined") {
        if (typeof window.global === "undefined") {
            window.global = {}
        }
        if (typeof window.process === "undefined") {
            window.process = {
                env: {},
                cwd: () => undefined,
            }
        }
    }
}
