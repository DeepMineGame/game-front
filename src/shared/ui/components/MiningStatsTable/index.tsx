import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/lib/table';
import { Link, Table, toLocaleDate } from 'shared';
import { ContractorStats, MineEvent, MineStatUnit } from 'entities/game-stat';
import styles from './styles.module.scss';

export const MiningStatsTable: FC<{
    data: ContractorStats[] | null | undefined;
}> = ({ data }) => {
    const { t } = useTranslation();

    const expandedColumns = [
        {
            title: t('pages.contractorMiningStats.date'),
            dataIndex: 'date',
            key: 'date',
            render: (date: number, event: MineEvent) =>
                'contractor' in event ? (
                    <Link to={`/user/${event.contractor}`}>
                        {event.contractor}
                    </Link>
                ) : (
                    toLocaleDate(date)
                ),
            sorter: {
                compare: (a: MineStatUnit, b: MineStatUnit) => a.date - b.date,
                multiple: 1,
            },
        },
        {
            dataIndex: 'mined',
            key: 'dme',
        },
        {
            dataIndex: 'events',
            key: 'events',
            render: () => 1,
        },
        {
            title: t('Mining time'),
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: t('Mining failures'),
            dataIndex: 'failed_count',
            key: 'failed_count',
        },
        {
            dataIndex: 'breakdowns',
            key: 'breakdowns',
        },
    ];
    const columns: ColumnsType<ContractorStats> = [
        {
            title: t('pages.contractorMiningStats.date'),
            dataIndex: 'date',
            key: 'date',
            render: (date: number) => toLocaleDate(date),
        },
        {
            title: t('pages.contractorMiningStats.dme'),
            dataIndex: 'minings_mined',
            key: 'dme',
        },
        {
            title: t('pages.contractorMiningStats.miningEvents'),
            dataIndex: 'minings',
            key: 'minings',
            render: (events) => events?.length,
            sorter: {
                compare: (a: ContractorStats, b: ContractorStats) =>
                    a.minings_count - b.minings_count,
                multiple: 3,
            },
        },
        {
            title: t('Mining time'),
            dataIndex: 'minings_duration',
            key: 'minings_duration',
        },
        {
            title: t('Mining failures'),
            dataIndex: 'minings_failed',
            key: 'minings_failed',
        },
        {
            title: t('Tools breakdowns'),
            dataIndex: 'minings_breakdowns',
            key: 'minings_breakdowns',
        },
    ];

    const expandedRowRender = (value: ContractorStats) => {
        return (
            <Table
                className={styles.expandedTable}
                dataSource={value.minings}
                columns={expandedColumns}
                showHeader={false}
                bordered={false}
                tableLayout="fixed"
            />
        );
    };
    return (
        <Table
            dataSource={data?.map((stat) => ({ ...stat, key: stat.date }))}
            columns={columns}
            tableLayout="fixed"
            expandable={{
                expandedRowRender,
            }}
        />
    );
};
