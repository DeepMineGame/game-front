import { ContractDto } from 'entities/smartcontract';
import {
    citizenOwnAlerts,
    citizenEngineerAlerts,
    engineerOwnAlerts,
    engineerClientAlerts,
} from '../constants';

const getFinishedBy = (contract: ContractDto): string | undefined => {
    return contract.attrs.find(({ key }) => key === 'finished_by')?.value;
};

const getAlertMessages = (
    contract: ContractDto,
    accountName: string,
    finishedBy?: string
) => {
    if (contract.client === accountName) {
        if (finishedBy === contract.client) {
            return citizenOwnAlerts;
        }
        return citizenEngineerAlerts;
    }

    if (contract.executor === accountName) {
        if (finishedBy === contract.executor) {
            return engineerOwnAlerts;
        }

        return engineerClientAlerts;
    }

    return null;
};

export { getFinishedBy, getAlertMessages };
