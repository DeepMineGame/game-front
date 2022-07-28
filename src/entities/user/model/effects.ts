import { createEffect } from 'effector';
import { fetchDmeBalance, fetchWaxBalance } from 'features/balances';
import {
    authUserFromGoogle,
    connectUserWithWaxAccount,
    getUserFromSession,
    logoutUser,
} from '../api';

export const getUserFromSessionEffect = createEffect(getUserFromSession);

export const authUserFromGoogleEffect = createEffect(authUserFromGoogle);

export const logoutUserEffect = createEffect(logoutUser);

export const fetchWaxBalanceEffect = createEffect(fetchWaxBalance);

export const fetchDmeBalanceEffect = createEffect(fetchDmeBalance);

export const connectUserWithWaxAccountEffect = createEffect(
    connectUserWithWaxAccount
);
