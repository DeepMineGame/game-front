type PathType = (string | number)[] | string;

interface ObjType {
    [key: string]: any;
}

/**
 * Returns the value at the specified path of an object, or undefined if the path is not found.
 *
 * @param {PathType} path The path to the property to retrieve.
 * @param {ObjType} object The object to query.
 * @returns {*} Returns the resolved value.
 */
export function prop(path: PathType, object: ObjType): any {
    const props = Array.isArray(path) ? path : path.split('.');
    return props.reduce(
        (res: any, p: any) =>
            res && res[p] !== undefined ? res[p] : undefined,
        object
    );
}
