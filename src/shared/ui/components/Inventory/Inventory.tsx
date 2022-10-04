import { Button, Modal, Dropdown, useReloadPage } from 'shared';
import React, { FC, useEffect, useState } from 'react';
import { ModalProps, Space } from 'antd';
import { SortAscendingOutlined, FilterOutlined } from '@ant-design/icons';
import cn from 'classnames';

import { AssetCard, filterEquipmentByName } from 'features';
import {
    InventoryNameType,
    InventoryTab,
    UserInventoryType,
} from 'entities/smartcontract';
import styles from './styles.module.scss';
import { sortConfig, tabList, tabsNameMap } from './constants';

type InventoryProps = ModalProps & {
    name?: InventoryNameType;
    userInventory: UserInventoryType[];
    onSelect: (card: UserInventoryType) => void;
    onOpenCard: (card: UserInventoryType) => void;
    selectedTab?: InventoryTab;
};

export const Inventory: FC<InventoryProps> = ({
    name,
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
        if (props.selectedTab) {
            setSelectedTab(props.selectedTab);
        }
    }, [props.selectedTab]);

    const cards = name
        ? filterEquipmentByName(userInventory, name)
        : userInventory;

    const handleCardSelect = (card: UserInventoryType) => () => {
        onSelect(card);
    };

    const handleDetailsClick = (card: UserInventoryType) => () => {
        onOpenCard(card);
    };

    return (
        <Modal
            wideOnMobile
            {...props}
            title="Active inventory"
            className={styles.modal}
        >
            <div className={styles.container}>
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
                            <div className={styles.filterName}>{name}</div>
                        </div>
                    </div>
                    <div className={styles.size}>Size: 500/1000</div>
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
                        {cards.map((card) => (
                            <AssetCard
                                inventory={card}
                                className={styles.card}
                                onClick={handleCardSelect(card)}
                                key={card.asset_id}
                                buttonText="Details"
                                onButtonClick={handleDetailsClick(card)}
                                onRepairFinish={reload}
                                showCardBadgeStatus={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};
