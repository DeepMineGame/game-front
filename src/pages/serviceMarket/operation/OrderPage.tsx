import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Basket, Page, Title, Text, toLocaleDate } from 'shared';
import { LevelUpgradeOrder, MiningOrder, MineOperationOrder } from 'features';
import { Col, Row } from 'antd';
import { ContractDto, ContractType } from 'entities/smartcontract';
import { useContractState, useContractType } from 'entities/contract';

type Props = { contract: ContractDto; accountName: string };

const orders = {
    [ContractType.citizen_engineer]: LevelUpgradeOrder,
    [ContractType.mineowner_contractor]: MiningOrder,
    [ContractType.landlord_mineowner]: MineOperationOrder,
    [ContractType.undefined]: MiningOrder,
};

const pageTitle = {
    [ContractType.citizen_engineer]: 'pages.serviceMarket.levelUpgradeOrder',
    [ContractType.mineowner_contractor]: 'pages.serviceMarket.miningOrder',
    [ContractType.landlord_mineowner]: 'pages.serviceMarket.mineOperationOrder',
    [ContractType.undefined]: '',
};

export const OrderPage: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const { isDeleted } = useContractState(contract, accountName);
    const { isOrder } = useContractType(contract);

    const orderWasDeleted = isDeleted && isOrder;

    const Order = orders[contract.type];

    const deletedOrderStub = (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <Row justify="center" gutter={[0, 24]}>
                    <Basket />
                    <Col span={24}>
                        <Row justify="center">
                            <Title level={3}>
                                {t(
                                    'pages.serviceMarket.contract.orderWasDeleted'
                                )}
                            </Title>
                        </Row>
                        <Row justify="center">
                            <Text>
                                {`${t(
                                    'pages.serviceMarket.contract.documentWasDestroyedOn'
                                )} ${toLocaleDate(contract.deleted_at * 1000)}`}
                            </Text>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

    return (
        <Page headerTitle={t(pageTitle[contract.type]).toUpperCase()}>
            {orderWasDeleted ? (
                deletedOrderStub
            ) : (
                <Order contract={contract} accountName={accountName} />
            )}
        </Page>
    );
};
