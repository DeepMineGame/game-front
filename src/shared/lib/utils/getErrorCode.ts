/**
 * Function returns error code or 'fallback' of square brackets in received error string
 * @param error Message with error code in square brackets from blockchain
 * @returns Error code. For example: 00012
 */
export const getErrorCode = (error: string): string | 'fallback' => {
    const match = /\[([^)]+)\]/.exec(error);

    return match ? match![1] : 'fallback';
};
