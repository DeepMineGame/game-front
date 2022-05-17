import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { CheckOutlined } from '@ant-design/icons';

import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const MiningOver = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                <CheckOutlined style={{ color: '#47FF40' }} />
                <div>{t('pages.contractor.miningOver.title')}</div>
            </div>
            <div
                className={cn(contractorStyles.description, styles.description)}
            >
                {t('pages.contractor.miningOver.description')}
            </div>
        </div>
    );
};
