import React from 'react';
import { Header, useAccountName, useReloadPage, useUserLocation } from 'shared';
import { useStore } from 'effector-react';
import {
    MineOwnerMenu,
    MineOwnerCabin,
    Hologram,
    CallToTravelNotification,
    $mineOwnerCabinState,
} from 'features';

import { LOCATION_TO_ID } from 'entities/smartcontract';
import styles from './styles.module.scss';

export const MineOwnerPage = () => {
    const chainAccountName = useAccountName();
    const reloadPage = useReloadPage();
    const inLocation = useUserLocation();

    const cabinState = useStore($mineOwnerCabinState);

    return (
        <MineOwnerCabin state={cabinState}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.hologramWrapper}>
                <Hologram user={chainAccountName} />
            </div>
            <MineOwnerMenu
                currentMineOwnerCabinState={cabinState}
                accountName={chainAccountName}
            />
            {!inLocation.mineDeck && (
                <CallToTravelNotification
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
