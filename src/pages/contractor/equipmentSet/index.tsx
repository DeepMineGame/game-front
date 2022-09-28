import { FC, useEffect, useState } from 'react';
import {
    Inventory,
    InventoryCardModal,
    Page,
    success,
    useAccountName,
    useReloadPage,
    useTableData,
    warning,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    getSelectedEquipmentBySlots,
    useSmartContractActionDynamic,
    contractorContractIdStore,
    EquipmentSetGate,
    contractorsStore,
} from 'features';
import {
    getInventoryConfig,
    installEquipment,
    InventoryNameType,
    miningEquipmentNames,
    uninstallEquipment,
    UserInventoryType,
} from 'entities/smartcontract';
import styles from './styles.module.scss';
import { EquipmentInstallationModal } from './components/EquipmentInstallationModal';
import { Characteristics } from './components/Characteristics';
import { EquipmentCards } from './components/EquipmentCards';

export const EquipmentSetPage: FC = () => {
    const accountName = useAccountName();
    useGate(EquipmentSetGate, { searchParam: accountName });

    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const contractors = useStore(contractorsStore);

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

    const { data: userInventory } =
        useTableData<UserInventoryType>(getInventoryConfig);

    const contractId = useStore(contractorContractIdStore);

    useEffect(() => {
        const equipmentSlots = contractors?.[0]?.equip_slots ?? [];
        if (equipmentSlots) {
            const equipment = getSelectedEquipmentBySlots(
                equipmentSlots,
                userInventory
            );
            setSelectedEquipment(equipment);
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
        if (!contractId) {
            warning({
                title: t('pages.equipmentSet.main.haveNoContract'),
                content: t('pages.equipmentSet.main.haveNoContract'),
            });
        }
        if (notActivatedEquipmentIds.length) {
            await callAction(
                installEquipment({
                    waxUser: accountName,
                    contractId: contractId!,
                    items: notActivatedEquipmentIds,
                })
            );
        }
        return success({
            title: t('pages.equipmentSet.main.title'),
            content: t('pages.equipmentSet.main.installed'),
            onOk: reloadPage,
        });
    };

    const handleRemoveAllEquipment = async () => {
        await callAction(
            uninstallEquipment({
                waxUser: accountName,
                items: assetIds,
            })
        );
        return success({
            title: t('pages.equipmentSet.main.uninstall'),
            content: t('pages.equipmentSet.main.removed'),
            onOk: reloadPage,
        });
    };

    const handleRemoveEquipment = async (inventory: UserInventoryType) => {
        await callAction(
            uninstallEquipment({
                waxUser: accountName,
                items: [inventory.asset_id],
            })
        );
        return success({
            title: t('pages.equipmentSet.main.uninstall'),
            content: t('pages.equipmentSet.main.removed'),
            onOk: reloadPage,
        });
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

    const removeSelectedCard = (name: InventoryNameType) => {
        setSelectedEquipment({
            ...selectedEquipment,
            [name]: undefined,
        });
    };

    return (
        <Page headerTitle={t('pages.equipmentSet.main.title')}>
            <EquipmentCards
                selectedEquipment={selectedEquipment}
                onCardInUseRemove={handleRemoveEquipment}
                onCardHolderClick={openInventoryModal}
                onCardNotInUseRemove={removeSelectedCard}
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
