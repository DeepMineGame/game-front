import { createStore } from 'effector';
import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';
import { getContractByExecutorEffect } from './effects';

export const hasActiveMineOwnerContractorContractAsExecutor = createStore(
    false
).on(getContractByExecutorEffect.doneData, (_, rows) =>
    Boolean(
        rows?.find(
            ({ status, type, deleted_at }: ContractDto) =>
                !deleted_at &&
                type === ContractType.mineowner_contractor &&
                (status === ContractStatus.active ||
                    status === ContractStatus.signed_by_executor)
        )
    )
);
