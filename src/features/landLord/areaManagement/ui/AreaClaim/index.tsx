import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { Badge } from 'antd';

import {
    Button,
    Title,
    ActionModal,
    green6,
    orange6,
    ExclamationModal,
    useReloadPage,
} from 'shared';
import { useSmartContractAction } from 'features/hooks';
import { engageArea, unEngageArea, claimArea } from 'entities/smartcontract';
import { ClaimDmeGate, claimDmeStore, getRolesEffect } from '../../model';
import styles from './styles.module.scss';

type Props = {
    isActive: boolean;
    areaId?: number;
    accountName: string;
};

export const AreaClaim: FC<Props> = ({ isActive, areaId, accountName }) => {
    useGate(ClaimDmeGate, { searchParam: accountName });
    const { t } = useTranslation();
    const claimDme = useStore(claimDmeStore);
    const isLoading = useStore(getRolesEffect.pending);

    const [isModalActionVisible, setIsModalActionVisible] = useState(false);
    const [isModalUnengageVisible, setIsModalUnengageVisible] = useState(false);
    const engageAreaAction = useSmartContractAction({
        action: engageArea({ waxUser: accountName, areaId }),
    });
    const unEngageAreaAction = useSmartContractAction({
        action: unEngageArea({ waxUser: accountName, areaId }),
    });
    const reloadPage = useReloadPage();
    const claimAction = useSmartContractAction({
        action: claimArea({ waxUser: accountName, areaId }),
    });

    const onEngage = async () => {
        await engageAreaAction();
        reloadPage();
    };

    const onUnengage = async () => {
        await unEngageAreaAction();
        reloadPage();
    };

    const handleClaim = async () => {
        await claimAction();
    };

    return (
        <div className={styles.areaClaim}>
            <div className={styles.claimContainer}>
                <div className={styles.statusContainer}>
                    <Title
                        fontFamily="orbitron"
                        level={4}
                        className={styles.title}
                    >
                        {t('components.common.area')}
                    </Title>
                    <Badge
                        className={styles.status}
                        color={isActive ? green6 : orange6}
                        text={t(
                            isActive
                                ? 'components.common.status.active'
                                : 'components.common.status.inactive'
                        )}
                    />
                </div>
                <Button
                    onClick={handleClaim}
                    type={isActive ? 'primary' : 'ghost'}
                    disabled={isLoading || !claimDme || !isActive}
                    block
                    className={styles.claimButton}
                >
                    {t('pages.areaManagement.claim')}
                </Button>
            </div>

            <div className={styles.engageContainer}>
                {isActive ? (
                    <Button
                        type="ghost"
                        onClick={() => setIsModalUnengageVisible(true)}
                    >
                        {t('pages.areaManagement.unengage')}
                    </Button>
                ) : (
                    <Button
                        type="ghost"
                        onClick={() => setIsModalActionVisible(true)}
                    >
                        {t('pages.areaManagement.engage')}
                    </Button>
                )}
            </div>

            <ExclamationModal
                visible={isModalUnengageVisible}
                onSubmit={onUnengage}
                onCancel={() => setIsModalUnengageVisible(false)}
                title={t('pages.areaManagement.unengage')}
                description={t('pages.areaManagement.unengageDescription')}
                submitText={t('pages.areaManagement.unengage')}
            />
            <ActionModal
                texts={{
                    onOk: t('components.common.button.activate'),
                    title: t('features.mineOwner.setupMine'),
                }}
                costs={{ timeSeconds: 1 }}
                visible={isModalActionVisible}
                onCancel={() => setIsModalActionVisible(false)}
                onSubmit={onEngage}
            />
        </div>
    );
};
