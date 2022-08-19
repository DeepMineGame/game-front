import { useTranslation } from 'react-i18next';
import { Config, ContractorMenuItems } from './types';

export const useTooltipText = (config: Config) => {
    const { t } = useTranslation();

    const tooltipText = {
        [ContractorMenuItems.InfoPanel]: t(
            'components.contractorMenu.infoPanelTooltip'
        ),
        [ContractorMenuItems.MiningDeck]: t(
            'components.contractorMenu.miningDeskTooltip'
        ),
        [ContractorMenuItems.Equipment]: t(
            'components.contractorMenu.equipmentTooltip'
        ),
    };

    return (item?: ContractorMenuItems) => {
        if (item !== undefined && config.activeTooltip === item) {
            return tooltipText[item];
        }
        return undefined;
    };
};
