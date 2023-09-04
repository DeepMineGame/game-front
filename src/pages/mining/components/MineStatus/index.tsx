import React, { FC, memo } from 'react';
import { Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { $miningStat } from 'features';
import styles from './styles.module.scss';

export const MineStatus: FC = memo(() => {
    const { t } = useTranslation();
    const miningStat = useStore($miningStat);
    const isMineActive = miningStat?.mine_state === 'activated';
    if (miningStat) {
        return (
            <Badge
                className={styles.status}
                status={isMineActive ? 'success' : 'error'}
                text={`${t('pages.mining.miningStatus')} ${
                    isMineActive
                        ? t('components.common.status.active')
                        : t('components.common.status.inactive')
                }`}
            />
        );
    }
    return null;
});
