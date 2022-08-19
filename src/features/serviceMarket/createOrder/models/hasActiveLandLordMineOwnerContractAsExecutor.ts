import { createStore } from 'effector';
import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';
import { getContractByUserEffect } from './effects';

export const hasActiveLandLordMineOwnerContractAsExecutor =
    createStore<boolean>(false).on(
        getContractByUserEffect.doneData,
        (_, { rows }: { rows?: ContractDto[] }) =>
            Boolean(
                rows?.find(
                    ({ status, type }: ContractDto) =>
                        type === ContractType.landlord_mineowner &&
                        (status === ContractStatus.active ||
                            status === ContractStatus.signed_by_executor)
                )
            )
    );
