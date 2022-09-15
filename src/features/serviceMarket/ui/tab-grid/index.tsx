import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { createOrder } from 'app/router/paths';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export const TabGrid: FC<{ filters: ReactNode; table: ReactNode }> = ({
    filters,
    table,
}) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Row gutter={[0, 18]}>
            <Col span={24}>
                <Row justify="space-between">
                    {filters}
                    <Button
                        type="primary"
                        onClick={() => navigate(createOrder)}
                        icon={<PlusOutlined />}
                    >
                        {t('pages.serviceMarket.createOrder.createOrder')}
                    </Button>
                </Row>
            </Col>
            <Col span={24}>{table}</Col>
        </Row>
    );
};
