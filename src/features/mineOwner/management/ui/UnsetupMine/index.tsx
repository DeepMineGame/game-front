import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { Button } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { mineOwner } from 'app/router/paths';
import { termContract } from 'entities/smartcontract';
import styles from '../MineControlPanel/styles.module.scss';
import {
    activeMineOwnerExecutorContractStore,
    UnsetupMineGate,
} from '../../../models/unsetupMineModel';
import { useSmartContractAction } from '../../../../hooks';

export const UnsetupMine: FC<{ accountName: string }> = ({ accountName }) => {
    useGate(UnsetupMineGate, { searchParams: accountName });
    const { t } = useTranslation();
    const contract = useStore(activeMineOwnerExecutorContractStore);
    const navigate = useNavigate();
    const terminateContract = useSmartContractAction(
        termContract({ waxUser: accountName, contractId: contract?.id || 0 })
    );
    const onClick = async () => {
        await terminateContract();
        navigate(mineOwner);
    };
    return contract ? (
        <Button ghost danger className={styles.wideButton} onClick={onClick}>
            {t('features.mineOwner.management.unsetup')}
        </Button>
    ) : null;
};
