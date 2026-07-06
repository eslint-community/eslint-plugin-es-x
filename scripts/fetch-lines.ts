export async function* fetchLines(url: string) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(
            `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
        )
    }
    yield* (await response.text()).split("\n")
}
