import React from 'react';
import { LandLordMenu } from 'features';
import { Header } from 'shared';
import { LandLordCabin } from './LandLordCabin';
import styles from './styles.module.scss';

export const LandLordPage = () => {
    return (
        <div>
            <div className={styles.header}>
                <Header withBackButton />
            </div>
            <LandLordCabin />
            <LandLordMenu />
        </div>
    );
};
