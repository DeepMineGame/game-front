import { createStore } from 'effector';
import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';
import { getContractByExecutorEffect } from './effects';

export const hasActiveLandLordMineOwnerContractAsExecutor = createStore(
    false
).on(
    getContractByExecutorEffect.doneData,
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
