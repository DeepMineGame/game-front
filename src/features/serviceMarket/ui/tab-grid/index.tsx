import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import { createOrder } from 'app/router/paths';
import { FC, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useStore } from 'effector-react';
import { useAccountName } from 'shared';
import { changeFilterEvent, filterStore } from '../../contracts-table/model';

export const TabGrid: FC<{ filters: ReactNode; table: ReactNode }> = ({
    filters,
    table,
}) => {
    const accountName = useAccountName();

    const navigate = useNavigate();
    const { t } = useTranslation();
    const filter = useStore(filterStore);
    const setMyContractsFilter = useCallback(() => {
        changeFilterEvent({
            ...filter,
            user: accountName,
        });
    }, [accountName, filter]);
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
                            onClick={setMyContractsFilter}
                        >
                            My contracts
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
