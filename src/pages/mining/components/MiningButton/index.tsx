import React, { FC, useState } from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import {
    Button,
    desktopS,
    Modal,
    Title,
    useChainAuthContext,
    useMediaQuery,
} from 'shared';
import { useSmartContractAction } from 'features';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import {
    ActionDto,
    ActionState,
    claimdme,
    contractStore,
    ContractType,
    getActionEffect,
    getContractEffect,
    toggleMining,
} from 'entities/smartcontracts';
import styles from './styles.module.scss';

type Props = {
    action: ActionDto | undefined;
};

export const MiningAndClaimButton: FC<Props> = ({ action }) => {
    const [claimModalVisibility, setClaimModalVisibility] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const chainAccount = useChainAuthContext();
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();
    const isMining = action?.state === ActionState.active;
    const isMiningFinished = action?.state === ActionState.finished;
    const contracts = useStore(contractStore);
    const mineContracts = contracts?.filter(
        ({ type }) => type === ContractType.mineowner_contractor
    );
    const mineContract = mineContracts && mineContracts[0];
    const toggleMiningCallback = useSmartContractAction<{
        wax_user: string;
        contract_id: number;
    }>(
        toggleMining({
            waxUser: chainAccount.activeUser?.accountName || '',
            contractId: mineContract?.id || 0,
            type: isMining ? 'stop' : 'start',
        })
    );
    const claimDmeCallback = useSmartContractAction(
        claimdme({ waxUser: chainAccount.activeUser?.accountName || '' })
    );

    const isContractsLoading = useStore(getContractEffect.pending);
    const isActionsLoading = useStore(getActionEffect.pending);
    const miningButtonText = isMining
        ? t('pages.mining.stopMining')
        : t('pages.mining.startMining');

    return (
        <>
            {' '}
            <Button
                loading={isContractsLoading || isActionsLoading}
                type="primary"
                block
                size={isDesktop ? 'large' : 'middle'}
                onClick={() => {
                    if (isMiningFinished) {
                        return setClaimModalVisibility(true);
                    }
                    return toggleMiningCallback();
                }}
                ghost={isMining}
            >
                {isMiningFinished
                    ? t('pages.mining.getTheReport')
                    : miningButtonText}
            </Button>
            <Modal
                onOk={() => {
                    if (isClaimed) {
                        return setClaimModalVisibility(false);
                    }
                    claimDmeCallback()?.then(() => {
                        return setIsClaimed(true);
                    });
                }}
                okText={isClaimed ? "That's cool" : 'Claim'}
                visible={claimModalVisibility}
                title="Mining has finished successfully!"
            >
                {isClaimed ? (
                    <Space
                        className={styles.wide}
                        direction="vertical"
                        align="center"
                    >
                        <CheckCircleOutlined className={styles.icon} />
                        <Title level={3}>Your DME has been claimed</Title>
                    </Space>
                ) : (
                    <span>DME will be claimed</span>
                )}
            </Modal>
        </>
    );
};
