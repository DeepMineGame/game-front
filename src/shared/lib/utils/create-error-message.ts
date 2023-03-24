import { getErrorCode } from './getErrorCode';

export const createErrorMessage = <T1 extends (text: string) => string>(
    error: Error,
    t: T1
) => {
    const errorCode = getErrorCode(error.message);
    const translate = t(`blockchainErrors.${errorCode}`);

    return `${translate} (Debug information: ${error.message})`;
};
