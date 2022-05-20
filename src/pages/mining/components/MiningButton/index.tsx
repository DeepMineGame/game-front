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
    warning,
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
import { ClaimInfo } from '../ClaimInfo';
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

    const onClaimButtonClick = async () => {
        if (isClaimed) {
            return setClaimModalVisibility(false);
        }
        await claimDmeCallback();
        return setIsClaimed(true);
    };
    const onMiningButtonClick = () => {
        if (isMining) {
            return warning({
                title: 'Do you really want to stop mining?',
                content:
                    'Your consumables will burn out and you won’t be able to use them anymore',
                onOk: toggleMiningCallback,
            });
        }
        if (isMiningFinished) {
            return setClaimModalVisibility(true);
        }
        return toggleMiningCallback();
    };
    const buttonText = isMiningFinished
        ? t('pages.mining.getTheReport')
        : miningButtonText;
    const okText = isClaimed ? t('pages.mining.cool') : t('pages.mining.claim');
    return (
        <>
            <Button
                loading={isContractsLoading || isActionsLoading}
                type="primary"
                block
                size={isDesktop ? 'large' : 'middle'}
                onClick={onMiningButtonClick}
                ghost={isMining}
            >
                {buttonText}
            </Button>
            <Modal
                onOk={onClaimButtonClick}
                onCancel={() => setClaimModalVisibility(false)}
                okText={okText}
                visible={claimModalVisibility}
                title={t('pages.mining.miningFinishedSuccessfully')}
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
                    <ClaimInfo />
                )}
            </Modal>
        </>
    );
};
