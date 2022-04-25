import axios from 'axios';
import { createEffect } from 'effector';
import { defaultConfig, ENDPOINT } from 'app';

const authDeepMineUser = async (wax_address: string) => {
    const { data } = await axios.post(
        `${ENDPOINT}/ubs/wax/auth`,
        {
            wax_address,
        },
        defaultConfig
    );

    return data;
};

export const authDeepMineUserEffect = createEffect(authDeepMineUser);
