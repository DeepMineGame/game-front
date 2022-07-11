import React from 'react';
import { LandLordMenu } from 'features';
import { Header, useAccountName } from 'shared';
import { LandLordCabin } from './LandLordCabin';
import styles from './styles.module.scss';

export const LandLordPage = () => {
    const accountName = useAccountName();

    return (
        <div>
            <div className={styles.header}>
                <Header withBackButton />
            </div>
            {accountName && <LandLordCabin accountName={accountName} />}
            <LandLordMenu />
        </div>
    );
};
