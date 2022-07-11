import React from 'react';
import { Header, useAccountName, useTableData } from 'shared';
import { useStore } from 'effector-react';
import {
    MineOwnerMenu,
    $mineOwnerCabinState,
    MineOwnerCabin,
    Surface,
    Travel,
} from 'features';
import { useNavigate } from 'react-router-dom';
import {
    getUserConfig,
    LOCATION_TO_ID,
    UserInfoType,
} from 'entities/smartcontract';
import styles from './styles.module.scss';

export const MineOwnerPage = () => {
    const chainAccountName = useAccountName();
    const { data: userInfo } = useTableData<UserInfoType>(getUserConfig);
    const navigate = useNavigate();
    const reloadPage = () => navigate(0);
    const inUserInMineOwnerLocation =
        userInfo?.[0]?.location === LOCATION_TO_ID.mine_deck;

    const cabinState = useStore($mineOwnerCabinState);
    return (
        <MineOwnerCabin state={cabinState}>
            <Header withBackButton />
            <div className={styles.overturnLayout}>
                {chainAccountName && <Surface user={chainAccountName} />}
            </div>
            <MineOwnerMenu currentMineOwnerCabinState={cabinState} />
            {userInfo?.length && !inUserInMineOwnerLocation && (
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
