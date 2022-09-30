import React, { FC } from 'react';
import { Space } from 'antd';
import { Menu } from 'shared';
import { ContractorMenuItems, Props } from './types';
import { ContractorMenuItem } from './components';

export * from './types';
export const ContractorMenu: FC<Props> = ({ config }) => {
    return (
        <Menu>
            <Space size="middle">
                <ContractorMenuItem
                    config={config}
                    item={ContractorMenuItems.InfoPanel}
                />
                <ContractorMenuItem
                    config={config}
                    item={ContractorMenuItems.MiningDeck}
                />
                <ContractorMenuItem
                    config={config}
                    item={ContractorMenuItems.Equipment}
                />
            </Space>
        </Menu>
    );
};
