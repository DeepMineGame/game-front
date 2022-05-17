import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Button, desktopS, useChainAuthContext, useMediaQuery } from 'shared';
import { useSmartContractAction } from 'features';
import {
    toggleMining,
    ActionDto,
    ActionState,
    contractStore,
    getContractEffect,
    getActionEffect,
    ContractType,
} from 'entities/smartcontracts';

type Props = {
    action: ActionDto | undefined;
};

export const MiningButton: FC<Props> = ({ action }) => {
    const chainAccount = useChainAuthContext();
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();
    const isMining = action?.state === ActionState.active;
    const contracts = useStore(contractStore);
    const mineContracts = contracts?.filter(
        ({ type }) => type === ContractType.mineowner_contractor
    );
    const mineContract = mineContracts && mineContracts[0];
    const startMiningCallback = useSmartContractAction<{
        wax_user: string;
        contract_id: number;
    }>(
        toggleMining({
            waxUser: chainAccount.activeUser?.accountName || '',
            contractId: mineContract?.id || 0,
            type: isMining ? 'stop' : 'start',
        })
    );

    const isContractsLoading = useStore(getContractEffect.pending);
    const isActionsLoading = useStore(getActionEffect.pending);

    return (
        <Button
            loading={isContractsLoading || isActionsLoading}
            type="primary"
            block
            size={isDesktop ? 'large' : 'middle'}
            onClick={() => startMiningCallback()}
            ghost={isMining}
        >
            {isMining
                ? t('pages.mining.stopMining')
                : t('pages.mining.startMining')}
        </Button>
    );
};
