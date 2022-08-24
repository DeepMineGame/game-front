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
import { checkIfNeedPhysicalShiftEffect } from './checkIfNeedPhysicalShiftEeffect';

export const checkContractEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const { rows: contracts } = await getTableData(
            getContractsNameConfig(
                searchParam,
                mapSearchParamForIndexPositionToFindContracts.executorId,
                1000
            )
        );
        const mineOwnerLandlordContracts = contracts?.filter(
            ({ type }: ContractDto) => type === ContractType.landlord_mineowner
        );

        const activeContract = mineOwnerLandlordContracts?.find(
            ({ status }: ContractDto) => status === ContractStatus.active
        );

        if (activeContract) {
            return checkIfNeedPhysicalShiftEffect({ searchParam });
        }
        return mineOwnerCabinStateResolver.setNeedContractWithLandlordState();
    }
);
