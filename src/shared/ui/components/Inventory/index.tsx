import { Button, Modal, Dropdown, Card } from 'shared';
import React, { FC, useState } from 'react';
import { ModalProps, Space } from 'antd';
import { SortAscendingOutlined, FilterOutlined } from '@ant-design/icons';
import cn from 'classnames';

import { filterEquipmentByName } from 'features';
import { InventoryNameType, UserInventoryType } from 'entities/smartcontract';
import styles from './styles.module.scss';

const sortConfig = [
    {
        label: 'Rarity',
        key: 0,
    },
    {
        label: 'Level',
        key: 1,
    },
    {
        label: 'Deprecation',
        key: 2,
    },
    {
        label: 'DME Claimed',
        key: 3,
    },
    {
        label: 'Repairs',
        key: 4,
    },
];

type InventoryProps = ModalProps & {
    name?: InventoryNameType;
    userInventory: UserInventoryType[];
    onSelect: (card: UserInventoryType) => void;
    onOpenCard: (card: UserInventoryType) => void;
};

const TABS = [
    'Areas',
    'Structures',
    'Equipment',
    'Petobots',
    'Consumables',
    'Modules',
    'Bages',
];

export const Inventory: FC<InventoryProps> = ({
    name,
    userInventory,
    onSelect,
    onOpenCard,
    ...props
}) => {
    const [selectedTab, setSelectedTab] = useState('Equipment');
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
            removeFooter
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
                    {TABS.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={cn(styles.tab, {
                                [styles.tabSelected]: tab === selectedTab,
                            })}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                {cards && (
                    <div className={styles.content}>
                        {cards.map((card) => (
                            <Card
                                templateId={card.template_id}
                                className={styles.card}
                                onClick={handleCardSelect(card)}
                                key={card.asset_id}
                                initial={10}
                                current={3}
                                remained={7}
                                buttonText="Details"
                                onButtonClick={handleDetailsClick(card)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};
