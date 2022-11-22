import axios from 'axios';
import { defaultConfig, ENDPOINT } from 'app/constants';

export const getReport = async (contractId: number) => {
    return await axios.post(
        `${ENDPOINT}/ubs/engineer/report`,
        { id: contractId },
        defaultConfig
    );
};
