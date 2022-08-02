import React, { FC, useState, useEffect, useCallback } from 'react';
import {
    Inventory,
    Page,
    useTableData,
    useAccountName,
    InventoryCardModal,
    useReloadPage,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { useSmartContractActionDynamic, findEquipmentByName } from 'features';
import {
    ContractDto,
    contractorsStore,
    ContractStatus,
    ContractType,
    getContractorsEffect,
    getContractsNameConfig,
    getInventoryConfig,
    installEquipment,
    InventoryNameType,
    mapSearchParamForIndexPositionToFindContracts,
    miningEquipmentNames,
    uninstallEquipment,
    UserInventoryType,
} from 'entities/smartcontract';
import styles from './styles.module.scss';
import { EquipmentInstallationModal } from './components/EquipmentInstallationModal';
import { Characteristics } from './components/Characteristics';
import { EquipmentCards } from './components/EquipmentCards';

export const EquipmentSetPage: FC = () => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const accountName = useAccountName();
    const [isInventoryVisible, setIsInventoryVisible] = useState(false);
    const [isInventoryCardVisible, setIsInventoryCardVisible] = useState(false);
    const [selectedInventoryModalCard, setSelectedInventoryModalCard] =
        useState<UserInventoryType | undefined>(undefined);
    const [selectedEquipment, setSelectedEquipment] = useState(
        {} as Record<InventoryNameType, UserInventoryType> | {}
    );
    const [selectedEquipmentName, setSelectedEquipmentName] = useState<
        InventoryNameType | undefined
    >(undefined);

    const callAction = useSmartContractActionDynamic();

    const contractors = useStore(contractorsStore);
    useEffect(() => {
        if (accountName) {
            getContractorsEffect({ searchParam: accountName });
        }
    }, [accountName]);

    const { data: userInventory } =
        useTableData<UserInventoryType>(getInventoryConfig);

    const getConfigForContracts = useCallback(
        () =>
            getContractsNameConfig(
                accountName,
                mapSearchParamForIndexPositionToFindContracts.executorId,
                10000
            ),
        []
    );

    const { data: userContracts } = useTableData<ContractDto>(
        getConfigForContracts
    );
    const contractId = userContracts.find(
        ({ status, type, executor }) =>
            type === ContractType.mineowner_contractor &&
            executor === accountName &&
            status === ContractStatus.active
    )?.id;

    useEffect(() => {
        const equipmentSlots = contractors?.[0]?.equip_slots ?? [];
        if (equipmentSlots) {
            const equipment = equipmentSlots
                .map(({ asset_id }) =>
                    userInventory.find((v) => v.asset_id === asset_id)
                )
                .filter((v) => v) as UserInventoryType[];

            const newSelectedEquipment = Object.fromEntries(
                miningEquipmentNames.map((name) => [
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
    const hasAllEquipment = assetIds.length === miningEquipmentNames.length;

    const installedEquipment = Object.entries(selectedEquipment).filter(
        ([, equipment]) => equipment?.in_use
    );
    const notInstalledEquipment = Object.entries(selectedEquipment).filter(
        ([, equipment]) => !equipment?.in_use
    );
    const hasAllEquipmentActive =
        hasAllEquipment &&
        installedEquipment.length === miningEquipmentNames.length;

    const handleInstallEquipment = async () => {
        const notActivatedEquipmentIds = notInstalledEquipment
            .map(([, equipment]) => equipment?.asset_id)
            .filter((v) => v) as string[];
        if (notActivatedEquipmentIds.length) {
            await callAction(
                installEquipment({
                    waxUser: accountName,
                    contractId: contractId!,
                    items: notActivatedEquipmentIds,
                })
            );
        }
        return reloadPage();
    };

    const handleRemoveAllEquipment = async () => {
        await callAction(
            uninstallEquipment({
                waxUser: accountName,
                items: assetIds,
            })
        );
        reloadPage();
    };

    const handleRemoveEquipment = async (inventory: UserInventoryType) => {
        await callAction(
            uninstallEquipment({
                waxUser: accountName,
                items: [inventory.asset_id],
            })
        );
        reloadPage();
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
