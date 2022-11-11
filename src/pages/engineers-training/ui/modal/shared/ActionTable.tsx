import {
    ClockCircleOutlined,
    ApartmentOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { Table, Text } from 'shared';
import { rarityMap } from 'entities/smartcontract';
import { schemaNameMap } from '../../constants';
import { TrainingNftFull } from '../../../model/types';

import styles from './styles.module.scss';

type Props = {
    nftData: TrainingNftFull;
};

export const ActionTable = ({
    nftData: { schemaType, rarity, level },
}: Props) => {
    const { t } = useTranslation();
    const time = '00:15:00';
    const energy = 30;

    const columns = [
        {
            dataIndex: 'icon',
            width: 56,
            render: (Icon: React.ForwardRefExoticComponent<any>) => (
                <Icon style={{ fontSize: '21px', verticalAlign: 'middle' }} />
            ),
        },
        {
            dataIndex: 'title',
        },
        {
            dataIndex: 'value',
            align: 'right' as const,
            render: (value: string) => <b>{value}</b>,
        },
    ];

    const dataSource = [
        {
            key: 'scheme',
            icon: ApartmentOutlined,
            title: t('pages.engineersTraining.scheme'),
            value: [
                `${schemaNameMap[schemaType]}`,
                rarity && rarityMap[rarity],
                `${t('components.common.level')} ${level}`,
            ]
                .filter(Boolean)
                .join(', '),
        },
        {
            key: 'time',
            icon: ClockCircleOutlined,
            title: t('kit.timer.time'),
            value: time,
        },
        {
            key: 'energy',
            icon: ThunderboltOutlined,
            title: t('kit.timer.energy'),
            value: energy,
        },
    ];

    return (
        <Row gutter={[0, 8]}>
            <Col span={24}>
                <Text className={styles.tableTitle}>
                    {t('components.common.actionModal.descriptionTime')}
                </Text>
            </Col>
            <Col span={24}>
                <Table
                    showHeader={false}
                    pagination={false}
                    dataSource={dataSource}
                    columns={columns}
                />
            </Col>
        </Row>
    );
};
