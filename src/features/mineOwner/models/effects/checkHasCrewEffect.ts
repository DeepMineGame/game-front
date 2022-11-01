import { createEffect } from 'effector';
import { getTableData } from 'shared';
import {
    ContractDto,
    ContractStatus,
    ContractType,
    getContractsNameConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';
import { checkIsMineActiveEffect } from './checkIsMineActiveEffect';

export const checkHasCrewEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const { rows: contracts } = await getTableData<ContractDto>(
            getContractsNameConfig(
                searchParam,
                mapSearchParamForIndexPositionToFindContracts.clientId,
                1000
            )
        );
        const contractorsContracts = contracts?.filter(
            ({ type }: ContractDto) =>
                type === ContractType.mineowner_contractor
        );
        const hasActiveContractorContract = contractorsContracts?.some(
            ({ status }: ContractDto) => ContractStatus.active === status
        );

        if (hasActiveContractorContract) {
            return checkIsMineActiveEffect({ searchParam });
        }

        return mineOwnerCabinStateResolver.needCrewState();
    }
);
