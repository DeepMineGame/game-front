import Icon, { DesktopOutlined, ToolOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { DrillBit, MenuItem } from 'shared';
import { Config, ContractorMenuItems } from '../../types';
import { useTooltipText } from '../../hooks';

type Props = {
    item: ContractorMenuItems;
    config: Config;
};

const icons = {
    [ContractorMenuItems.InfoPanel]: () => <DesktopOutlined />,
    [ContractorMenuItems.MiningDeck]: () => <Icon component={DrillBit} />,
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
