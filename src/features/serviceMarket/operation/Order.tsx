import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSmartContractAction } from 'features';
import { Button, useUserRoles } from 'shared';
import { serviceMarket } from 'app/router/paths';
import {
    ContractDto,
    ContractStatus,
    ContractType,
    rolesStore,
    terminateContract,
} from 'entities/smartcontract';
import {
    SignContractorOrder,
    SignLandlordOrder,
    SignMineOwnerContractorOrder,
    SignMineOwnerOrder,
} from '../ui';
import { LandlordTable } from './ui/LandlordTable';
import { ConditionTable } from './ui/ConditionsTable';
import { MineOwnerTable } from './ui/MineownerTable';
import { GeneralDataTable } from './ui/GeneralDataTable';
import { ContractorTable } from './ui/ContractorTable';
import styles from './styles.module.scss';

type Props = { contract: ContractDto; accountName: string };

const Order: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const roles = useStore(rolesStore) || [];
    const userRoles = useUserRoles(roles);

    const isLandlordMineOwnerOrder =
        contract.type === ContractType.landlord_mineowner;
    const isMiningOrder = contract.type === ContractType.mineowner_contractor;

    const isExecutorSigned =
        contract.status === ContractStatus.signed_by_executor;
    const isClientSigned = contract.status === ContractStatus.signed_by_client;
    const isUserNotClient = contract.client !== accountName;
    const isUserNotExecutor = contract.executor !== accountName;

    const canSignContractorOrder =
        isMiningOrder &&
        isExecutorSigned &&
        isUserNotExecutor &&
        userRoles.isMineOwner;
    const canSignMineOwnerContractorOrder =
        isMiningOrder &&
        isClientSigned &&
        isUserNotClient &&
        userRoles.isContractor;

    const canSignMineOwnerOrder =
        isExecutorSigned && isUserNotExecutor && userRoles.isLandlord;
    const canSignLandlordOrder = isClientSigned && isUserNotClient;

    const canDeleteOrder =
        (isExecutorSigned && contract.executor === accountName) ||
        (isClientSigned && contract.client === accountName);

    const terminateAction = useSmartContractAction(
        terminateContract(accountName, contract.id, 0)
    );
    const handleDeleteOrder = async () => {
        await terminateAction();
        navigate(serviceMarket);
    };

    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <GeneralDataTable contract={contract} />
                </Col>
                <Col xs={24} md={12}>
                    {isLandlordMineOwnerOrder && isClientSigned && (
                        <LandlordTable
                            contract={contract}
                            accountName={accountName}
                        />
                    )}
                    {isMiningOrder && isExecutorSigned && (
                        <ContractorTable
                            contract={contract}
                            accountName={accountName}
                        />
                    )}
                    {((isMiningOrder && isClientSigned) ||
                        (isLandlordMineOwnerOrder && isExecutorSigned)) && (
                        <MineOwnerTable
                            isMiningContract={isMiningOrder}
                            contract={contract}
                            accountName={accountName}
                        />
                    )}
                </Col>
                <Col xs={24} md={12}>
                    <ConditionTable contract={contract} />

                    <div className={styles.bottomActions}>
                        {isLandlordMineOwnerOrder && canSignMineOwnerOrder && (
                            <SignMineOwnerOrder
                                contract={contract}
                                accountName={accountName}
                            />
                        )}

                        {isLandlordMineOwnerOrder && canSignLandlordOrder && (
                            <SignLandlordOrder
                                contract={contract}
                                accountName={accountName}
                            />
                        )}

                        {canSignContractorOrder && (
                            <SignContractorOrder
                                contract={contract}
                                accountName={accountName}
                            />
                        )}
                        {canSignMineOwnerContractorOrder && (
                            <SignMineOwnerContractorOrder
                                contract={contract}
                                accountName={accountName}
                            />
                        )}

                        {canDeleteOrder && (
                            <Button
                                onClick={handleDeleteOrder}
                                icon={<DeleteOutlined />}
                                type="ghost"
                            >
                                {t('pages.serviceMarket.order.deleteOrder')}
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export { Order };
