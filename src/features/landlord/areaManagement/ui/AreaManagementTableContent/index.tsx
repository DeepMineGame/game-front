import { FC } from 'react';
import { Badge, Space } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import {
    Table,
    neutral8,
    green6,
    gold6,
    neutral3Color,
    Link,
    useAccountName,
    Tag,
} from 'shared';
import { MinesOnLand } from 'entities/game-stat';
import { MineState } from 'entities/smartcontract';

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
    const accountName = useAccountName();

    if (!data) {
        return <div>{t('No data')}</div>;
    }
    const columns: ColumnsType<MinesOnLand> = [
        {
            title: t('Mine owner'),
            dataIndex: 'mine_owner',
            key: 'mine_owner',
            render: (owner) => {
                return (
                    <div>
                        {accountName === owner ? (
                            <span>
                                {owner} <Tag kind="primary">Self</Tag>
                            </span>
                        ) : (
                            owner
                        )}
                    </div>
                );
            },
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
                <Space>
                    <Badge color={getStatusColor(status)} />{' '}
                    {t(`components.common.status.${MineState[status]}`)}
                </Space>
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
            render: (crew) => <div>{crew}</div>,
        },
        {
            title: t('pages.areaManagement.activity'),
            dataIndex: 'activity',
            key: 'activity',
        },
    ];

    return <Table dataSource={data} columns={columns} tableLayout="fixed" />;
};
