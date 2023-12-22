import { App, Badge, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    BackButton,
    Button,
    green6,
    orange6,
    useAccountName,
    useReloadPage,
    useTravelConfirm,
    useUserLocation,
} from 'shared';
import { useNavigate } from 'react-router-dom';
import { serviceMarket } from 'app/router/paths';
import { useSmartContractAction } from 'features';
import {
    activatemine,
    LOCATION_TO_ID,
    setupMine,
} from 'entities/smartcontract';
import { Roles, MineStates } from 'entities/game-stat';
import { UnsetupMine } from '../UnsetupMine';
import { ClaimDME } from '../ClaimDME';
import { MineTable } from '../MineTable';
import {
    $mineOwnerContract,
    $mineOwnerManagementData,
    getMineOwnerManagementData,
    MineOwnerManagementDataGate,
} from '../../../models/mineOwnerManagement';
import styles from './styles.module.scss';

export const MineOwnerManagementPanel = () => {
    const accountName = useAccountName();
    useGate(MineOwnerManagementDataGate, {
        user: accountName,
    });
    const mineOwnerManagementData = useStore($mineOwnerManagementData);
    const isMineOwnerDataLoading = useStore(getMineOwnerManagementData.pending);
    const contract = useStore($mineOwnerContract);

    const navigate = useNavigate();
    const goToBack = () => navigate(-1);
    const { travelConfirm } = useTravelConfirm(LOCATION_TO_ID.mine_deck);
    const inLocation = useUserLocation();
    const reloadPage = useReloadPage();
    const activateMine = useSmartContractAction({
        action: activatemine({
            waxUser: accountName,
            mineId: mineOwnerManagementData?.mine_asset.asset_id,
        }),
    });
    const { t } = useTranslation();
    const isMineSetuped =
        mineOwnerManagementData?.mine_state === MineStates.setuped;
    const isMineDeactivated =
        mineOwnerManagementData?.mine_state === MineStates.deactivated;
    const { modal } = App.useApp();

    const setupMineAction = useSmartContractAction({
        action: setupMine({
            waxUser: accountName,
            contractId: contract?.id!,
        }),
    });
    const isMineActive =
        mineOwnerManagementData?.mine_state === MineStates.activated;
    const statusText = isMineActive ? t('Active') : t('Inactive');
    const onActivationButtonClick = async () => {
        if (!inLocation.mineDeck) {
            return travelConfirm(reloadPage);
        }
        if (!contract) {
            return navigate(`${serviceMarket}?user_role=${Roles.mineowner}`);
        }
        if (isMineSetuped || isMineDeactivated) {
            await activateMine();
            return reloadPage();
        }
        await setupMineAction();
        return modal.success({
            title: t('features.mineOwner.mineActivation'),
            content: t('features.mineOwner.mineOperationSucceed'),
            onOk: reloadPage,
        });
    };

    const toggleMineText =
        isMineSetuped || isMineDeactivated ? t('Activate') : t('Setup');
    return (
        <>
            <BackButton className={styles.backButton} onClick={goToBack} />
            <div className={styles.wrapper}>
                <Typography.Title className={styles.title} level={3}>
                    {t('MINE MANAGEMENT')}
                    <UnsetupMine
                        activeContract={contract}
                        isMineActive={isMineActive}
                    />
                </Typography.Title>
                <Space direction="vertical" size="middle">
                    <Space className={styles.status}>
                        <Typography.Text>{t('Mine status')}</Typography.Text>

                        <Badge
                            className={styles.badgeText}
                            color={isMineActive ? green6 : orange6}
                            text={statusText}
                        />
                    </Space>
                </Space>
                <div className={styles.buttons}>
                    <ClaimDME contract={contract} />

                    {!isMineActive && (
                        <Button
                            block
                            type={isMineActive ? 'ghost' : 'primary'}
                            onClick={onActivationButtonClick}
                            loading={isMineOwnerDataLoading}
                        >
                            {contract
                                ? toggleMineText
                                : t('pages.mineManagement.signNewContract')}
                        </Button>
                    )}
                </div>
                <MineTable />
            </div>
        </>
    );
};
