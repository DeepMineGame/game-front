import React, { FC } from 'react';
import { ContractorMenu, ContractorMenuItems, Header, Monitor } from 'shared';
import { useNavigate } from 'react-router-dom';
import { equipmentSet } from '../constants';
import styles from './styles.module.scss';

export const ContractorCabin: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.cabinBackground}>
            <Monitor
                status={{ text: 'Mining: not active', name: 'lol' }}
                className={styles.cabinMonitor}
            />
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
