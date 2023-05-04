import React, { FC, memo, useCallback, useState } from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import {
    Button,
    desktopS,
    Title,
    useMediaQuery,
    useReloadPage,
    showWarningModal,
    showErrorNotification,
} from 'shared';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import { contractorStore, useSmartContractAction } from 'features';
import {
    ActionDto,
    ActionState,
    contrclaim,
    getActionEffect,
    getContractByExecutorEffect,
    mapSearchParamForIndexPositionToFindContracts,
    toggleMining,
} from 'entities/smartcontract';
import { ClaimInfo } from '../ClaimInfo';
import { miningContractStore, MiningPageGate } from '../models';
import { useDisabledState } from '../hooks';
import styles from './styles.module.scss';

type Props = {
    action: ActionDto | undefined;
    isMiningWillEndInFuture: boolean;
    accountName: string;
};

export const MiningAndClaimButton: FC<Props> = memo(
    ({ action, isMiningWillEndInFuture, accountName }) => {
        useGate(MiningPageGate, { searchParam: accountName });
        const contractor = useStore(contractorStore);

        const [claimModalVisibility, setClaimModalVisibility] = useState(false);
        const reloadPage = useReloadPage();
        const isDesktop = useMediaQuery(desktopS);
        const { t } = useTranslation();
        const isMining = action?.state === ActionState.active;
        const isMiningFinished =
            (isMining && !isMiningWillEndInFuture) ||
            action?.state === ActionState.finished;
        const isClaimed = action?.state === ActionState.claimed;
        const mineContract = useStore(miningContractStore);
        const toggleMiningCallback = useSmartContractAction<{
            wax_user: string;
            contract_id: number;
        }>({
            action: toggleMining({
                waxUser: accountName,
                contractId: mineContract?.id!,
                type: isMining ? 'stop' : 'start',
            }),
        });

        const [isClaimedState, setIsClaimedState] = useState(false);
        const claimDmeCallback = useSmartContractAction({
            action: contrclaim({ waxUser: accountName }),
        });
        const isContractsLoading = useStore(
            getContractByExecutorEffect.pending
        );
        const isActionsLoading = useStore(getActionEffect.pending);

        const hideClaimModal = useCallback(
            () => setClaimModalVisibility(false),
            []
        );
        const onClaimButtonClick = useCallback(async () => {
            const updateContract = () =>
                getContractByExecutorEffect({
                    searchIdentification:
                        mapSearchParamForIndexPositionToFindContracts.executorId,
                    searchParam: accountName,
                });
            if (isClaimedState) {
                return setClaimModalVisibility(false);
            }
            await claimDmeCallback()?.then(updateContract);
            return reloadPage();
        }, [claimDmeCallback, isClaimedState, reloadPage, accountName]);
        const onMiningButtonClick = useCallback(() => {
            const toggleMiningAndReinitializeStores = () =>
                toggleMiningCallback()
                    ?.then(reloadPage)
                    .catch(showErrorNotification);
            if (isMiningFinished) {
                setIsClaimedState(false);
                return setClaimModalVisibility(true);
            }

            if (!isMiningFinished && !isClaimed && isMiningWillEndInFuture) {
                return showWarningModal({
                    title: t('pages.mining.doWantStopMining'),
                    content: t('pages.mining.consumablesWillBurnOut'),
                    onOk: toggleMiningAndReinitializeStores,
                });
            }

            return toggleMiningAndReinitializeStores();
        }, [
            isClaimed,
            isMiningFinished,
            isMiningWillEndInFuture,
            reloadPage,
            t,
            toggleMiningCallback,
        ]);

        const buttonText = {
            [ActionState.claimed]: t('pages.mining.startMining'),
            [ActionState.finished]: t('pages.mining.getTheReport'),
            [ActionState.interrupted]: t('pages.mining.startMining'),
            [ActionState.active]: t('pages.mining.stopMining'),
            [ActionState.undefined]: t('pages.mining.startMining'),
            [ActionState.idle]: undefined,
        };

        const okText = isClaimedState
            ? t('pages.mining.cool')
            : t('components.common.button.claim');

        const { disabled } = useDisabledState();

        return (
            <>
                <Button
                    loading={isContractsLoading || isActionsLoading}
                    type="primary"
                    block
                    size={isDesktop ? 'large' : 'middle'}
                    onClick={onMiningButtonClick}
                    ghost={isMining}
                    disabled={!isMiningFinished && disabled}
                >
                    {isMiningFinished
                        ? buttonText[ActionState.finished]
                        : buttonText[action?.state || ActionState.interrupted]}
                </Button>
                <Modal
                    onOk={onClaimButtonClick}
                    onCancel={hideClaimModal}
                    okText={okText}
                    okButtonProps={{ disabled: !contractor?.finished }}
                    visible={claimModalVisibility}
                    title={t('Mining has finished successfully!')}
                >
                    {isClaimedState ? (
                        <Space
                            className={styles.wide}
                            direction="vertical"
                            align="center"
                        >
                            <CheckCircleOutlined className={styles.icon} />
                            <Title level={3}>
                                {t('components.common.yourDMEHasBeenClaimed')}
                            </Title>
                        </Space>
                    ) : (
                        <ClaimInfo accountName={accountName} />
                    )}
                </Modal>
            </>
        );
    }
);
