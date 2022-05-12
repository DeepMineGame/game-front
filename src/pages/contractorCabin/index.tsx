import React, { FC } from 'react';
import {
    ContractorMenu,
    ContractorMenuItems,
    Header,
    Monitor,
    useDimensions,
} from 'shared';
import { useNavigate } from 'react-router-dom';
import { equipmentSet } from '../constants';

import styles from './styles.module.scss';
// import { Welcome } from './components/Welcome';
// import { Setup } from './components/Setup';
// import { Ready } from './components/Ready';
// import { MiningOver } from './components/MiningOver';
// import { MiningResults } from './components/MiningResults';
// import { MiningProgress } from './components/MiningProgress';
import { MiningError } from './components/MiningError';

// const equipments = [
//     {
//         name: 'Cutter',
//         isAvailable: true,
//     },
//     {
//         name: 'Delaminator',
//         isAvailable: false,
//     },
//     {
//         name: 'DME WIRE',
//         isAvailable: false,
//     },
//     {
//         name: 'Plunging box',
//         isAvailable: true,
//     },
//     {
//         name: 'Wandering reactor',
//         isAvailable: false,
//     },
// ];

export const ContractorCabin = () => {
    const { width, height } = useDimensions();
    const navigate = useNavigate();
    const bgRatio = 1366 / 712;
    const isBgWidthHidden = width > height * bgRatio;

    return (
        <div className={styles.cabinBackground}>
            <Monitor
                className={
                    isBgWidthHidden
                        ? styles.cabinMonitorWidth
                        : styles.cabinMonitorHeight
                }
            >
                {/* <SignContract /> */}
                {/* <Welcome equipments={equipments} /> */}
                {/* <Setup hasShift /> */}
                {/* <Ready /> */}
                {/* <MiningOver /> */}
                {/* <MiningResults /> */}
                {/* <MiningProgress msUntil={15 * 60 * 60 * 1000} /> */}
                <MiningError />
            </Monitor>
            <Header />
            <ContractorMenu
                config={{
                    disabledItems: {
                        [ContractorMenuItems.InfoPanel]: true,
                        [ContractorMenuItems.MiningDeck]: false,
                    },
                    callbacks: {
                        [ContractorMenuItems.InfoPanel]: () => {},
                        [ContractorMenuItems.MiningDeck]: () =>
                            navigate('/mining'),
                    },
                    activeTooltip: ContractorMenuItems.InfoPanel,
                    primaryButtonVisibility: true,
                    primaryButtonCallback: () => navigate(equipmentSet),
                }}
            />
        </div>
    );
};
