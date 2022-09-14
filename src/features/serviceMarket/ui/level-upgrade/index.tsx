import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { Button, Segmented, useAccountName } from 'shared';
import { createOrder } from 'app/router/paths';
import { Col, Row } from 'antd';
import { LevelUpgradeContractsTable } from 'shared/ui';
import { FilterByRole } from './model';

export const LevelUpgrade: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const accountName = useAccountName();

    return (
        <Row gutter={[0, 18]}>
            <Col span={24}>
                <Row justify="space-between">
                    <Segmented
                        options={[
                            {
                                value: FilterByRole.LookingForEngineer,
                                label: t(
                                    'pages.serviceMarket.levelUpgradeTab.lookingForEngineer'
                                ),
                            },
                            {
                                value: FilterByRole.LookingForCitizen,
                                label: t(
                                    'pages.serviceMarket.levelUpgradeTab.lookingForCitizen'
                                ),
                            },
                        ]}
                        onChange={() => {}}
                        value={undefined}
                    />
                    <Button
                        type="primary"
                        onClick={() => navigate(createOrder)}
                        icon={<PlusOutlined />}
                    >
                        {t('pages.serviceMarket.createOrder.createOrder')}
                    </Button>
                </Row>
            </Col>
            <Col span={24}>
                {accountName && (
                    <LevelUpgradeContractsTable
                        contracts={[]}
                        accountName={accountName}
                    />
                )}
            </Col>
        </Row>
    );
};
