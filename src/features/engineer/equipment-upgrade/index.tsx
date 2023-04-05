import { FC } from 'react';
import { Row, Space } from 'antd';
import { useStore } from 'effector-react';
import { ContractDto } from 'entities/smartcontract';
import { CabinStatus } from 'entities/engineer';
import { userStore } from 'entities/user';
import { tablet, useAccountName, useMediaQuery } from 'shared/lib/hooks';
import {
    EquipmentSetup,
    UpgradeTable,
    PerformUpgrade,
    GetUpgrade,
    UpgradeTerminate,
} from './ui';
import { $equipment, getEquipmentByIdEffect } from './model';
import { $upgradeKit, UpgradeKitType } from './model/upgrade-kit';

type Props = {
    contract?: ContractDto;
    status: CabinStatus;
};

const EquipmentUpgrade: FC<Props> = ({ contract, status }) => {
    const accountName = useAccountName();
    const user = useStore(userStore);
    const isTablet = useMediaQuery(tablet);
    const equipment = useStore($equipment);
    const upgradeKit = useStore($upgradeKit);
    const equipmentLoading = useStore(getEquipmentByIdEffect.pending);
    return (
        <Space
            direction={isTablet ? 'horizontal' : 'vertical'}
            size={isTablet ? 42 : 0}
            align="start"
        >
            <EquipmentSetup
                status={status}
                equipment={equipment}
                isLoading={equipmentLoading}
                isWaitCitizen={status === CabinStatus.NeedCitizen}
            />

            <Space direction="vertical" size={24}>
                <UpgradeTable
                    equipment={equipment}
                    upgradeKit={upgradeKit as UpgradeKitType}
                    isWaitCitizen={status === CabinStatus.NeedCitizen}
                />

                {contract &&
                    (status === CabinStatus.UpgradeCompleted ? (
                        <GetUpgrade
                            accountName={accountName}
                            contract={contract}
                        />
                    ) : (
                        <Row gutter={[12, 12]}>
                            <PerformUpgrade
                                accountName={accountName}
                                contractId={contract.id}
                                improved={
                                    upgradeKit === UpgradeKitType.uncommon
                                }
                                disabled={
                                    !equipment ||
                                    !upgradeKit ||
                                    status === CabinStatus.UpgradeInProgress
                                }
                            />

                            {status === CabinStatus.UpgradeInProgress &&
                                user?.is_admin && (
                                    <UpgradeTerminate
                                        accountName={accountName}
                                        contractId={contract.id}
                                    />
                                )}
                        </Row>
                    ))}
            </Space>
        </Space>
    );
};
export { EquipmentUpgrade };
