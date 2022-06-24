import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/lib/table';
import { Table, desktopS, useMediaQuery } from 'shared';

export enum Action {
    'mining',
}

export enum Status {
    'success',
    'error',
}

export interface ActionsDataType {
    key: React.Key;
    number: number;
    action: Action;
    started: number;
    finished: number;
    result: Status;
}

const sortData = (array: ActionsDataType[]) => {
    return [...array].sort((a, b) => b.started - a.started);
};

const minTableWidth = 817;

const ActionsTable: FC<{ data: ActionsDataType[] }> = ({ data }) => {
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();

    const columns: ColumnsType<ActionsDataType> = [
        {
            title: t('pages.actions.number'),
            dataIndex: 'number',
            key: 'number',
            width: isDesktop ? 129 : 85,
        },
        {
            title: t('pages.actions.action'),
            dataIndex: 'action',
            key: 'action',
            width: isDesktop ? 200 : 132,
            render: (action: Action) => t(`pages.actions.${Action[action]}`),
        },
        {
            title: t('pages.actions.started'),
            dataIndex: 'started',
            key: 'started',
            width: 200,
            render: (time: number) => new Date(time).toString().slice(3, 21),
        },
        {
            title: t('pages.actions.finished'),
            dataIndex: 'finished',
            key: 'finished',
            width: 200,
            render: (time: number) => new Date(time).toString().slice(3, 21),
        },
        {
            title: t('pages.actions.result'),
            dataIndex: 'result',
            key: 'result',
            width: 200,
            render: (status: Status) =>
                t(`components.common.status.${Status[status]}`),
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
