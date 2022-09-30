import { DesktopOutlined, ToolOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { DrillBitOutlined, MenuItem } from 'shared';
import { Config, ContractorMenuItems } from '../../types';
import { useTooltipText } from '../../hooks';

type Props = {
    item: ContractorMenuItems;
    config: Config;
};

const icons = {
    [ContractorMenuItems.InfoPanel]: () => <DesktopOutlined />,
    [ContractorMenuItems.MiningDeck]: () => <DrillBitOutlined />,
    [ContractorMenuItems.Equipment]: () => <ToolOutlined />,
};

export const ContractorMenuItem: FC<Props> = ({ item, config }) => {
    const pickTooltip = useTooltipText(config);

    return (
        <MenuItem
            onClick={config.callbacks[item]}
            icon={icons[item]()}
            disabled={config.disabledItems[item]}
            tooltipText={pickTooltip(item)}
        />
    );
};
