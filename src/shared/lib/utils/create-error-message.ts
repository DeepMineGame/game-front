import { getErrorCode } from './getErrorCode';

export const createErrorMessage = <T1 extends (text: string) => string>(
    error: Error,
    t: T1
) => {
    const errorCode = getErrorCode(error.message);
    const translate = t(`blockchainErrors.${errorCode}`);
    const hasTranslate = !translate.includes('blockchainErrors');

    if (hasTranslate) {
        return translate;
    }

    return error.message;
};
