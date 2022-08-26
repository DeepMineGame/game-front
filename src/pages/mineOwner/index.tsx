import React from 'react';
import { Header, useAccountName, useReloadPage } from 'shared';
import { useStore } from 'effector-react';
import {
    MineOwnerMenu,
    MineOwnerCabin,
    Hologram,
    Travel,
    $mineOwnerCabinState,
    mineOwnerCabinState,
} from 'features';

import { LOCATION_TO_ID } from 'entities/smartcontract';
import styles from './styles.module.scss';

export const MineOwnerPage = () => {
    const chainAccountName = useAccountName();
    const reloadPage = useReloadPage();

    const cabinState = useStore($mineOwnerCabinState);

    return (
        <MineOwnerCabin state={cabinState}>
            <Header withBackButton />
            {chainAccountName && (
                <div className={styles.hologramWrapper}>
                    <Hologram user={chainAccountName} />
                </div>
            )}
            {chainAccountName && (
                <MineOwnerMenu
                    currentMineOwnerCabinState={cabinState}
                    accountName={chainAccountName}
                />
            )}
            {cabinState === mineOwnerCabinState.needPhysicalShift && (
                <Travel
                    toLocationId={LOCATION_TO_ID.mine_deck}
                    onSuccess={reloadPage}
                />
            )}
        </MineOwnerCabin>
    );
};
export * from './Management';
export * from './MineOwnerMiningCrewPage';
export * from './MineOwnerStatsAndInfo';
