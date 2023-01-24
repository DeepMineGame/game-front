import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import { createOrder } from 'app/router/paths';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useStore } from 'effector-react';

import { $isPressedMyContracts, setIsPressedMyContracts } from '../../models';

export const TabGrid: FC<{ filters: ReactNode; table: ReactNode }> = ({
    filters,
    table,
}) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isPressedMyContracts = useStore($isPressedMyContracts);

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
                            onClick={() => setIsPressedMyContracts()}
                        >
                            {isPressedMyContracts
                                ? t('pages.serviceMarket.serviceMarket')
                                : t('pages.serviceMarket.myContracts')}
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
