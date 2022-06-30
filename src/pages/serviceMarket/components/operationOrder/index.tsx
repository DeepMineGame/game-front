import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import { Row, Col } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { KeyValueTable, Text, Title } from 'shared/ui';
import styles from './styles.module.scss';

const OperationOrder = () => {
    const { t } = useTranslation();

    const generalData = {
        [t('Order ID')]: (
            <>
                <CopyOutlined
                    style={{ fontSize: '16px', marginRight: '10px' }}
                    onClick={() => copy('457457')}
                />
                <Text className={cn(styles.accent)}>457457</Text>
            </>
        ),
        [t('Creation date')]: '18 May 2022 05:25 PM',
        [t('Duration')]: '21 days',
    };

    const landlordData = {
        [t('WAX wallet')]: 'Wkfuknf.wam',
        [t('Landlord')]: <Text className={cn(styles.accent)}>Skyfidelity</Text>,
        [t('Area')]: <Text className={cn(styles.accent)}>ID368530</Text>,
    };

    const conditionsData = {
        [t('Start of operation in')]: '2 days 14 hours',
        [t('Penalty')]: '10 DME',
        [t('Mining terms')]: 'Minimum 5 DME in 7 Days',
        [t('Fee')]: '5%',
    };

    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <Title
                        className={styles.title}
                        fontFamily="orbitron"
                        level={5}
                    >
                        {'General information'.toUpperCase()}
                    </Title>
                    <KeyValueTable
                        className={styles.table}
                        items={generalData}
                    />
                </Col>

                <Col span={12}>
                    <Title
                        className={styles.title}
                        fontFamily="orbitron"
                        level={5}
                    >
                        {'Landlord'.toUpperCase()}
                    </Title>
                    <KeyValueTable
                        className={styles.table}
                        items={landlordData}
                    />
                </Col>
                <Col span={12}>
                    <Title
                        className={styles.title}
                        fontFamily="orbitron"
                        level={5}
                    >
                        {'conditions'.toUpperCase()}
                    </Title>
                    <KeyValueTable
                        className={styles.table}
                        items={conditionsData}
                    />
                </Col>
            </Row>
        </div>
    );
};

export { OperationOrder };
