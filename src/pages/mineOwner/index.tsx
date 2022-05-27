import React from 'react';
import { Header } from 'shared';
import { MineOwnerCabin, Surface } from 'features/mineOwner';
import styles from './styles.module.scss';

export const MineOwnerPage = () => {
    return (
        <MineOwnerCabin state="default">
            <Header />
            <div className={styles.overturnLayout}>
                <Surface />
            </div>
        </MineOwnerCabin>
    );
};
