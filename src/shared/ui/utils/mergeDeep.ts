interface IObject {
    [key: string]: any;
    length?: never;
}

type TUnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never;

interface IIsObject {
    (item: any): boolean;
}

const isObject: IIsObject = (item: any): boolean => {
    const type = typeof item;
    return item != null && type === 'object';
};

// adopted from https://stackoverflow.com/a/48218209
export const mergeDeep = <T extends IObject[]>(
    ...objects: T
): TUnionToIntersection<T[number]> =>
    objects.reduce((result, current) => {
        Object.keys(current).forEach((key) => {
            if (Array.isArray(result[key]) && Array.isArray(current[key])) {
                result[key] = Array.from(
                    new Set((result[key] as unknown[]).concat(current[key]))
                );
            } else if (isObject(result[key]) && isObject(current[key])) {
                result[key] = mergeDeep(
                    result[key] as IObject,
                    current[key] as IObject
                );
            } else {
                result[key] = current[key];
            }
        });

        return result;
    }, {}) as any;
