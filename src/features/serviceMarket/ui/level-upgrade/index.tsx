import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { Button, Segmented } from 'shared';
import { createOrder } from 'app/router/paths';
import { Col, Row, Skeleton } from 'antd';
import { useEvent, useGate, useStore } from 'effector-react';
import { LevelUpgradeContractsTable } from 'shared/ui';
import {
    changeFilterEvent,
    Filter,
    filteredLevelUpgradeContractsStore,
    filterStore,
    getLevelUpgradeContractsEffect,
    LevelUpgradeContractsGate,
} from './model';

export const LevelUpgrade: FC = () => {
    useGate(LevelUpgradeContractsGate);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const contracts = useStore(filteredLevelUpgradeContractsStore);
    const isLoading = useStore(getLevelUpgradeContractsEffect.pending);
    const filter = useStore(filterStore);

    const changeFilter = useEvent(changeFilterEvent);

    const handleFilterChange = (newFilter: string | number) => {
        changeFilter(newFilter as Filter);
    };

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <Row gutter={[0, 18]}>
            <Col span={24}>
                <Row justify="space-between">
                    <Segmented
                        options={[
                            {
                                value: Filter.LookingForEngineer,
                                label: t(
                                    'pages.serviceMarket.levelUpgradeTab.lookingForEngineer'
                                ),
                            },
                            {
                                value: Filter.LookingForCitizen,
                                label: t(
                                    'pages.serviceMarket.levelUpgradeTab.lookingForCitizen'
                                ),
                            },
                        ]}
                        onChange={handleFilterChange}
                        value={filter}
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
                <LevelUpgradeContractsTable contracts={contracts} />
            </Col>
        </Row>
    );
};
