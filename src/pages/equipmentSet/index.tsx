import React, { FC, useState, useEffect } from 'react';
import {
    CardHolder,
    Inventory,
    Card,
    Page,
    useTableData,
    useAccountName,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import {
    useSmartContractAction,
    useSmartContractActionDynamic,
} from 'features';
import {
    contractorsStore,
    getContractorsEffect,
    getContractsByNickNameConfig,
    getInventoryConfig,
    getMinesEffect,
    ID_TO_INVENTORY,
    installEquipment,
    InventoryIdType,
    InventoryNameType,
    uninstallEquipment,
    UserContractsType,
    UserInventoryType,
} from 'entities/smartcontracts';
import styles from './styles.module.scss';
import { EquipmentInstallationModal } from './components/EquipmentInstallationModal';
import { Characteristics } from './components/Characteristics';

const findEquipmentByName = (
    inventory: UserInventoryType[],
    name: InventoryNameType
) =>
    inventory.find(
        (v) => ID_TO_INVENTORY[+v.asset_template_id as InventoryIdType] === name
    );

const equipmentSetAvailableNames = [
    'Cutter',
    'Delaminator',
    'DME Wire',
    'Plunging Blocks',
    'Wandering Reactor',
] as InventoryNameType[];

export const EquipmentSetPage: FC = () => {
    const { t } = useTranslation();
    const contractors = useStore(contractorsStore);
    const accountName = useAccountName();
    const [inventoryVisibility, setInventoryVisibility] = useState(false);
    const toggleInventoryVisibility = () => {
        setInventoryVisibility(!inventoryVisibility);
    };

    const callAction = useSmartContractActionDynamic();

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (accountName) {
            getContractorsEffect({ nickname: accountName });
            interval = setInterval(() => {
                getContractorsEffect({ nickname: accountName });
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [accountName]);
    useEffect(() => {
        const contractorAreaId = contractors?.[0]?.area_id;
        if (contractorAreaId) {
            getMinesEffect({ assetId: contractorAreaId });
        }
    }, [contractors]);

    const userContracts = useTableData<UserContractsType>(
        getContractsByNickNameConfig
    );
    const contractId = userContracts?.[0]?.id ?? 0;
    const userInventory = useTableData<UserInventoryType>(getInventoryConfig);

    const userEquipment = Object.fromEntries(
        equipmentSetAvailableNames.map((name) => [
            name,
            findEquipmentByName(userInventory, name),
        ])
    );

    const assetIds = Object.entries(userEquipment)
        .map(([, inventory]) => inventory?.asset_id?.toString() ?? '')
        .filter((v) => v);
    const hasAllEquipment =
        assetIds.length === equipmentSetAvailableNames.length;

    const activatedEquipment = Object.entries(userEquipment).filter(
        ([, equipment]) => equipment?.activated
    );
    const hasAllEquipmentActive =
        hasAllEquipment &&
        activatedEquipment.length === equipmentSetAvailableNames.length;

    const installEquipmentCallback = useSmartContractAction(
        installEquipment({
            waxUser: accountName,
            contractId,
            items: assetIds,
        })
    );

    const handleInstallEquipment = async () => {
        if (hasAllEquipment) {
            await installEquipmentCallback();
        }
    };

    const handleRemoveEquipment = (inventoryIds: string[]) => async () => {
        const filteredIds = inventoryIds.filter((v) => v);
        if (filteredIds.length) {
            await callAction(
                uninstallEquipment({
                    waxUser: accountName,
                    contractId,
                    items: filteredIds,
                })
            );
        }
    };

    return (
        <Page headerTitle={t('pages.equipmentSet.title')}>
            <div className={styles.cards}>
                {Object.entries(userEquipment).map(([name, inventory]) =>
                    inventory ? (
                        <Card
                            key={name}
                            initial={10}
                            current={3}
                            remained={7}
                            hasRemove={!!inventory.activated}
                            onRemove={handleRemoveEquipment([
                                inventory.asset_id,
                            ])}
                            status={
                                inventory.activated
                                    ? 'installed'
                                    : 'notInstalled'
                            }
                        />
                    ) : (
                        <CardHolder
                            key={name}
                            onClick={toggleInventoryVisibility}
                            name={name}
                        />
                    )
                )}
            </div>
            <div className={styles.characteristics}>
                <Characteristics />
            </div>
            <div className={styles.installButtonWrapper}>
                <EquipmentInstallationModal
                    onUninstall={handleRemoveEquipment(assetIds)}
                    onInstall={handleInstallEquipment}
                    disabled={!hasAllEquipment}
                    isInstall={!hasAllEquipmentActive}
                />
            </div>
            <Inventory
                visible={inventoryVisibility}
                onCancel={toggleInventoryVisibility}
            />
        </Page>
    );
};
