import { FC } from 'react';
import { Space } from 'antd';
import { useStore } from 'effector-react';
import { ContractDto } from 'entities/smartcontract';
import { CabinStatus } from 'entities/engineer';
import { tablet, useAccountName, useMediaQuery } from 'shared/lib/hooks';
import { EquipmentSetup, UpgradeTable, PerformUpgrade, GetUpgrade } from './ui';
import { $equipment, getEquipmentByIdEffect } from './model';
import { $upgradeKit, UpgradeKitType } from './model/upgrade-kit';

type Props = {
    contract?: ContractDto;
    status: CabinStatus;
};

const EquipmentUpgrade: FC<Props> = ({ contract, status }) => {
    const accountName = useAccountName();
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

                {status === CabinStatus.UpgradeCompleted ? (
                    <GetUpgrade
                        accountName={accountName}
                        contractId={contract?.id!}
                    />
                ) : (
                    <PerformUpgrade
                        accountName={accountName}
                        contractId={contract?.id!}
                        improved={upgradeKit === UpgradeKitType.uncommon}
                        disabled={
                            !equipment ||
                            !upgradeKit ||
                            status === CabinStatus.UpgradeInProgress
                        }
                    />
                )}
            </Space>
        </Space>
    );
};
export { EquipmentUpgrade };
