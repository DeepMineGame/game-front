import React from 'react';
import { Header, useChainAuthContext } from 'shared';
import { useStore } from 'effector-react';
import {
    $mineOwnerCabinState,
    MineOwnerCabin,
    Surface,
} from 'features/mineOwner';
import styles from './styles.module.scss';

export const MineOwnerPage = () => {
    const chainAccount = useChainAuthContext();
    const cabinState = useStore($mineOwnerCabinState);

    return (
        <MineOwnerCabin state={cabinState}>
            <Header />
            <div className={styles.overturnLayout}>
                {chainAccount?.activeUser && (
                    <Surface user={chainAccount?.activeUser?.accountName} />
                )}
            </div>
        </MineOwnerCabin>
    );
};
