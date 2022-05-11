import React, { FC } from 'react';
import { Space } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Menu, MenuItem } from 'shared';
import { ContractorMenuItems, Props } from './types';
import { ContractorMenuItem } from './components';

export * from './types';
export const ContractorMenu: FC<Props> = ({ config }) => {
    return (
        <Menu>
            <Space>
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
                {config.primaryButtonVisibility && (
                    <MenuItem
                        onClick={config.primaryButtonCallback}
                        icon={<RightOutlined />}
                        type="primary"
                    />
                )}
            </Space>
        </Menu>
    );
};
