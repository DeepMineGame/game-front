import React, { FC, useState, useEffect } from 'react';
import {
    Inventory,
    Page,
    useTableData,
    useAccountName,
    InventoryCardModal,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { useSmartContractActionDynamic, findEquipmentByName } from 'features';
import {
    contractorsStore,
    getContractorsEffect,
    getContractsByNickNameConfig,
    getInventoryConfig,
    ID_TO_INVENTORY,
    installEquipment,
    InventoryNameType,
    uninstallEquipment,
    UserContractsType,
    UserInventoryType,
} from 'entities/smartcontract';
import styles from './styles.module.scss';
import { EquipmentInstallationModal } from './components/EquipmentInstallationModal';
import { Characteristics } from './components/Characteristics';
import { EquipmentCards } from './components/EquipmentCards';

const equipmentSetAvailableNames = [
    'Cutter',
    'Delaminator',
    'DME Wire',
    'Plunging Blocks',
    'Wandering Reactor',
] as InventoryNameType[];

export const EquipmentSetPage: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const [isInventoryVisible, setIsInventoryVisible] = useState(false);
    const [isInventoryCardVisible, setIsInventoryCardVisible] = useState(false);
    const [selectedInventoryModalCard, setSelectedInventoryModalCard] =
        useState<UserInventoryType | undefined>(undefined);
    const [needUpdate, setNeedUpdate] = useState<boolean | undefined>(
        undefined
    );
    const [selectedEquipment, setSelectedEquipment] = useState(
        {} as Record<InventoryNameType, UserInventoryType> | {}
    );
    const [selectedEquipmentName, setSelectedEquipmentName] = useState<
        InventoryNameType | undefined
    >(undefined);

    const callAction = useSmartContractActionDynamic();

    const contractors = useStore(contractorsStore);
    useEffect(() => {
        if (accountName && needUpdate !== false) {
            getContractorsEffect({ nickname: accountName });
        }
    }, [accountName, needUpdate]);

    const userInventory = useTableData<UserInventoryType>(
        getInventoryConfig,
        needUpdate
    );
    const userContracts = useTableData<UserContractsType>(
        getContractsByNickNameConfig
    );
    const contractId = userContracts?.[0]?.id ?? 0;

    useEffect(() => {
        const equipmentSlots = contractors?.[0].equip_slots ?? [];
        if (equipmentSlots) {
            const equipment = equipmentSlots
                .map((id) => userInventory.find((v) => v.asset_id === id))
                .filter((v) => v) as UserInventoryType[];

            const newSelectedEquipment = Object.fromEntries(
                equipmentSetAvailableNames.map((name) => [
                    name,
                    findEquipmentByName(equipment, name),
                ])
            ) as Record<InventoryNameType, UserInventoryType>;

            setSelectedEquipment(newSelectedEquipment);
        }
    }, [contractors, userInventory]);

    const assetIds = Object.entries(selectedEquipment)
        .map(([, inventory]) => inventory?.asset_id?.toString() ?? '')
        .filter((v) => v);
    const hasAllEquipment =
        assetIds.length === equipmentSetAvailableNames.length;

    const installedEquipment = Object.entries(selectedEquipment).filter(
        ([, equipment]) => equipment?.in_use
    );
    const notInstalledEquipment = Object.entries(selectedEquipment).filter(
        ([, equipment]) => !equipment?.in_use
    );
    const hasAllEquipmentActive =
        hasAllEquipment &&
        installedEquipment.length === equipmentSetAvailableNames.length;

    const handleInstallEquipment = async () => {
        setNeedUpdate(false);
        const notActivatedEquipmentIds = notInstalledEquipment
            .map(([, equipment]) => equipment?.asset_id)
            .filter((v) => v) as string[];
        if (notActivatedEquipmentIds.length) {
            await callAction(
                installEquipment({
                    waxUser: accountName,
                    contractId,
                    items: notActivatedEquipmentIds,
                })
            );
            setNeedUpdate(true);
        }
    };

    const handleRemoveAllEquipment = async () => {
        await callAction(
            uninstallEquipment({
                waxUser: accountName,
                contractId,
                items: assetIds,
            })
        );
        setSelectedEquipment({});
    };

    const handleRemoveEquipment = async (inventory: UserInventoryType) => {
        setNeedUpdate(false);
        await callAction(
            uninstallEquipment({
                waxUser: accountName,
                contractId,
                items: [inventory.asset_id],
            })
        );

        const inventoryName = ID_TO_INVENTORY[inventory.asset_template_id];

        setSelectedEquipment({
            ...selectedEquipment,
            [inventoryName]: undefined,
        });
        setNeedUpdate(true);
    };

    const openInventoryModal = (name: InventoryNameType) => {
        setSelectedEquipmentName(name);
        setIsInventoryVisible(true);
    };

    const handleCardSelect = (card: UserInventoryType) => {
        if (selectedEquipmentName) {
            setSelectedEquipment({
                ...selectedEquipment,
                [selectedEquipmentName]: card,
            });
            setIsInventoryVisible(false);
        }
    };

    const handleOpenCard = (card: UserInventoryType) => {
        setIsInventoryCardVisible(true);
        setSelectedInventoryModalCard(card);
    };

    return (
        <Page headerTitle={t('pages.equipmentSet.main.title')}>
            <EquipmentCards
                selectedEquipment={selectedEquipment}
                onCardButtonClick={handleRemoveEquipment}
                onCardHolderClick={openInventoryModal}
            />
            <div className={styles.characteristics}>
                <Characteristics contractors={contractors} />
            </div>
            <div className={styles.installButtonWrapper}>
                <EquipmentInstallationModal
                    onUninstall={handleRemoveAllEquipment}
                    onInstall={handleInstallEquipment}
                    disabled={!hasAllEquipment}
                    isInstall={!hasAllEquipmentActive}
                />
            </div>
            {selectedEquipmentName && (
                <Inventory
                    onOpenCard={handleOpenCard}
                    onSelect={handleCardSelect}
                    userInventory={userInventory}
                    name={selectedEquipmentName}
                    visible={isInventoryVisible}
                    onCancel={() => setIsInventoryVisible(false)}
                />
            )}
            {selectedInventoryModalCard && (
                <InventoryCardModal
                    onSelect={handleCardSelect}
                    card={selectedInventoryModalCard}
                    visible={isInventoryCardVisible}
                    onCancel={() => setIsInventoryCardVisible(false)}
                />
            )}
        </Page>
    );
};
