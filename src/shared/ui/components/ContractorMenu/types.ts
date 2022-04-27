import { MouseEventHandler } from 'react';

export enum ContractorMenuItems {
    InfoPanel,
    MiningDeck,
    Equipment,
}

export type Config = {
    disabledItems: { [key in ContractorMenuItems]?: boolean };
    primaryButtonVisibility: boolean;
    callbacks: { [key in ContractorMenuItems]?: MouseEventHandler };
    activeTooltip?: ContractorMenuItems;
    primaryButtonCallback?: MouseEventHandler;
};
export type Props = {
    config: Config;
};
