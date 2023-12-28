import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/lib/table';
import { Table, toLocaleDate } from 'shared';
import { ContractorStats } from 'entities/game-stat';
import { EngineerStatDto } from 'entities/engineer';

export const EngineerStat: FC<{
    data: EngineerStatDto[] | null | undefined;
}> = ({ data }) => {
    const { t } = useTranslation();

    const expandedColumns = [
        {
            title: t('pages.contractorMiningStats.date'),
            dataIndex: 'date',
            key: 'date',
            render: () => <div />,
        },
        {
            dataIndex: 'type',
            key: 'type',
        },
        {
            dataIndex: 'status',
            key: 'status',
        },
        {
            dataIndex: 'cost_of_execution',
            key: 'cost_of_execution',
        },
        {
            dataIndex: 'total_count',
            key: 'total_count',
        },
        {
            dataIndex: 'fails_count',
            key: 'fails_count',
        },
    ];
    const columns: ColumnsType<ContractorStats> = [
        {
            title: t('Date'),
            dataIndex: 'date',
            key: 'date',
            render: (date: number) => toLocaleDate(date),
        },
        {
            title: t('Upgrades'),
            dataIndex: 'upgrades_count',
            key: 'upgrades_count',
        },
        {
            title: t('Status'),
            dataIndex: 'upgrades_status',
            key: 'upgrades_status',
        },
        {
            title: t('DME earned'),
            dataIndex: 'upgrades_cost_of_execution',
            key: 'upgrades_cost_of_execution',
        },
        {
            title: t('Total upgrades'),
            dataIndex: 'upgrade_total_count',
            key: 'upgrade_total_count',
        },
        {
            title: t('Total fails'),
            dataIndex: 'upgrades_fails_count',
            key: 'upgrades_fails_count',
        },
    ];

    const expandedRowRender = (value: EngineerStatDto) => {
        return (
            <Table
                dataSource={value.upgrades}
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
