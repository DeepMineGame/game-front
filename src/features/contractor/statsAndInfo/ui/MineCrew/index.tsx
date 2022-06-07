import React from 'react';
import { useTranslation } from 'react-i18next';

import { Table } from 'shared';
import type { ColumnsType, TableProps } from 'antd/lib/table';
import styles from './styles.module.scss';

const contractorsNumber = 15;

enum Activity {
    high,
    average,
    low,
}

enum Status {
    Active,
    Working,
    Idle,
}
interface DataType {
    key: React.Key;
    status: Status;
    dmePerEjection: number;
    reputation: number;
    activity: Activity;
}

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];

// TODO: реализовать
export const MineCrew = () => {
    const { t } = useTranslation();

    const columns: ColumnsType<DataType> = [
        {
            title: t('pages.contractorMineCrew.contractor'),
            dataIndex: 'contractor',
        },
        {
            title: t('pages.contractorMineCrew.status'),
            dataIndex: 'status',
            sorter: {
                compare: (a, b) => a.status - b.status,
                multiple: 1,
            },
        },
        {
            title: t('pages.contractorMineCrew.dmePerEjection'),
            dataIndex: 'dmePerEjection',
            sorter: {
                compare: (a, b) => a.dmePerEjection - b.dmePerEjection,
                multiple: 2,
            },
        },
        {
            title: t('pages.contractorMineCrew.reputation'),
            dataIndex: 'reputation',
            sorter: {
                compare: (a, b) => a.reputation - b.reputation,
                multiple: 3,
            },
        },
        {
            title: t('pages.contractorMineCrew.activity'),
            dataIndex: 'activity',
        },
    ];

    return (
        <div className={styles.mineCrew}>
            <div className={styles.contractors}>
                {t('pages.contractorMineCrew.contractors')}{' '}
                <span>{contractorsNumber}</span>
            </div>
            <Table
                className={styles.table}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};
