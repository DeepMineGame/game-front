import { Col, Row } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Title, toLocaleDate, Text } from 'shared';
import { DeleteFilled } from '@ant-design/icons';
import { ContractDto } from 'entities/smartcontract';
import styles from './index.module.scss';

export const DeletedOrderStub: FC<{
    contract: ContractDto;
}> = ({ contract }) => {
    const { t } = useTranslation();

    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <Row justify="center" gutter={[0, 24]}>
                    <DeleteFilled className={styles.deletedIcon} />
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
};
