import { Badge, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    BackButton,
    Button,
    green6,
    orange6,
    showSuccessModal,
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
    getMinesByOwnerEffect,
    LOCATION_TO_ID,
    MineState,
    setupMine,
} from 'entities/smartcontract';
import { Roles } from 'entities/game-stat';
import { UnsetupMine } from '../UnsetupMine';
import { activeMineOwnerExecutorContractStore } from '../../../models/unsetupMineModel';
import { $userMine, MineManagementGate } from '../../../models';
import { ClaimDME } from '../ClaimDME';
import { MineTable } from '../MineTable';
import styles from './styles.module.scss';

export const MineOwnerManagementPanel = () => {
    const accountName = useAccountName();
    useGate(MineManagementGate, {
        searchParam: accountName,
    });
    const mine = useStore($userMine);
    const isMinesLoading = useStore(getMinesByOwnerEffect.pending);
    const navigate = useNavigate();
    const goToBack = () => navigate(-1);
    const { travelConfirm } = useTravelConfirm(LOCATION_TO_ID.mine_deck);
    const inLocation = useUserLocation();
    const reloadPage = useReloadPage();
    const activateMine = useSmartContractAction({
        action: activatemine({ waxUser: accountName, mineId: mine?.id }),
    });
    const { t } = useTranslation();
    const contract = useStore(activeMineOwnerExecutorContractStore);
    const isMineSetuped = mine?.state === MineState.setuped;
    const isMineDeactivated = mine?.state === MineState.deactivated;
    const setupMineAction = useSmartContractAction({
        action: setupMine({
            waxUser: accountName,
            contractId: contract?.id!,
        }),
    });
    const isMineActive = mine?.state === MineState.activated;
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
        return showSuccessModal({
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
                            loading={isMinesLoading}
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
