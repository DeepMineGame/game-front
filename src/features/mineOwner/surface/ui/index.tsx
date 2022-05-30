import React, { FC } from 'react';
import { desktopS, Title, useMediaQuery } from 'shared';
import { useGate, useStore } from 'effector-react';
import { $mineOwnerCabinState, MineOwnerCabinGate } from '../../model';
import { useTitles } from '../hooks/useTitles';
import { useDescriptions } from '../hooks/useDescriptions';
import { useLinks } from '../hooks/useLinks';
import styles from './styles.module.scss';

type Props = {
    user: string;
};

export const Surface: FC<Props> = ({ user }) => {
    useGate(MineOwnerCabinGate, {
        searchParam: user,
    });

    const isDesktop = useMediaQuery(desktopS);
    const cabinState = useStore($mineOwnerCabinState);
    const titles = useTitles();
    const texts = useDescriptions();
    const buttons = useLinks();

    return (
        <div className={styles.surface}>
            {isDesktop && (
                <Title fontFamily="orbitron">{titles[cabinState]}</Title>
            )}
            {texts[cabinState]}
            {buttons[cabinState]}
        </div>
    );
};
