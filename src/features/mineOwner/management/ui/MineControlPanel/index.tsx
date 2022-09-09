import {
    Badge,
    Button,
    greenGreen6,
    Loader,
    success,
    sunsetOrange6,
    Title,
    useReloadPage,
    useTableData,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { Space } from 'antd';
import { useGate, useStore } from 'effector-react';
import { Travel, useSmartContractAction } from 'features';
import { FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { serviceMarket } from 'app/router/paths';
import {
    activatemine,
    deactmine,
    getMinesByOwnerEffect,
    getUserConfig,
    LOCATION_TO_ID,
    MineState,
    UserInfoType,
} from 'entities/smartcontract';
import { MineManagementGate, userMineStore } from '../../../models';
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
    const { data: userInfo } = useTableData<UserInfoType>(getUserConfig);
    const inUserInMineOwnerLocation =
        userInfo?.[0]?.location === LOCATION_TO_ID.mine_deck;
    const contract = useStore(activeMineOwnerExecutorContractStore);
    const navigate = useNavigate();
    const reloadPage = useReloadPage();
    const { t } = useTranslation();
    const isMinesLoading = useStore(getMinesByOwnerEffect.pending);
    const mine = useStore(userMineStore)?.[0];
    const isMineLoading = useStore(getMinesByOwnerEffect.pending);
    const isMineActive = mine?.state === MineState.activated;
    const statusText = isMineActive
        ? t('components.common.status.active')
        : t('components.common.status.inactive');

    const deactivateMine = useSmartContractAction(
        deactmine({ waxUser: chainAccountName, mineId: mine?.id })
    );
    const activateMine = useSmartContractAction(
        activatemine({ waxUser: chainAccountName, mineId: mine?.id })
    );
    const onActivationButtonClick = async () => {
        if (!contract) {
            return navigate(serviceMarket);
        }
        const action = isMineActive ? deactivateMine : activateMine;
        await action();
        return success({
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
    if (!mine) {
        return (
            <div className={styles.background}>
                <Title>
                    <Space direction="vertical" align="center">
                        <FrownOutlined />
                        <div>There is no mine</div>
                    </Space>
                </Title>
            </div>
        );
    }
    const toggleMineText = isMineActive
        ? t('components.common.button.deactivate')
        : t('components.common.button.activate');
    return (
        <div className={styles.background}>
            <Space direction="vertical">
                <Space size="large">
                    <Title level={4}>{t('pages.mineManagement.mine')}</Title>
                    <Badge
                        className={styles.badgeText}
                        color={isMineActive ? greenGreen6 : sunsetOrange6}
                        text={statusText}
                    />
                </Space>
                <ClaimDME />
            </Space>

            <div>
                <Space direction="vertical">
                    <Button
                        type={isMineActive ? 'ghost' : 'primary'}
                        onClick={onActivationButtonClick}
                        loading={isMinesLoading}
                    >
                        {contract ? toggleMineText : 'Sign new contract'}
                    </Button>
                    {chainAccountName && (
                        <UnsetupMine
                            activeContract={contract}
                            isMineActive={isMineActive}
                            accountName={chainAccountName}
                        />
                    )}
                </Space>
            </div>
            {userInfo?.length && !inUserInMineOwnerLocation && (
                <Travel
                    toLocationId={LOCATION_TO_ID.mine_deck}
                    onSuccess={reloadPage}
                />
            )}
        </div>
    );
};
