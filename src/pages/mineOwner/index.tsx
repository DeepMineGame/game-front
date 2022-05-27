import React from 'react';
import { Header, useChainAuthContext } from 'shared';
import { MineOwnerCabin, Surface } from 'features/mineOwner';
import styles from './styles.module.scss';

export const MineOwnerPage = () => {
    const chainAccount = useChainAuthContext();

    return (
        <MineOwnerCabin state="default">
            <Header />
            <div className={styles.overturnLayout}>
                {chainAccount?.activeUser && (
                    <Surface user={chainAccount?.activeUser?.accountName} />
                )}
            </div>
        </MineOwnerCabin>
    );
};
