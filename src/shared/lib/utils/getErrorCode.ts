export const getErrorCode = (error: string) => /\[([^)]+)\]/.exec(error)![1];
