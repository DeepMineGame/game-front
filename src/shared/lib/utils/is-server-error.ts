import { AxiosError } from 'axios';

export const isServerError = (error: AxiosError) =>
    error.message === 'Network Error' ||
    (error.response && Number(error?.response.status) >= 500);
