import React from 'react';
import { Header, useAccountName } from 'shared';
import { useStore } from 'effector-react';
import {
    MineOwnerMenu,
    $mineOwnerCabinState,
    MineOwnerCabin,
    Surface,
} from 'features';
import styles from './styles.module.scss';

export const MineOwnerPage = () => {
    const chainAccountName = useAccountName();

    const cabinState = useStore($mineOwnerCabinState);
    return (
        <MineOwnerCabin state={cabinState}>
            <Header />
            <div className={styles.overturnLayout}>
                {chainAccountName && <Surface user={chainAccountName} />}
            </div>
            <MineOwnerMenu currentMineOwnerCabinState={cabinState} />
        </MineOwnerCabin>
    );
};
export * from './Management';
export * from './MineOwnerMiningCrewPage';
