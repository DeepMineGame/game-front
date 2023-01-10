import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { InventoryType } from 'entities/smartcontract';

import { $allTypes } from '../../model/filter';

const tabNamesMap: Record<InventoryType, string> = {
    [InventoryType.undefined]: 'all',
    [InventoryType.areas]: 'areas',
    [InventoryType.structures]: 'structures',
    [InventoryType.equipment]: 'equipment',
    [InventoryType.schemas]: 'schemas',
    [InventoryType.upgrade_kits]: 'upgradeKits',
    [InventoryType.badges]: 'badges',
    [InventoryType.cards]: 'cards',
    [InventoryType.packs]: 'packs',
    [InventoryType.stickers]: 'stickers',
    [InventoryType.modules]: 'modules',
};

type Props = {
    activeTab?: InventoryType;
    className?: string;
    onChange?: (activeKey: InventoryType) => void;
    isDisabled?: boolean;
};

export const TypeFilter = ({
    className = '',
    onChange,
    activeTab,
    isDisabled = false,
}: Props) => {
    const { t } = useTranslation();
    const tabList = useStore($allTypes);

    return (
        <Tabs
            activeKey={activeTab?.toString()}
            className={className}
            onChange={(selected) => onChange?.(+selected)}
            items={tabList.map((tab) => ({
                key: String(tab),
                label: t(
                    `components.common.inventoryTypes.${tabNamesMap[tab]}`
                ),
                children: null,
                disabled: isDisabled,
            }))}
        />
    );
};
