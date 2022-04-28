import React, { FC } from 'react';
import { ContractorMenu, ContractorMenuItems, Header } from 'shared';
import styles from './styles.module.scss';

export const ContractorCabin: FC = () => {
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
                }}
            />
        </div>
    );
};
