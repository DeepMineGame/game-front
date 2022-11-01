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

export const checkLandLordContractMineOwnerActiveContractEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const { rows: contracts } = await getTableData<ContractDto>(
            getContractsNameConfig(
                searchParam,
                mapSearchParamForIndexPositionToFindContracts.executorId,
                1000
            )
        );
        const mineOwnerLandlordContracts = contracts?.filter(
            ({ type }: ContractDto) => type === ContractType.landlord_mineowner
        );

        const activeContract = mineOwnerLandlordContracts?.some(
            ({ status }: ContractDto) => status === ContractStatus.active
        );

        const hasTerminatedContracts = contracts?.some(
            ({ status }: ContractDto) => status === ContractStatus.terminated
        );
        const hasSelfSignedContract = contracts?.find(
            ({ status }: ContractDto) =>
                status === ContractStatus.signed_by_executor
        );

        if (activeContract) {
            return checkIfNeedPhysicalShiftEffect({ searchParam });
        }

        if (hasTerminatedContracts && !hasSelfSignedContract) {
            return mineOwnerCabinStateResolver.setContractWithLandlordWasTerminated();
        }

        return mineOwnerCabinStateResolver.setNeedContractWithLandlordState();
    }
);
