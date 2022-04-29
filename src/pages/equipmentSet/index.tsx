import React, { FC } from 'react';
import { CardHolder, Header } from 'shared';
import styles from './styles.module.scss';

export const EquipmentSetPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Header title="equipment set" />
            <div className={styles.content}>
                <CardHolder />
            </div>
        </div>
    );
};
