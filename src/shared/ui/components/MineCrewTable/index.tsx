import React, { FC } from 'react';
import { Tag, Badge } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { Table, neutral2, neutral1, green6, gold6 } from 'shared';
import { DiscordIcon } from './DiscordIcon';
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
    reputation: number;
    activity: Activity;
}

const getStatusColor = (status: Status) => {
    switch (status) {
        case Status.idle:
            return gold6;
        case Status.working:
            return neutral1;
        case Status.active:
            return green6;
        default:
            return green6;
    }
};

export const MineCrewTable: FC<{ data: MineCrewDataType[] }> = ({ data }) => {
    const { t } = useTranslation();

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
            render: (contractor: string, _: MineCrewDataType, idx: number) => {
                const whose = {
                    0: 'you',
                    2: 'mineOwner',
                };

                return (
                    <div className={styles.contractor}>
                        <span className={styles.contractorName}>
                            {contractor}
                        </span>
                        {(idx === 0 || idx === 2) && (
                            <Tag
                                className={styles.contractorTag}
                                color={neutral2}
                            >
                                {t(`pages.contractorMineCrew.${whose[idx]}`)}
                            </Tag>
                        )}
                    </div>
                );
            },
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
                <div className={styles.status}>
                    <Badge color={getStatusColor(status)} />{' '}
                    {t(`pages.contractorMineCrew.${Status[status]}`)}
                </div>
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
            title: t('pages.contractorMineCrew.reputation'),
            dataIndex: 'reputation',
            key: 'reputation',
            sorter: {
                compare: (a: MineCrewDataType, b: MineCrewDataType) =>
                    a.reputation - b.reputation,
                multiple: 3,
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
