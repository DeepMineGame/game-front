import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { CheckOutlined } from '@ant-design/icons';

import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { mining } from 'app/router/paths';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const MiningOver = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

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
            <div className={styles.center}>
                <Button onClick={() => navigate(mining)}>
                    {t('components.common.button.miningDeck')}
                </Button>
            </div>
        </div>
    );
};
