import {
    Button,
    green6,
    Loader,
    orange6,
    showSuccessModal,
    Title,
    useReloadPage,
    useTableData,
    useTravelConfirm,
    useUserLocation,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { Badge, Space } from 'antd';
import { useGate, useStore } from 'effector-react';
import { CallToTravelNotification, useSmartContractAction } from 'features';
import { FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { serviceMarket } from 'app/router/paths';
import { ServiceMarketTabIds } from 'app/router/constants';
import {
    activatemine,
    getMinesByOwnerEffect,
    getUserConfig,
    LOCATION_TO_ID,
    MineState,
    setupMine,
    UserInfoType,
} from 'entities/smartcontract';
import { MineManagementGate, $userMine } from '../../../models';
import { ClaimDME } from '../ClaimDME';
import { UnsetupMine } from '../UnsetupMine';
import { activeMineOwnerExecutorContractStore } from '../../../models/unsetupMineModel';
import styles from './styles.module.scss';

type Props = {
    chainAccountName: string;
};

export const MineControlPanel: FC<Props> = ({ chainAccountName }) => {
    useGate(MineManagementGate, {
        searchParam: chainAccountName,
    });
    const inLocation = useUserLocation();
    const { travelConfirm } = useTravelConfirm(LOCATION_TO_ID.mine_deck);
    const { data: userInfo } = useTableData<UserInfoType>(getUserConfig);
    const inUserInMineOwnerLocation =
        userInfo?.[0]?.location === LOCATION_TO_ID.mine_deck;
    const contract = useStore(activeMineOwnerExecutorContractStore);
    const navigate = useNavigate();
    const reloadPage = useReloadPage();
    const { t } = useTranslation();
    const isMinesLoading = useStore(getMinesByOwnerEffect.pending);
    const mine = useStore($userMine)?.[0];
    const isMineLoading = useStore(getMinesByOwnerEffect.pending);
    const isMineActive = mine?.state === MineState.activated;
    const isMineSetuped = mine?.state === MineState.setuped;
    const isMineDeactivated = mine?.state === MineState.deactivated;
    const statusText = isMineActive
        ? t('components.common.status.active')
        : t('components.common.status.inactive');
    const setupMineAction = useSmartContractAction({
        action: setupMine({
            waxUser: chainAccountName,
            contractId: contract?.id!,
        }),
    });
    const activateMine = useSmartContractAction({
        action: activatemine({ waxUser: chainAccountName, mineId: mine?.id }),
    });
    const onActivationButtonClick = async () => {
        if (!inLocation.mineDeck) {
            return travelConfirm(reloadPage);
        }
        if (!contract) {
            return navigate(
                `${serviceMarket}?tabId=${ServiceMarketTabIds.mineOwner}`
            );
        }
        if (isMineSetuped || isMineDeactivated) {
            await activateMine();
            return reloadPage();
        }
        await setupMineAction();
        return showSuccessModal({
            title: t('features.mineOwner.mineActivation'),
            content: t('features.mineOwner.mineOperationSucceed'),
            onOk: reloadPage,
        });
    };
    if (isMineLoading) {
        return (
            <div className={styles.background}>
                <Loader centered />
            </div>
        );
    }
    if (!mine && !getMinesByOwnerEffect.pending) {
        return (
            <div className={styles.background}>
                <Title className={styles.title}>
                    <Space direction="vertical" align="center">
                        <FrownOutlined />
                        <div>There is no mine</div>
                    </Space>
                </Title>
            </div>
        );
    }
    const toggleMineText =
        isMineSetuped || isMineDeactivated
            ? t('components.common.button.activate')
            : t('components.common.button.setup');
    return (
        <div className={styles.background}>
            <Space direction="vertical">
                <Space size="large">
                    <Title
                        className={styles.title}
                        fontFamily="orbitron"
                        level={4}
                    >
                        {t('pages.mineManagement.mine')}
                    </Title>
                    <Badge
                        className={styles.badgeText}
                        color={isMineActive ? green6 : orange6}
                        text={statusText}
                    />
                </Space>
                <ClaimDME />
            </Space>

            <div>
                <Space size="large">
                    {!isMineActive && (
                        <Button
                            type={isMineActive ? 'ghost' : 'primary'}
                            onClick={onActivationButtonClick}
                            loading={isMinesLoading}
                        >
                            {contract
                                ? toggleMineText
                                : t('pages.mineManagement.signNewContract')}
                        </Button>
                    )}
                    <UnsetupMine
                        activeContract={contract}
                        isMineActive={isMineActive}
                        accountName={chainAccountName}
                    />
                </Space>
            </div>
            {userInfo?.length && !inUserInMineOwnerLocation && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.mine_deck}
                    onSuccess={reloadPage}
                />
            )}
        </div>
    );
};
