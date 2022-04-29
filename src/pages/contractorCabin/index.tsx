import React, { FC } from 'react';
import { ContractorMenu, ContractorMenuItems, Header } from 'shared';
import { useNavigate } from 'react-router-dom';
import { equipmentSet } from '../constants';
import styles from './styles.module.scss';

export const ContractorCabin: FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.cabinBackground}>
            <Header />
            <ContractorMenu
                config={{
                    disabledItems: {
                        [ContractorMenuItems.InfoPanel]: true,
                        [ContractorMenuItems.MiningDeck]: true,
                    },
                    callbacks: {
                        [ContractorMenuItems.InfoPanel]: () => {},
                    },
                    activeTooltip: ContractorMenuItems.InfoPanel,
                    primaryButtonVisibility: true,
                    primaryButtonCallback: () => navigate(equipmentSet),
                }}
            />
        </div>
    );
};
