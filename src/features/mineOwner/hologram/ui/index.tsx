import React, { FC } from 'react';
import { desktopS, Loader, Title, useMediaQuery } from 'shared';
import { useGate, useStore } from 'effector-react';

import { MineOwnerCabinGate, mineOwnerCabinStateStore } from '../../models';
import { useTitles } from '../hooks/useTitles';
import { useDescriptions } from '../hooks/useDescriptions';
import { useActionsButton } from '../hooks/useActionsButton';
import { useMineOwnerCabinLoader } from '../hooks/useMineOwnerCabinLoader';
import styles from './styles.module.scss';

type Props = {
    user: string;
};

export const Hologram: FC<Props> = ({ user }) => {
    useGate(MineOwnerCabinGate, {
        searchParam: user,
    });
    const cabinState = useStore(mineOwnerCabinStateStore);

    const isDesktop = useMediaQuery(desktopS);
    const titles = useTitles();
    const descriptions = useDescriptions();
    const buttons = useActionsButton();
    const isLoading = useMineOwnerCabinLoader();

    if (isLoading) {
        return (
            <div className={styles.hologram}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={styles.hologram}>
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
