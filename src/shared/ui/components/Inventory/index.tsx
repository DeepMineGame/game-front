import { Button, CardHolder, Modal, Dropdown } from 'shared';
import React, { FC } from 'react';
import { ModalProps, Space } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';
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
];
export const Inventory: FC<ModalProps> = (props) => {
    return (
        <Modal wideOnMobile {...props} title="Active inventory">
            <Dropdown items={sortConfig}>
                <Space className={styles.space}>
                    <SortAscendingOutlined className={styles.icon} />
                    <Button type="link">Sort by</Button>
                </Space>
            </Dropdown>
            <CardHolder onClick={() => {}} />{' '}
        </Modal>
    );
};
