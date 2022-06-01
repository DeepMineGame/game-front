import React from 'react';
import { Header, useChainAuthContext } from 'shared';
import { useStore } from 'effector-react';
import {
    MineOwnerMenu,
    $mineOwnerCabinState,
    MineOwnerCabin,
    Surface,
} from 'features';
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
            <MineOwnerMenu currentMineOwnerCabinState={cabinState} />
        </MineOwnerCabin>
    );
};
export * from './components/Management';
