/**
 * Function returns error code or undefined of square brackets in received error string
 * @param error Message with error code in square brackets from blockchain
 * @returns Error code. For example: 00012 || undefined
 */
export const getErrorCode = (error: string) => {
    if (
        /assertion failure with message: (.+): no balance for decreasing/.test(
            error
        )
    )
        return 'notEnoughDme';

    const match = /\[([0-9]+)\]/gm.exec(error);

    return match?.[1];
};

export const createErrorMessage = <T1 extends (text: string) => string>(
    error: Error,
    t: T1
) => {
    let errorMessage = error.message;
    const errorCode = getErrorCode(error.message);
    const isCodeExistInTranslate =
        t(`blockchainErrors.${getErrorCode(errorMessage)}`).split('.')[0] !==
        'blockchainErrors';

    if (errorCode && isCodeExistInTranslate) {
        errorMessage = t(`blockchainErrors.${getErrorCode(errorMessage)}`);
    }

    return errorMessage;
};
