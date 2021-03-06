import React, { FC, memo } from 'react';
import { Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { currentMineStore } from 'features';
import { MineState } from 'entities/smartcontract';
import styles from './styles.module.scss';

export const MineStatus: FC = memo(() => {
    const { t } = useTranslation();
    const mineStore = useStore(currentMineStore);

    const isActive = mineStore && mineStore[0]?.state === MineState.activated;

    if (mineStore) {
        return (
            <Badge
                className={styles.status}
                status={isActive ? 'success' : 'error'}
                text={`${t('pages.mining.miningStatus')} ${
                    isActive
                        ? t('components.common.status.active')
                        : t('components.common.status.inactive')
                }`}
            />
        );
    }
    return null;
});
