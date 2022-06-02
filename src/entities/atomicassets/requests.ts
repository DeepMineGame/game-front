import axios from 'axios';

import { ATOMIC_ASSETS_ENDPOINT } from 'app';
import { AssetDataType } from './types';

export const getAtomicAssetsDataById = async (id: string | number) => {
    const { data } = await axios.get(
        `${ATOMIC_ASSETS_ENDPOINT}/atomicassets/v1/assets/${id}`
    );

    return data?.data as AssetDataType | undefined;
};
