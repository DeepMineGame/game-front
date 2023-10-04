import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { Loader, Page, useAccountName, useUserLocation } from 'shared';
import {
    $engineerContracts,
    EquipmentUpgrade,
    getEngineerActiveContract,
    setupKit,
    getUpgradeKitType,
} from 'features/engineer';
import {
    EngineerCabinGate,
    $engineerCabin,
    getState,
    getStatus,
    $isEngineerCabinLoading,
} from 'entities/engineer';
import { StatusInfo } from './ui';
import styles from './styles.module.scss';

const EquipmentHallPage: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const inLocation = useUserLocation();
    useGate(EngineerCabinGate, { searchParam: accountName });

    const engineerStore = useStore($engineerCabin);
    const isCabinLoading = useStore($isEngineerCabinLoading);

    const status = getStatus(engineerStore);
    const state = getState(status, inLocation.engineersWorkshop);

    $engineerContracts.watch((contracts) => {
        const activeContract = getEngineerActiveContract(
            accountName,
            contracts
        );
        const upgradeKitType = getUpgradeKitType(activeContract);

        if (upgradeKitType) {
            setupKit(upgradeKitType);
        }
    });

    const activeContract = getEngineerActiveContract(
        accountName,
        engineerStore.contracts
    );
    return (
        <Page headerTitle={t('Equipment hall').toUpperCase()}>
            {isCabinLoading ? (
                <Loader centered />
            ) : (
                <div className={styles.content}>
                    <StatusInfo
                        contract={activeContract}
                        status={status}
                        state={state}
                    />
                    <EquipmentUpgrade
                        status={status}
                        contract={activeContract}
                    />
                </div>
            )}
        </Page>
    );
};

export { EquipmentHallPage };
