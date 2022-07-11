import React, { FC } from 'react';
import { Badge } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import {
    Table,
    DiscordIcon,
    neutral1,
    green6,
    gold6,
    neutral3Color,
} from 'shared';
import { MineState } from 'entities/smartcontract';
import { Activity, MineCrewDataType } from '../../types';
import styles from './styles.module.scss';

const getStatusColor = (status: MineState) => {
    switch (status) {
        case MineState.setuped:
            return gold6;
        case MineState.deactivated:
            return neutral1;
        case MineState.activated:
            return green6;
        case MineState.unsetuped:
        default:
            return neutral3Color;
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
            title: t('components.common.mine.title'),
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
            render: (status: MineState) => (
                <div className={styles.status}>
                    <Badge color={getStatusColor(status)} />{' '}
                    {t(`components.common.status.${MineState[status]}`)}
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

    if (disabled || data.length === 0) {
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
