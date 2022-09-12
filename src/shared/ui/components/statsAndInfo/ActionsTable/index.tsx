import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/lib/table';
import { Table, desktopS, useMediaQuery } from 'shared';
import { UserActionDto } from 'entities/gameStat';

export enum Action {
    'mining',
}

const sortData = (array: UserActionDto[]) => {
    return [...array].sort(
        (a, b) =>
            new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
    );
};

const minTableWidth = 817;

const ActionsTable: FC<{ data: UserActionDto[] }> = ({ data }) => {
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();

    const columns: ColumnsType<UserActionDto> = [
        {
            title: t('pages.actions.id'),
            dataIndex: 'id',
            key: 'id',
            width: isDesktop ? 129 : 85,
        },
        {
            title: t('pages.actions.action'),
            dataIndex: 'action',
            key: 'action',
            width: isDesktop ? 200 : 132,
        },
        {
            title: t('pages.actions.started'),
            dataIndex: 'started_at',
            key: 'started',
            width: 200,
            render: (time: number) => new Date(time).toString().slice(3, 21),
        },
        {
            title: t('pages.actions.finished'),
            dataIndex: 'finished_at',
            key: 'finished',
            width: 200,
            render: (time: number) => new Date(time).toString().slice(3, 21),
        },
        {
            title: t('pages.actions.result'),
            dataIndex: 'status',
            key: 'status',
            width: 200,
        },
    ];

    return (
        <Table
            dataSource={sortData(data)}
            columns={columns}
            pagination={{
                position: ['bottomCenter'],
                hideOnSinglePage: true,
            }}
            scroll={{ x: minTableWidth }}
        />
    );
};

export { ActionsTable };
