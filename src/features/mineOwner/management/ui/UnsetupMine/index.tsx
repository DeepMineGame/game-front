import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { Button } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { mineOwner } from 'app/router/paths';
import {
    ContractDto,
    terminateContract,
    abandonMine,
} from 'entities/smartcontract';
import styles from '../MineControlPanel/styles.module.scss';
import {
    activeContractorsContractsStore,
    UnsetupMineGate,
    userMineStore,
} from '../../../models/unsetupMineModel';
import { useSmartContractAction } from '../../../../hooks';

export const UnsetupMine: FC<{
    accountName: string;
    isMineActive: boolean;
    activeContract: ContractDto | null;
}> = ({ accountName, isMineActive, activeContract }) => {
    useGate(UnsetupMineGate, { searchParams: accountName });
    const contractorsContracts = useStore(activeContractorsContractsStore);
    const userMine = useStore(userMineStore);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const terminateContractAction = useSmartContractAction(
        terminateContract(accountName, activeContract?.id!, 0)
    );
    const abandonMineAction = useSmartContractAction(
        abandonMine(accountName, userMine?.id!)
    );
    const onAbandonClick = async () => {
        await abandonMineAction();
        return navigate(mineOwner);
    };
    const onClick = async () => {
        await terminateContractAction();
        navigate(mineOwner);
    };

    return activeContract ? (
        <Button
            ghost
            danger
            disabled={isMineActive}
            className={styles.wideButton}
            onClick={onClick}
        >
            {t('features.mineOwner.management.unsetup')}
        </Button>
    ) : (
        <Button
            disabled={Boolean(contractorsContracts?.length)}
            ghost
            danger
            className={styles.wideButton}
            onClick={onAbandonClick}
        >
            {t('features.mineOwner.management.abandon')}
        </Button>
    );
};
