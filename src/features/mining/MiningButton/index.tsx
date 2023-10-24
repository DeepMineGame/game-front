import React, { FC, memo, useCallback, useState } from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import {
    Button,
    desktopS,
    Title,
    useMediaQuery,
    useReloadPage,
    showErrorNotification,
} from 'shared';
import { CheckCircleOutlined } from '@ant-design/icons';
import { App, Modal, Space } from 'antd';
import {
    $miningStat,
    getMiningEffect,
    MiningStatGate,
    useSmartContractAction,
} from 'features';
import {
    contrclaim,
    getContractByExecutorEffect,
    mapSearchParamForIndexPositionToFindContracts,
    toggleMining,
} from 'entities/smartcontract';
import { ClaimInfo } from '../ClaimInfo';
import { useDisabledState } from '../hooks';
import styles from './styles.module.scss';

type Props = {
    isMiningWillEndInFuture: boolean;
    accountName: string;
};

export const MiningAndClaimButton: FC<Props> = memo(
    ({ isMiningWillEndInFuture, accountName }) => {
        useGate(MiningStatGate, { accountName });
        const mineStat = useStore($miningStat);

        const { modal } = App.useApp();

        const [claimModalVisibility, setClaimModalVisibility] = useState(false);
        const reloadPage = useReloadPage();
        const isDesktop = useMediaQuery(desktopS);
        const { t } = useTranslation();
        const isMining = mineStat?.action_state === 'active';
        const isMiningFinished =
            (isMining && !isMiningWillEndInFuture) ||
            mineStat?.action_state === 'finished';
        const isClaimed = mineStat?.action_state === 'claimed';
        const toggleMiningCallback = useSmartContractAction<{
            wax_user: string;
            contract_id: number;
        }>({
            action: toggleMining({
                waxUser: accountName,
                contractId: mineStat?.contract_id!,
                type: isMining ? 'stop' : 'start',
            }),
        });

        const [isClaimedState, setIsClaimedState] = useState(false);
        const claimDmeCallback = useSmartContractAction({
            action: contrclaim({ waxUser: accountName }),
        });

        const isMiningStatLoading = useStore(getMiningEffect.pending);

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
                return modal.warning({
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
            claimed: t('pages.mining.startMining'),
            finished: t('pages.mining.getTheReport'),
            interrupted: t('pages.mining.startMining'),
            active: t('pages.mining.stopMining'),
            undefined: t('pages.mining.startMining'),
            idle: undefined,
        };

        const okText = isClaimedState
            ? t('pages.mining.cool')
            : t('components.common.button.claim');

        const { disabled } = useDisabledState();

        return (
            <>
                <Button
                    loading={isMiningStatLoading}
                    type="primary"
                    block
                    size={isDesktop ? 'large' : 'middle'}
                    onClick={onMiningButtonClick}
                    ghost={isMining}
                    disabled={!isMiningFinished && disabled}
                >
                    {isMiningFinished
                        ? buttonText.finished
                        : buttonText[mineStat?.action_state || 'interrupted']}
                </Button>
                <Modal
                    onOk={onClaimButtonClick}
                    onCancel={hideClaimModal}
                    okText={okText}
                    okButtonProps={{ disabled: !mineStat?.finished }}
                    open={claimModalVisibility}
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
