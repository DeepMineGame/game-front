import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import { createOrder } from 'app/router/paths';
import { FC, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useStore } from 'effector-react';
import { useAccountName } from 'shared';
import { OrderStatus } from 'entities/gameStat';
import { changeFilterEvent, filterStore } from '../../contractor-table/model';

export const TabGrid: FC<{ filters: ReactNode; table: ReactNode }> = ({
    filters,
    table,
}) => {
    const accountName = useAccountName();

    const navigate = useNavigate();
    const { t } = useTranslation();
    const filter = useStore(filterStore);
    const setMyContractsFilter = useCallback(
        (statuses?: OrderStatus) => {
            changeFilterEvent({
                ...filter,
                statuses,
                user: filter?.user ? undefined : accountName,
            });
        },
        [accountName, filter]
    );
    return (
        <Row gutter={[0, 18]}>
            <Col span={24}>
                <Row justify="space-between">
                    {filters}
                    <Space>
                        <Button
                            type="primary"
                            ghost
                            icon={<UnorderedListOutlined />}
                            onClick={() =>
                                setMyContractsFilter(
                                    filter.user ? OrderStatus.new : undefined
                                )
                            }
                        >
                            {filter.user ? 'Service market' : 'My contracts'}
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => navigate(createOrder)}
                            icon={<PlusOutlined />}
                        >
                            {t('pages.serviceMarket.createOrder.createOrder')}
                        </Button>
                    </Space>
                </Row>
            </Col>
            <Col span={24}>{table}</Col>
        </Row>
    );
};
