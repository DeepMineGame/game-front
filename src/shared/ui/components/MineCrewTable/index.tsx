import React, { FC } from 'react';
import { Badge, Space } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { Table, DiscordIcon, neutral8, green6, gold6, Link } from 'shared';
import styles from './styles.module.scss';

enum Status {
    'idle',
    'working',
    'active',
}

enum Activity {
    'low',
    'average',
    'high',
}

export interface MineCrewDataType {
    key: React.Key;
    discord: string;
    contractor: string;
    status: Status;
    ejection: number;
    activity: Activity;
}

const getStatusColor = (status: Status) => {
    switch (status) {
        case Status.idle:
            return gold6;
        case Status.working:
            return neutral8;
        case Status.active:
            return green6;
        default:
            return green6;
    }
};

export const MineCrewTable: FC<{ data?: MineCrewDataType[] }> = ({ data }) => {
    const { t } = useTranslation();

    if (!data) {
        return null;
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
            title: t('pages.contractorMineCrew.contractor'),
            dataIndex: 'contractor',
            key: 'contractor',
            render: (contractor: string) => (
                <div className={styles.contractor}>
                    <Link to={`/user/${contractor}`}>{contractor}</Link>
                </div>
            ),
        },
        {
            title: t('pages.contractorMineCrew.status'),
            dataIndex: 'status',
            key: 'status',
            sorter: {
                compare: (a: MineCrewDataType, b: MineCrewDataType) =>
                    a.status - b.status,
                multiple: 1,
            },
            render: (status: Status) => (
                <Space>
                    <Badge color={getStatusColor(status)} />
                    {t(`components.common.status.${Status[status]}`)}
                </Space>
            ),
        },
        {
            title: t('pages.contractorMineCrew.dmePerEjection'),
            dataIndex: 'ejection',
            key: 'ejection',
            sorter: {
                compare: (a: MineCrewDataType, b: MineCrewDataType) =>
                    a.ejection - b.ejection,
                multiple: 2,
            },
        },
        {
            title: t('pages.contractorMineCrew.activity'),
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

    return <Table dataSource={data} columns={columns} tableLayout="fixed" />;
};
