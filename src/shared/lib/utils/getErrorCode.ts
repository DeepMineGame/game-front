export const getErrorCode = (error: string): string | 'fallback' => {
    const match = /\[([^)]+)\]/.exec(error);

    return match ? match![1] : 'fallback';
};
