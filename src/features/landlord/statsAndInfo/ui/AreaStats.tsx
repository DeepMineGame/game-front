import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/lib/table';
import { toLocaleDate } from 'shared';
import { Table } from 'antd';
import { LandlordAreaStat } from 'entities/game-stat';

export const AreaStats: FC<{
    data: LandlordAreaStat[] | null | undefined;
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
            dataIndex: 'mined',
            key: 'dme',
        },
        {
            dataIndex: 'active_mines',
            key: 'active_mines',
        },
        {
            title: t('Mining events'),
            dataIndex: 'count',
            key: 'count',
        },
        {
            dataIndex: 'crew',
            key: 'crew',
        },
    ];
    const columns: ColumnsType<LandlordAreaStat> = [
        {
            title: t('pages.contractorMiningStats.date'),
            dataIndex: 'date',
            key: 'date',
            render: (date: number) => toLocaleDate(date),
        },
        {
            title: t('DME per Ejection'),
            dataIndex: 'minings_mined',
            key: 'dme',
        },
        {
            title: t('Active mines'),
            dataIndex: 'minings_active_mines',
            key: 'minings_active_mines',
        },
        {
            title: t('Mining events'),
            dataIndex: 'minings_count',
            key: 'minings_count',
        },
        {
            title: t('Mine crew'),
            dataIndex: 'minings_crew',
            key: 'minings_crew',
        },
    ];

    const expandedRowRender = (value: LandlordAreaStat) => {
        return (
            <Table
                dataSource={value.minings}
                columns={expandedColumns}
                showHeader={false}
                bordered={false}
                tableLayout="fixed"
                pagination={false}
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
