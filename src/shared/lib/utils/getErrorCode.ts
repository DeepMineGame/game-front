/**
 * Function returns error code or 'fallback' of square brackets in received error string
 * @param error Message with error code in square brackets from blockchain
 * @returns Error code. For example: 00012
 */
export const getErrorCode = (error: string): string => {
    if (
        /assertion failure with message: (.+): no balance for decreasing/.test(
            error
        )
    )
        return 'notEnoughDme';

    const match = /\[([0-9]+)\]/gm.exec(error);

    return match ? match![1] : 'fallback';
};
