import React, { FC } from 'react';
import { Badge } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { Table, DiscordIcon, neutral1, green6, gold6 } from 'shared';
import styles from './styles.module.scss';

export enum Status {
    'idle',
    'working',
    'active',
}

export enum Activity {
    'low',
    'average',
    'high',
}

export interface MineCrewDataType {
    discord: string;
    mine: string;
    status: Status;
    ejection: number;
    crew: [number, number];
    activity: Activity;
}

const getStatusColor = (status: Status) => {
    switch (status) {
        case Status.idle:
            return gold6;
        case Status.working:
            return neutral1;
        case Status.active:
        default:
            return green6;
    }
};

type Props = {
    data?: MineCrewDataType[];
    disabled?: boolean;
};

export const AreaManagementTableContent: FC<Props> = ({ data, disabled }) => {
    const { t } = useTranslation();

    if (!data) {
        return <div>{t('components.common.noData')}</div>;
    }

    const columns: ColumnsType<MineCrewDataType> = [
        {
            dataIndex: 'discord',
            key: 'discord',
            width: 56,
            render: (discord: string) =>
                discord && (
                    <a href={discord}>
                        <DiscordIcon style={{ verticalAlign: 'middle' }} />
                    </a>
                ),
        },
        {
            title: t('pages.areaManagement.mine'),
            dataIndex: 'mine',
            key: 'mine',
            render: (mine: string) => {
                return <div className={styles.mine}>{mine}</div>;
            },
        },
        {
            title: t('pages.areaManagement.status'),
            dataIndex: 'status',
            key: 'status',
            sorter: {
                compare: (a: MineCrewDataType, b: MineCrewDataType) =>
                    a.status - b.status,
                multiple: 1,
            },
            render: (status: Status) => (
                <div className={styles.status}>
                    <Badge color={getStatusColor(status)} />{' '}
                    {t(`pages.contractorMineCrew.${Status[status]}`)}
                </div>
            ),
        },
        {
            title: t('pages.areaManagement.dmePerEjection'),
            dataIndex: 'ejection',
            key: 'ejection',
            sorter: {
                compare: (a: MineCrewDataType, b: MineCrewDataType) =>
                    a.ejection - b.ejection,
                multiple: 2,
            },
        },
        {
            title: t('pages.areaManagement.crew'),
            dataIndex: 'crew',
            key: 'crew',
            sorter: {
                compare: (a: MineCrewDataType, b: MineCrewDataType) =>
                    a.crew[0] - b.crew[0],
                multiple: 3,
            },
            render: (crew: [number, number]) => (
                <div className={styles.crew}>
                    {crew[0]}/{crew[1]}
                </div>
            ),
        },
        {
            title: t('pages.areaManagement.activity'),
            dataIndex: 'activity',
            key: 'activity',
            sorter: {
                compare: (a: MineCrewDataType, b: MineCrewDataType) =>
                    a.activity - b.activity,
                multiple: 4,
            },
            render: (activity: Activity) =>
                t(`pages.contractorMineCrew.${Activity[activity]}`),
        },
    ];

    if (disabled) {
        return (
            <Table
                className={styles.disabled}
                columns={columns}
                tableLayout="fixed"
            />
        );
    }

    return <Table dataSource={data} columns={columns} tableLayout="fixed" />;
};
