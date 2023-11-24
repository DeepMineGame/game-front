import { Button, Modal, Dropdown, useReloadPage, Card, Card2 } from 'shared';
import React, { FC, useEffect, useState } from 'react';
import { ModalProps, Space } from 'antd';
import { SortAscendingOutlined, FilterOutlined } from '@ant-design/icons';
import cn from 'classnames';

import { filterEquipmentByName } from 'features';
import { InventoryNameType, InventoryTab } from 'entities/smartcontract';
import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import styles from './styles.module.scss';
import { sortConfig, tabList, tabsNameMap } from './constants';

type InventoryProps = ModalProps & {
    equipmentTypeFilter?: InventoryNameType | InventoryNameType[];
    userInventory: MergedInventoryWithAtomicAssets;
    onSelect: (card: MergedInventoryWithAtomicAssets[number]) => void;
    onOpenCard: (card: MergedInventoryWithAtomicAssets[number]) => void;
    selectedTab?: InventoryTab;
};

export const Inventory: FC<InventoryProps> = ({
    equipmentTypeFilter,
    userInventory,
    onSelect,
    onOpenCard,
    ...props
}) => {
    const reload = useReloadPage();
    const [selectedTab, setSelectedTab] = useState(
        props.selectedTab ?? InventoryTab.equipment
    );

    useEffect(() => {
        if (props.selectedTab !== undefined) {
            setSelectedTab(props.selectedTab);
        }
    }, [props.selectedTab]);

    const cards = equipmentTypeFilter
        ? filterEquipmentByName(userInventory, equipmentTypeFilter)
        : userInventory;
    const handleCardSelect =
        (card: MergedInventoryWithAtomicAssets[number]) => () => {
            onSelect(card);
        };

    const handleDetailsClick =
        (card: MergedInventoryWithAtomicAssets[number]) => () => {
            onOpenCard(card);
        };

    return (
        <Modal
            wideOnMobile
            {...props}
            title="Active inventory"
            className={styles.modal}
        >
            <div>
                <div className={styles.filterHeader}>
                    <div className={styles.filterHeaderLeft}>
                        <Dropdown items={sortConfig}>
                            <Space className={styles.space}>
                                <SortAscendingOutlined
                                    className={styles.sortIcon}
                                />
                                <Button type="link">Sort by</Button>
                            </Space>
                        </Dropdown>
                        <div className={styles.filter}>
                            <FilterOutlined className={styles.filterIcon} />
                            <div className={styles.filterText}>Filters</div>
                            <div className={styles.filterName}>
                                {Array.isArray(equipmentTypeFilter)
                                    ? equipmentTypeFilter.join(', ')
                                    : equipmentTypeFilter}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.navbar}>
                    {tabList.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={cn(styles.tab, {
                                [styles.tabSelected]: tab === selectedTab,
                            })}
                        >
                            {tabsNameMap[tab]}
                        </div>
                    ))}
                </div>
                {cards && (
                    <div className={styles.content}>
                        {cards.map((card) => {
                            return 'data' in card ? (
                                <Card
                                    inventory={card}
                                    className={styles.card}
                                    onClick={handleCardSelect(card)}
                                    key={card.asset_id}
                                    buttonText="Details"
                                    onButtonClick={handleDetailsClick(card)}
                                    onRepairFinish={reload}
                                    showCardBadgeStatus={false}
                                />
                            ) : (
                                <Card2
                                    inventory={card}
                                    className={styles.card}
                                    onClick={handleCardSelect(card)}
                                    // @ts-ignore
                                    key={card.asset_id}
                                    buttonText="Details"
                                    onButtonClick={handleDetailsClick(card)}
                                    onRepairFinish={reload}
                                    showCardBadgeStatus={false}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </Modal>
    );
};
