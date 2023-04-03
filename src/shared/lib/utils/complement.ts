export function complement<T extends (...args: any[]) => boolean>(
    fn: T
): (...args: Parameters<T>) => boolean {
    return (...args: Parameters<T>) => !fn(...args);
}
