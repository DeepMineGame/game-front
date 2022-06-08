import { MouseEventHandler } from 'react';

export enum ContractorMenuItems {
    InfoPanel,
    MiningDeck,
    Equipment,
}

export type Config = {
    disabledItems: { [key in ContractorMenuItems]?: boolean };
    callbacks: { [key in ContractorMenuItems]?: MouseEventHandler };
    activeTooltip?: ContractorMenuItems;
};

export type Props = {
    config: Config;
};
