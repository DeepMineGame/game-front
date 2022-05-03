import React, { FC } from 'react';
import { CardHolder, Header } from 'shared';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const EquipmentSetPage: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.wrapper}>
            <Header title={t('pages.equipmentSet')} />
            <div className={styles.content}>
                <CardHolder />
            </div>
        </div>
    );
};
