import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/lib/table';
import { Table, toLocaleDate } from 'shared';
import { MineStatUnit } from 'entities/game-stat';
import styles from './styles.module.scss';

export const MiningStatsTableForMineOwner: FC<{
    data: MineStatUnit[];
}> = ({ data }) => {
    const { t } = useTranslation();

    const expandedColumns = [
        {
            title: t('pages.contractorMiningStats.date'),
            dataIndex: 'date',
            key: 'date',
            render: (date: number) => toLocaleDate(date * 1000),
            sorter: {
                compare: (a: MineStatUnit, b: MineStatUnit) => a.date - b.date,
                multiple: 1,
            },
        },
        {
            dataIndex: 'amount',
            key: 'dme',
        },
        {
            dataIndex: 'events',
            key: 'events',
            render: () => 1,
        },
        {
            dataIndex: 'breakdowns',
            key: 'breakdowns',
        },
    ];
    const columns: ColumnsType<MineStatUnit> = [
        {
            title: t('pages.contractorMiningStats.date'),
            dataIndex: 'date',
            key: 'date',
            render: (date: number) => toLocaleDate(date * 1000),
            sorter: {
                compare: (a: MineStatUnit, b: MineStatUnit) => a.date - b.date,
                multiple: 1,
            },
        },
        {
            title: t('pages.contractorMiningStats.dme'),
            dataIndex: 'events',
            key: 'dme',
            render: (events: MineStatUnit['events']) =>
                events?.reduce(
                    (acc, current) => acc + Number(current.amount),
                    0
                ),
        },
        {
            title: t('pages.contractorMiningStats.miningEvents'),
            dataIndex: 'events',
            key: 'events',
            render: (events) => events?.length,
            sorter: {
                compare: (a: MineStatUnit, b: MineStatUnit) =>
                    a.events.length - b.events.length,
                multiple: 3,
            },
        },
        {
            title: t('pages.contractorMiningStats.breakdowns'),
            dataIndex: 'events',
            key: 'breakdowns',
            render: (events: MineStatUnit['events']) =>
                events?.reduce((acc, current) => acc + current.breakdowns, 0),
        },
    ];

    const expandedRowRender = (value: MineStatUnit) => {
        return (
            <Table
                className={styles.expandedTable}
                dataSource={value.events}
                columns={expandedColumns}
                showHeader={false}
                bordered={false}
                tableLayout="fixed"
            />
        );
    };
    return (
        <Table
            dataSource={data.map((stat) => ({ ...stat, key: stat.date }))}
            columns={columns}
            tableLayout="fixed"
            expandable={{
                expandedRowRender,
            }}
        />
    );
};
