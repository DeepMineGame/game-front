import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { Loader, Page, useAccountName, useUserLocation } from 'shared';
import { EquipmentUpgrade } from 'features/engineer';
import {
    EngineerCabinGate,
    $engineerCabinStore,
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

    const engineerStore = useStore($engineerCabinStore);
    const isCabinLoading = useStore($isEngineerCabinLoading);

    const status = getStatus(engineerStore);
    const state = getState(status, inLocation.engineersWorkshop);

    const activeContract = engineerStore.contracts.find(
        (contract) => !contract.deleted_at && contract.executor === accountName
    );

    return (
        <Page
            headerTitle={t('pages.engineer.equipmentHall.title').toUpperCase()}
        >
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
