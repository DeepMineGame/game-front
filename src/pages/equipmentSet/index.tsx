import React, { FC, useState, useEffect } from 'react';
import {
    CardHolder,
    Inventory,
    Card,
    Page,
    useTableData,
    useAccountName,
    InventoryCardModal,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import {
    useSmartContractActionDynamic,
    findEquipmentByName,
    TemplateIdType,
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
} from 'entities/smartcontract';
import styles from './styles.module.scss';
import { EquipmentInstallationModal } from './components/EquipmentInstallationModal';
import { Characteristics } from './components/Characteristics';

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
    const [isInventoryVisible, setIsInventoryVisible] = useState(false);
    const [isInventoryCardVisible, setIsInventoryCardVisible] = useState(false);
    const [selectedInventoryModalCard, setSelectedInventoryModalCard] =
        useState<UserInventoryType | undefined>(undefined);
    const toggleIsInventoryVisible = () => {
        setIsInventoryVisible((v) => !v);
    };
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
            getMinesEffect({ searchParam: contractorAreaId });
        }
    }, [contractors]);

    const userContracts = useTableData<UserContractsType>(
        getContractsByNickNameConfig
    );
    const contractId = userContracts?.[0]?.id ?? 0;
    const userInventory = useTableData<UserInventoryType>(
        getInventoryConfig,
        needUpdate
    );

    useEffect(() => {
        if (userInventory) {
            const activatedEquipment = userInventory.filter((v) => v.activated);
            const newSelectedEquipment = Object.fromEntries(
                equipmentSetAvailableNames.map((name) => [
                    name,
                    findEquipmentByName(activatedEquipment, name),
                ])
            ) as Record<InventoryNameType, UserInventoryType>;

            setSelectedEquipment(newSelectedEquipment);
        }
    }, [userInventory]);

    const assetIds = Object.entries(selectedEquipment)
        .map(([, inventory]) => inventory?.asset_id?.toString() ?? '')
        .filter((v) => v);
    const hasAllEquipment =
        assetIds.length === equipmentSetAvailableNames.length;

    const activatedEquipment = Object.entries(selectedEquipment).filter(
        ([, equipment]) => equipment?.activated
    );
    const notActivatedEquipment = Object.entries(selectedEquipment).filter(
        ([, equipment]) => !equipment?.activated
    );
    const hasAllEquipmentActive =
        hasAllEquipment &&
        activatedEquipment.length === equipmentSetAvailableNames.length;

    const handleInstallEquipment = async () => {
        setNeedUpdate(false);
        const notActivatedEquipmentIds = notActivatedEquipment
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

    const handleRemoveEquipment =
        (inventory: UserInventoryType) => async () => {
            setNeedUpdate(false);
            await callAction(
                uninstallEquipment({
                    waxUser: accountName,
                    contractId,
                    items: [inventory.asset_id],
                })
            );

            const inventoryName =
                ID_TO_INVENTORY[
                    +inventory.asset_template_id as InventoryIdType
                ];

            setSelectedEquipment({
                ...selectedEquipment,
                [inventoryName]: undefined,
            });
            setNeedUpdate(true);
        };

    const openInventoryModal = (name: InventoryNameType) => () => {
        setSelectedEquipmentName(name);
        toggleIsInventoryVisible();
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

    console.log(isInventoryCardVisible, selectedInventoryModalCard);

    return (
        <Page headerTitle={t('pages.equipmentSet.title')}>
            <div className={styles.cards}>
                {Object.entries(selectedEquipment).map(([name, inventory]) =>
                    inventory ? (
                        <Card
                            templateId={
                                +inventory.asset_template_id as TemplateIdType
                            }
                            key={name}
                            initial={10}
                            current={3}
                            remained={7}
                            buttonText={
                                inventory.activated ? 'Remove' : undefined
                            }
                            onButtonClick={handleRemoveEquipment(inventory)}
                            status={
                                inventory.activated
                                    ? 'installed'
                                    : 'notInstalled'
                            }
                        />
                    ) : (
                        <CardHolder
                            key={name}
                            onClick={openInventoryModal(
                                name as InventoryNameType
                            )}
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
                    onCancel={toggleIsInventoryVisible}
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
