import { createRule } from "../util/create-rule"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow Hashbang comments.",
            category: "ES2023",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-hashbang.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2023 Hashbang comments are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            Program() {
                const firstComment = context.sourceCode.ast.comments[0]
                if (
                    firstComment &&
                    // @ts-expect-error -- Maybe typing bug
                    firstComment.type === "Shebang"
                ) {
                    context.report({
                        node: firstComment,
                        messageId: "forbidden",
                    })
                }
            },
        }
    },
})
