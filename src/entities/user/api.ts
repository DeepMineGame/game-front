import axios from 'axios';
import { defaultConfig, ENDPOINT } from 'app/constants';
import { User } from './model/type';

export const getUserFromSession = async () => {
    const { data } = await axios.get<User>(
        `${ENDPOINT}/ubs/auth/me`,
        defaultConfig
    );

    return data;
};

export const getAuthLinks = async (withoutRedirect = true) => {
    const { data } = await axios.get<{ google: string; discord: string }>(
        `${ENDPOINT}/ubs/auth/links?without_redirect=${withoutRedirect}`,
        defaultConfig
    );

    return data;
};

export const authUserFromGoogle = async (inputData: {
    code: string;
    redirect_uri: string;
}) => {
    const { data } = await axios.post<User>(
        `${ENDPOINT}/ubs/game/sign_in`,
        inputData,
        defaultConfig
    );

    return data;
};

export const connectUserWithWaxAccount = async (waxAddress: string) => {
    const { data } = await axios.post<User>(
        `${ENDPOINT}/ubs/game/link_wax`,
        { wax_address: waxAddress },
        defaultConfig
    );

    return data;
};

export const logoutUser = async () => {
    await axios.get(`${ENDPOINT}/ubs/logout`, defaultConfig);
};
