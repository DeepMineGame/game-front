import { FC } from 'react';
import { Row, Col } from 'antd';
import { useStore } from 'effector-react';
import { useUserRoles } from 'shared';
import { rolesStore } from 'entities/smartcontract';
import { useOrderDelete, useOrderSign } from 'entities/order';
import {
    GeneralInfo,
    Conditions,
    Citizen,
    Engineer,
} from '../../ui/contract/level-upgrade';
import { DeleteOrder, SignLevelUpgradeOrder } from '../../ui/actions';
import { ContractProps } from '../../types';

const creators = {
    engineer: Engineer,
    citizen: Citizen,
} as const;

const LevelUpgradeOrder: FC<ContractProps> = ({ contract, accountName }) => {
    const roles = useStore(rolesStore) || [];
    const userRoles = useUserRoles(roles);
    const { canDeleteOrder } = useOrderDelete(contract, accountName);
    const creatorRole = contract.executor ? 'engineer' : 'citizen';
    const Creator = creators[creatorRole];
    const { canSignLevelUpgradeOrder } = useOrderSign(
        contract,
        accountName,
        userRoles
    );

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
                            {/* {canSignLevelUpgradeOrder && ( */}
                            <SignLevelUpgradeOrder
                                contract={contract}
                                accountName={accountName}
                            />
                            {/* )} */}
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
