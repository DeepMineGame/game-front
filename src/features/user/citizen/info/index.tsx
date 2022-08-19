import { useGate, useStore } from 'effector-react';
import { Col, Empty, Row } from 'antd';
import { KeyValueTable } from 'shared';
import { FC } from 'react';
import { locationMap, smartContractUserStore } from 'entities/smartcontract';
import { balancesStore, UserGate } from 'entities/user';
import { UserAction } from '../../action/ui';
import styles from './styles.module.scss';

type Props = {
    accountName: string;
};

export const CitizenInfo: FC<Props> = ({ accountName }) => {
    useGate(UserGate, { searchParam: accountName });
    const { waxBalance, dmeBalance } = useStore(balancesStore);
    const smartContractUsers = useStore(smartContractUserStore);
    const smartContractUserData = smartContractUsers?.[0];
    return smartContractUserData ? (
        <Row gutter={16} className={styles.doubleTableWrapper}>
            <Col span={12}>
                <KeyValueTable
                    items={{
                        Location: locationMap[smartContractUserData.location],
                    }}
                />
                <UserAction
                    className={styles.userAction}
                    smartContractUserData={smartContractUserData}
                />
                <KeyValueTable
                    items={{
                        Energy: smartContractUserData.stamina,
                        Reputation: smartContractUserData.reputation,
                    }}
                />
            </Col>
            <Col span={12}>
                <KeyValueTable
                    items={{
                        'WAX Wallet': smartContractUserData.owner,
                        'WAX balance': waxBalance,
                        'DME balance': dmeBalance,
                        'DMP balance': '-',
                    }}
                />
            </Col>
        </Row>
    ) : (
        <Empty />
    );
};
