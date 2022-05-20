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
    contractorsStore,
    getContractorsEffect,
    getContractsByNickNameConfig,
    getInventoryConfig,
    getMinesEffect,
    ID_TO_INVENTORY,
    InventoryIdType,
    InventoryNameType,
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

export const EquipmentSetPage: FC = () => {
    const { t } = useTranslation();
    const contractors = useStore(contractorsStore);
    const accountName = useAccountName();
    const [inventoryVisibility, setInventoryVisibility] = useState(false);
    const toggleInventoryVisibility = () => {
        setInventoryVisibility(!inventoryVisibility);
    };

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
    const currentContractId = userContracts?.[0]?.id;
    const userInventory = useTableData<UserInventoryType>(getInventoryConfig);

    const userEquipment = Object.fromEntries(
        (
            [
                'Cutter',
                'Delaminator',
                'DME Wire',
                'Plunging Blocks',
                'Wandering Reactor',
            ] as InventoryNameType[]
        ).map((name) => [name, findEquipmentByName(userInventory, name)])
    );

    return (
        <Page headerTitle={t('pages.equipmentSet')}>
            <div className={styles.cards}>
                {Object.entries(userEquipment).map(([name, inventory]) =>
                    inventory ? (
                        <Card
                            key={name}
                            initial={10}
                            current={3}
                            remained={7}
                            hasRemove
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
                <EquipmentInstallationModal />
            </div>
            <Inventory
                visible={inventoryVisibility}
                onCancel={toggleInventoryVisibility}
            />
        </Page>
    );
};
