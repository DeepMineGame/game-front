// @see https://dirask.com/posts/TypeScript-get-unique-objects-from-array-1GXL9D
export const getUniqueItems = <T extends unknown>(
    items: T[],
    keyGetter: (item: T) => string
): T[] => {
    const locks: Record<string, boolean> = {};
    const result: T[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
        const key = keyGetter(item);
        if (key in locks) {
            // eslint-disable-next-line no-continue
            continue;
        }
        locks[key] = true;
        result.push(item);
    }
    return result;
};
