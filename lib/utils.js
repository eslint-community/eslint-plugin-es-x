/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

/**
 * Check whether a given character is escaped or not.
 * @param {string} text The string to check.
 * @param {number} index The location of the character to check.
 * @returns {boolean} `true` if the character is escaped.
 */
function isEscaped(text, index) {
    let escaped = false
    for (let i = index - 1; i >= 0 && text.charCodeAt(i) === 0x5c; --i) {
        escaped = !escaped
    }
    return escaped
}

module.exports = {
    /**
     * Define the predicate function to check whether a given string has the given pattern or not.
     * The predicate function regards escape sequences.
     *
     * @param {RegExp} pattern The pattern to check. This must have `g` flag.
     * @returns {function(string): boolean} The created predicate function.
     */
    definePatternMatcher(pattern) {
        return text => {
            let match = null

            pattern.lastIndex = 0
            while ((match = pattern.exec(text)) != null) {
                if (!isEscaped(text, match.index)) {
                    return true
                }
            }

            return false
        }
    },

    /**
     * Check whether a given token is a comma token or not.
     * @param {Token} token The token to check.
     * @returns {boolean} `true` if the token is a comma token.
     */
    isCommaToken(token) {
        return (
            token != null && token.type === "Punctuator" && token.value === ","
        )
    },
}
