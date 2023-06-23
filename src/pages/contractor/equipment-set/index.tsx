import { FC, useEffect, useState } from 'react';
import {
    Inventory,
    InventoryCardModal,
    Page,
    showSuccessModal,
    useAccountName,
    useReloadPage,
    showWarningModal,
    useActions,
    useUserLocation,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    getSelectedEquipmentBySlots,
    useSmartContractActionDynamic,
    contractorContractIdStore,
    EquipmentSetGate,
    contractorsStore,
    CallToTravelNotification,
} from 'features';
import {
    ActionState,
    ActionType,
    installEquipment,
    InventoryNameType,
    LOCATION_TO_ID,
    miningEquipmentNames,
    uninstallEquipment,
    UserInventoryType,
} from 'entities/smartcontract';
import {
    $mergedInventoryWithAtomicAssets,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import styles from './styles.module.scss';
import { EquipmentInstallationModal } from './components/EquipmentInstallationModal';
import { Characteristics } from './components/Characteristics';
import { EquipmentCards } from './components/EquipmentCards';

export const EquipmentSetPage: FC = () => {
    const accountName = useAccountName();
    useGate(EquipmentSetGate, { searchParam: accountName });
    const inLocation = useUserLocation();

    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const contractors = useStore(contractorsStore);
    const { lastAction: lastMineAction } = useActions(ActionType.mine);
    const isMining = lastMineAction?.state === ActionState.active;

    const [isInventoryVisible, setIsInventoryVisible] = useState(false);
    const [isInventoryCardVisible, setIsInventoryCardVisible] = useState(false);
    const [selectedInventoryModalCard, setSelectedInventoryModalCard] =
        useState<MergedInventoryWithAtomicAssets[number] | undefined>();
    const [selectedEquipment, setSelectedEquipment] = useState(
        {} as Record<InventoryNameType, UserInventoryType> | {}
    );
    const [selectedEquipmentName, setSelectedEquipmentName] = useState<
        InventoryNameType | undefined
    >();

    const callAction = useSmartContractActionDynamic();

    const userInventory = useStore($mergedInventoryWithAtomicAssets);

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
            showWarningModal({
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
        return showSuccessModal({
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
        return showSuccessModal({
            title: t('pages.equipmentSet.main.uninstall'),
            content: t('pages.equipmentSet.main.removed'),
            onOk: reloadPage,
        });
    };

    const handleRemoveEquipment = async (
        inventory: MergedInventoryWithAtomicAssets[number]
    ) => {
        await callAction(
            uninstallEquipment({
                waxUser: accountName,
                items: [inventory.asset_id],
            })
        );
        return showSuccessModal({
            title: t('pages.equipmentSet.main.uninstall'),
            content: t('pages.equipmentSet.main.removed'),
            onOk: reloadPage,
        });
    };

    const openInventoryModal = (name: InventoryNameType) => {
        setSelectedEquipmentName(name);
        setIsInventoryVisible(true);
    };

    const handleCardSelect = (
        card: MergedInventoryWithAtomicAssets[number]
    ) => {
        if (selectedEquipmentName) {
            setSelectedEquipment({
                ...selectedEquipment,
                [selectedEquipmentName]: card,
            });
            setIsInventoryVisible(false);
        }
    };

    const handleOpenCard = (card: MergedInventoryWithAtomicAssets[number]) => {
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
                isMining={isMining}
                selectedEquipment={selectedEquipment}
                onCardInUseRemove={handleRemoveEquipment}
                onCardHolderClick={openInventoryModal}
                onCardNotInUseRemove={removeSelectedCard}
            />
            <div className={styles.characteristics}>
                <Characteristics />
            </div>
            <div className={styles.installButtonWrapper}>
                <EquipmentInstallationModal
                    onUninstall={handleRemoveAllEquipment}
                    onInstall={handleInstallEquipment}
                    disabled={!hasAllEquipment || isMining}
                    isInstall={!hasAllEquipmentActive}
                />
            </div>
            {selectedEquipmentName && (
                <Inventory
                    onOpenCard={handleOpenCard}
                    onSelect={handleCardSelect}
                    userInventory={userInventory}
                    equipmentTypeFilter={selectedEquipmentName}
                    open={isInventoryVisible}
                    onCancel={() => setIsInventoryVisible(false)}
                />
            )}
            {selectedInventoryModalCard && (
                <InventoryCardModal
                    onSelect={handleCardSelect}
                    card={selectedInventoryModalCard}
                    open={isInventoryCardVisible}
                    onCancel={() => setIsInventoryCardVisible(false)}
                />
            )}
            {!inLocation.mine && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.mine}
                    onSuccess={reloadPage}
                />
            )}
        </Page>
    );
};
