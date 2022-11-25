import { useGate, useStore } from 'effector-react';
import { Col, Empty, Row } from 'antd';
import { KeyValueTable } from 'shared';
import { locationMap, smartContractUserStore } from 'entities/smartcontract';
import { balancesStore, UserGate } from 'entities/user';
import { UserAction } from '../../../action/ui';
import styles from './styles.module.scss';

type Props = {
    accountName: string;
};

export function CitizenInfo({ accountName }: Props) {
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
                <UserAction />
                <KeyValueTable
                    items={{
                        Energy: smartContractUserData.stamina,
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
}
