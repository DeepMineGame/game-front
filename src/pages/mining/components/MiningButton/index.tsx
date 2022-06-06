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
    contrclaim,
    contractStore,
    ContractType,
    getActionEffect,
    getContractEffect,
    mapSearchParamForIndexPositionToFindContracts,
    toggleMining,
} from 'entities/smartcontract';
import { ClaimInfo } from '../ClaimInfo';
import styles from './styles.module.scss';

type Props = {
    action: ActionDto | undefined;
    isMiningWillEndInFuture: boolean;
};

export const MiningAndClaimButton: FC<Props> = ({
    action,
    isMiningWillEndInFuture,
}) => {
    const [claimModalVisibility, setClaimModalVisibility] = useState(false);
    const chainAccount = useChainAuthContext();
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();
    const isMining = action?.state === ActionState.active;
    const isMiningFinished =
        (action?.state === ActionState.active && !isMiningWillEndInFuture) ||
        action?.state === ActionState.finished;
    const isClaimed = action?.state === ActionState.claimed;
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
    const updateContract = () =>
        getContractEffect({
            searchIdentification:
                mapSearchParamForIndexPositionToFindContracts.executorId,
            searchParam: chainAccount?.activeUser?.accountName || '',
        });
    const toggleMiningAndReinitializeStores = () =>
        toggleMiningCallback()?.then(updateContract);
    const [isClaimedState, setIsClaimedState] = useState(false);
    const claimDmeCallback = useSmartContractAction(
        contrclaim({ waxUser: chainAccount.activeUser?.accountName || '' })
    );
    const isContractsLoading = useStore(getContractEffect.pending);
    const isActionsLoading = useStore(getActionEffect.pending);

    const onClaimButtonClick = async () => {
        if (isClaimedState) {
            return setClaimModalVisibility(false);
        }
        await claimDmeCallback()?.then(updateContract);
        return setIsClaimedState(true);
    };
    const onMiningButtonClick = () => {
        if (isMiningFinished) {
            setIsClaimedState(false);
            return setClaimModalVisibility(true);
        }

        if (!isMiningFinished && !isClaimed && isMiningFinished === undefined) {
            return warning({
                title: t('pages.mining.doWantStopMining'),
                content: t('pages.mining.consumablesWillBurnOut'),
                onOk: toggleMiningAndReinitializeStores,
            });
        }

        return toggleMiningAndReinitializeStores();
    };

    const buttonText = {
        [ActionState.claimed]: t('pages.mining.startMining'),
        [ActionState.finished]: t('pages.mining.getTheReport'),
        [ActionState.interrupted]: t('pages.mining.startMining'),
        [ActionState.active]: t('pages.mining.stopMining'),
        [ActionState.undefined]: t('pages.mining.startMining'),
    };

    const okText = isClaimedState
        ? t('pages.mining.cool')
        : t('pages.mining.claim');

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
                {isMiningFinished
                    ? buttonText[ActionState.finished]
                    : buttonText[action?.state || ActionState.interrupted]}
            </Button>
            <Modal
                onOk={onClaimButtonClick}
                onCancel={() => setClaimModalVisibility(false)}
                okText={okText}
                visible={claimModalVisibility}
                title={t('pages.mining.miningFinishedSuccessfully')}
            >
                {isClaimedState ? (
                    <Space
                        className={styles.wide}
                        direction="vertical"
                        align="center"
                    >
                        <CheckCircleOutlined className={styles.icon} />
                        <Title level={3}>
                            {t('pages.mining.yourDMEHasBeenClaimed')}
                        </Title>
                    </Space>
                ) : (
                    <ClaimInfo />
                )}
            </Modal>
        </>
    );
};
