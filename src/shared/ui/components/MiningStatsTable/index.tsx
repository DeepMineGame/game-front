import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/lib/table';
import { Table, secondsToTime, toLocaleDate } from 'shared';
import styles from './styles.module.scss';

export interface MiningStatsDataType {
    key: React.Key;
    date: number;
    dme: number;
    events: number;
    time: number;
    fossil: number;
    breakdowns: number;
}

export interface MiningStatsDataTypeExpanded
    extends Omit<MiningStatsDataType, 'date'> {
    date: string;
}

const expandedColumns = [
    {
        dataIndex: 'date',
        key: 'date',
    },
    {
        dataIndex: 'dme',
        key: 'dme',
    },
    {
        dataIndex: 'events',
        key: 'events',
    },
    {
        dataIndex: 'time',
        key: 'time',
        render: (time: number) => secondsToTime(time * 1000),
    },
    {
        dataIndex: 'fossil',
        key: 'fossil',
    },
    {
        dataIndex: 'breakdowns',
        key: 'breakdowns',
    },
];

export const MiningStatsTable: FC<{
    data: MiningStatsDataType[];
    expandedData: MiningStatsDataTypeExpanded[];
}> = ({ data, expandedData }) => {
    const { t } = useTranslation();

    const expandedRowRender = () => {
        return (
            <Table
                className={styles.expandedTable}
                dataSource={expandedData}
                columns={expandedColumns}
                showHeader={false}
                bordered={false}
                tableLayout="fixed"
            />
        );
    };

    const columns: ColumnsType<MiningStatsDataType> = [
        {
            title: t('pages.contractorMiningStats.date'),
            dataIndex: 'date',
            key: 'date',
            render: (date: number) => toLocaleDate(date),
            sorter: {
                compare: (a: MiningStatsDataType, b: MiningStatsDataType) =>
                    a.date - b.date,
                multiple: 1,
            },
        },
        {
            title: t('pages.contractorMiningStats.dme'),
            dataIndex: 'dme',
            key: 'dme',
            sorter: {
                compare: (a: MiningStatsDataType, b: MiningStatsDataType) =>
                    a.dme - b.dme,
                multiple: 2,
            },
        },
        {
            title: t('pages.contractorMiningStats.miningEvents'),
            dataIndex: 'events',
            key: 'events',
            sorter: {
                compare: (a: MiningStatsDataType, b: MiningStatsDataType) =>
                    a.events - b.events,
                multiple: 3,
            },
        },
        {
            title: t('pages.contractorMiningStats.miningTime'),
            dataIndex: 'time',
            key: 'time',
            render: (time: number) => secondsToTime(time * 1000),
            sorter: {
                compare: (a: MiningStatsDataType, b: MiningStatsDataType) =>
                    a.time - b.time,
                multiple: 4,
            },
        },
        {
            title: t('pages.contractorMiningStats.fossilMined'),
            dataIndex: 'fossil',
            key: 'fossil',
            sorter: {
                compare: (a: MiningStatsDataType, b: MiningStatsDataType) =>
                    a.fossil - b.fossil,
                multiple: 5,
            },
        },
        {
            title: t('pages.contractorMiningStats.breakdowns'),
            dataIndex: 'breakdowns',
            key: 'breakdowns',
            sorter: {
                compare: (a: MiningStatsDataType, b: MiningStatsDataType) =>
                    a.breakdowns - b.breakdowns,
                multiple: 6,
            },
        },
    ];
    return (
        <Table
            dataSource={data}
            columns={columns}
            tableLayout="fixed"
            expandable={{
                expandedRowRender,
            }}
        />
    );
};
