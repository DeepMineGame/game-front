export const isServerError = (error: {
    message: string;
    response: { status: number };
}) =>
    !error.message.includes('assertion failure') ||
    error.message === 'Network Error' ||
    (error.response && Number(error?.response.status) >= 500);
