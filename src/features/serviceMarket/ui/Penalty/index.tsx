import React from 'react';
import { InfoCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Button } from 'shared';
import styles from './styles.module.scss';

export const Penalty = () => {
    const { t } = useTranslation();
    const handlePenaltyClick = () => {
        console.log('penalty');
    };

    const handleNoPenaltyClick = () => {
        console.log('no penalty');
    };

    return (
        <div className={styles.penalty}>
            <InfoCircleFilled />
            <div className={styles.content}>
                <div className={styles.description}>
                    {t('pages.serviceMarket.contract.penaltyDescription')}
                </div>
                <div className={styles.buttons}>
                    <Button
                        ghost
                        className={styles.button}
                        onClick={handlePenaltyClick}
                    >
                        {t('pages.serviceMarket.contract.collectPenalty')}
                    </Button>
                    <Button
                        ghost
                        className={styles.button}
                        onClick={handleNoPenaltyClick}
                    >
                        {t('pages.serviceMarket.contract.noCollectPenalty')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
