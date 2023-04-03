import { FC } from 'react';
import { Badge } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import {
    Table,
    DiscordIcon,
    neutral8,
    green6,
    gold6,
    neutral3Color,
    Link,
} from 'shared';
import { MinesOnLand } from 'entities/game-stat';
import { MineState } from 'entities/smartcontract';
import styles from './styles.module.scss';

const getStatusColor = (status: MineState) => {
    switch (status) {
        case MineState.setuped:
            return gold6;
        case MineState.deactivated:
            return neutral8;
        case MineState.activated:
            return green6;
        case MineState.unsetuped:
        default:
            return neutral3Color;
    }
};

type Props = {
    data?: MinesOnLand;
};

export const AreaManagementTableContent: FC<Props> = ({ data }) => {
    const { t } = useTranslation();

    if (!data) {
        return <div>{t('components.common.noData')}</div>;
    }

    const columns: ColumnsType<MinesOnLand> = [
        {
            dataIndex: 'mine_owner_discord',
            key: 'mine_owner_discord',
            width: 56,
            render: (discord: string) =>
                discord && (
                    <a href={discord}>
                        <DiscordIcon style={{ verticalAlign: 'middle' }} />
                    </a>
                ),
        },
        {
            title: t('Contract ID'),
            dataIndex: 'id',
            key: 'id',
            render: (contractId: string) => {
                return (
                    <Link to={`/service-market/contract/${contractId}`}>
                        {t('Contract ID')} {contractId}
                    </Link>
                );
            },
        },
        {
            title: t('components.common.mine.title'),
            dataIndex: 'mine_id',
            key: 'mine_id',
            render: (mine: string) => {
                return <div>{mine}</div>;
            },
        },
        {
            title: t('pages.areaManagement.status'),
            dataIndex: 'status',
            key: 'status',

            render: (status: MineState) => (
                <div className={styles.status}>
                    <Badge color={getStatusColor(status)} />{' '}
                    {t(`components.common.status.${MineState[status]}`)}
                </div>
            ),
        },
        {
            title: t('Mined after ejection'),
            dataIndex: 'mined_after_ejection',
            key: 'mined_after_ejection',
        },
        {
            title: t('Mine crew'),
            dataIndex: 'current_crew',
            key: 'crew',
            render: (crew) => <div className={styles.crew}>{crew}</div>,
        },
        {
            title: t('pages.areaManagement.activity'),
            dataIndex: 'activity',
            key: 'activity',
        },
    ];

    return <Table dataSource={data} columns={columns} tableLayout="fixed" />;
};
