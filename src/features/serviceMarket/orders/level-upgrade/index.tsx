import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import { useOrderDelete } from 'entities/order';
import { Button } from 'shared/ui/ui-kit';
import {
    GeneralInfo,
    Conditions,
    Citizen,
    Engineer,
} from '../../ui/contract/level-upgrade';
import { DeleteOrder } from '../../ui/actions';
import { ContractProps } from '../../types';

const creators = {
    engineer: Engineer,
    citizen: Citizen,
} as const;

const LevelUpgradeOrder: FC<ContractProps> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const { canDeleteOrder } = useOrderDelete(contract, accountName);
    const creatorRole = contract.executor ? 'engineer' : 'citizen';
    const Creator = creators[creatorRole];

    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <GeneralInfo
                    isOrder
                    contract={contract}
                    accountName={accountName}
                />
            </Col>
            <Col xs={24} md={12}>
                <Conditions contract={contract} />
            </Col>
            <Col xs={24} md={12}>
                <Row gutter={[32, 32]}>
                    <Col span={24}>
                        <Creator
                            contract={contract}
                            accountName={accountName}
                        />
                    </Col>
                    <Col span={24}>
                        <Row justify="end">
                            {/* todo: sign order */}
                            <Button type="primary" size="large" block>
                                {t('pages.serviceMarket.order.signOrder')}
                            </Button>

                            {canDeleteOrder && (
                                <DeleteOrder
                                    accountName={accountName}
                                    contractId={contract.id}
                                />
                            )}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export { LevelUpgradeOrder };
