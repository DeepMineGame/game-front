import { createStore } from 'effector';
import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';
import { getContractByExecutorEffect } from './effects';

export const hasActiveLandLordMineOwnerContractAsExecutor =
    createStore<boolean>(false).on(
        getContractByExecutorEffect.doneData,
        (_, data) =>
            Boolean(
                data?.rows?.find(
                    ({ status, type }: ContractDto) =>
                        type === ContractType.landlord_mineowner &&
                        (status === ContractStatus.active ||
                            status === ContractStatus.signed_by_executor)
                )
            )
    );
