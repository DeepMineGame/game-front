import React, { FC } from 'react';
import { desktopS, Title, useMediaQuery } from 'shared';
import { useGate, useStore } from 'effector-react';
import {
    getSmartContractUserEffect,
    LOCATION_TO_ID,
} from 'entities/smartcontract';
import {
    $mineOwnerCabinState,
    MineOwnerCabinGate,
    mineOwnerCabinState,
    setInitialStateEvent,
} from '../../models/mineOwnerState';
import { useTitles } from '../hooks/useTitles';
import { useDescriptions } from '../hooks/useDescriptions';
import { useLinks } from '../hooks/useLinks';
import { Travel } from '../../../physicalShift';
import styles from './styles.module.scss';

type Props = {
    user: string;
};

export const Surface: FC<Props> = ({ user }) => {
    useGate(MineOwnerCabinGate, {
        searchParam: user,
    });
    const cabinState = useStore($mineOwnerCabinState);

    const isDesktop = useMediaQuery(desktopS);
    const titles = useTitles();
    const texts = useDescriptions();
    const buttons = useLinks();
    const onTravelSuccess = async () => {
        await getSmartContractUserEffect({ searchParam: user });

        setInitialStateEvent();
    };
    return (
        <div className={styles.surface}>
            {isDesktop && (
                <Title fontFamily="orbitron">{titles[cabinState]}</Title>
            )}
            {texts[cabinState]}
            {buttons[cabinState]}
            {cabinState === mineOwnerCabinState.isOutsideFromLocation && (
                <Travel
                    toLocationId={LOCATION_TO_ID.mine_deck}
                    onSuccess={onTravelSuccess}
                />
            )}
        </div>
    );
};
