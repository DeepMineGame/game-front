export const getErrorCode = (error: string): string | 'fallback' =>
    /\[([^)]+)\]/.exec(error) ? /\[([^)]+)\]/.exec(error)![1] : 'fallback';
