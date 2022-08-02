import React, { FC } from 'react';
import { desktopS, Title, useMediaQuery } from 'shared';
import { useGate, useStore } from 'effector-react';

import {
    $mineOwnerCabinState,
    MineOwnerCabinGate,
} from '../../models/mineOwnerState';
import { useTitles } from '../hooks/useTitles';
import { useDescriptions } from '../hooks/useDescriptions';
import { useActionsButton } from '../hooks/useActionsButton';
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
    const descriptions = useDescriptions();
    const buttons = useActionsButton();

    return (
        <div className={styles.surface}>
            {isDesktop && (
                <Title fontFamily="orbitron" className={styles.title}>
                    {titles[cabinState]}
                </Title>
            )}
            {descriptions[cabinState]}
            {buttons[cabinState]}
        </div>
    );
};
