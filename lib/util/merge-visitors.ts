import type { Rule } from "eslint"

export function mergeVisitors(
    ...visitors: Rule.RuleListener[]
): Rule.RuleListener {
    return visitors.reduce<Rule.RuleListener>((acc, visitor) => {
        for (const [key, callback] of Object.entries(visitor)) {
            const oldCallback = acc[key]
            if (oldCallback) {
                acc[key] = (...args) => {
                    ;(oldCallback as (...args: any[]) => void)(...args)
                    ;(callback as (...args: any[]) => void)(...args)
                }
            } else {
                acc[key] = callback
            }
        }
        return acc
    }, {})
}
