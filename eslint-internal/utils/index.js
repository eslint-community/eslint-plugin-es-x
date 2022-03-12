/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
let configuredRulesDocumentUrl = null

/**
 * Get the base URL from a given repository information.
 * @param {string|{type:string,url:string}} repository The repository information.
 * @returns {string|null} The base URL.
 */
function getBaseUrl(repository) {
    if (typeof repository === "string") {
        return `https://github.com/${repository}`
    }
    if (
        repository &&
        typeof repository.url === "string" &&
        /^git\+.+\.git$/u.test(repository.url)
    ) {
        return repository.url.slice(4, -4)
    }

    return null
}

module.exports = {
    /**
     * The URL of rule's documentation for the `+eslint-plugin` config.
     * @type {string}
     */
    get rulesDocumentUrl() {
        if (configuredRulesDocumentUrl) {
            return configuredRulesDocumentUrl
        }
        try {
            const { repository } = JSON.parse(
                fs.readFileSync(
                    path.join(process.cwd(), "package.json"),
                    "utf8",
                ),
            )
            const baseUrl = getBaseUrl(repository)
            if (baseUrl) {
                return `${baseUrl}/blob/master/docs/rules/{{name}}.md`
            }
        } catch (_error) {
            // ignore
        }
        return undefined
    },

    set rulesDocumentUrl(value) {
        configuredRulesDocumentUrl = value
    },
}
