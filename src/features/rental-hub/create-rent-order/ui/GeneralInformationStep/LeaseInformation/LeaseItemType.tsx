import { Button, Inventory, InventoryCardModal, useAccountName } from 'shared';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useGate, useStore } from 'effector-react';
import { Form } from 'antd';
import {
    InventoryNameType,
    InventoryTab,
    miningEquipmentNames,
    rentOrderField,
} from 'entities/smartcontract';
import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import { AssetStruct } from 'entities/game-stat';
import { GeneralInformationStepProps } from '../interface';
import styles from '../styles.module.scss';
import {
    EquipmentType,
    LeaseTypeFormItem,
    useWatchUpgradeType,
} from '../../LeaseTypeFormItem';
import { $rentInventory, rentInventoryGate } from '../../../models';

export const inventoriesTabMap = {
    [EquipmentType.undefined]: InventoryTab.equipment,
    [EquipmentType.areas]: InventoryTab.areas,
    [EquipmentType.equipment]: InventoryTab.equipment,
    [EquipmentType.factory]: InventoryTab.equipment,
    [EquipmentType.mine]: InventoryTab.mines,
    [EquipmentType.module]: InventoryTab.modules,
    [EquipmentType.structures]: InventoryTab.structures,
};
export const LeaseItemType: FC<GeneralInformationStepProps> = ({
    goToNextStep,
    form,
}) => {
    const { t } = useTranslation();
    const { hasValue, type } = useWatchUpgradeType(form);
    const equipmentType =
        type === EquipmentType.mine ? ('Mine' as const) : miningEquipmentNames;
    const isAreaSelected = type === EquipmentType.areas;
    const [selectedEquipmentForFilter, setSelectedEquipmentForFilter] =
        useState<InventoryNameType | InventoryNameType[] | 'Mine'>(
            equipmentType
        );
    const [asset, setAsset] = useState<
        MergedInventoryWithAtomicAssets[number] | undefined | AssetStruct
    >();

    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [selectedInventoryCard, setSelectedInventoryCard] = useState<
        MergedInventoryWithAtomicAssets[number] | undefined
    >();
    useGate(rentInventoryGate, { searchParam: useAccountName() });
    const userInventory = useStore($rentInventory);
    const isOneItemToLease =
        equipmentType === 'Mine' ||
        type === EquipmentType.equipment ||
        type === EquipmentType.areas;
    const hasAllValues = isOneItemToLease
        ? !!asset
        : form.getFieldValue(rentOrderField.asset_ids).length;
    const [selectedEquipmentSet, setSelectedEquipmentSet] = useState<{
        // first char is cyrillc as mistake on atomic
        Сutter?: MergedInventoryWithAtomicAssets[number];
        'Wandering Reactor'?: MergedInventoryWithAtomicAssets[number];
        Delaminator?: MergedInventoryWithAtomicAssets[number];
        'Plunging Blocks'?: MergedInventoryWithAtomicAssets[number];
        'DME Wire'?: MergedInventoryWithAtomicAssets[number];
        Mine?: MergedInventoryWithAtomicAssets[number];
        'Engineer Certificate'?: MergedInventoryWithAtomicAssets[number];
    }>({});
    const handleItemSelect = (
        item: MergedInventoryWithAtomicAssets[number] | AssetStruct
    ) => {
        setIsInventoryOpen(false);
        setSelectedInventoryCard(undefined);

        if (typeof selectedEquipmentForFilter === 'string') {
            setSelectedEquipmentSet({
                ...selectedEquipmentSet,
                [selectedEquipmentForFilter]: item,
            });
        }
        return setAsset(item);
    };
    const handleDeleteAsset =
        (
            deletedAsset?: MergedInventoryWithAtomicAssets[number] | AssetStruct
        ) =>
        () => {
            setAsset(undefined);

            if (
                typeof selectedEquipmentForFilter === 'string' &&
                deletedAsset
            ) {
                setSelectedEquipmentSet({
                    ...selectedEquipmentSet,
                    [deletedAsset.name]: null,
                });
            }
        };

    useEffect(() => {
        if (isOneItemToLease) {
            return form.setFieldsValue({
                [rentOrderField.asset_ids]: [asset?.asset_id],
            });
        }

        form.setFieldsValue({
            [rentOrderField.asset_ids]: Object.values(
                selectedEquipmentSet
            )?.map((item) => item?.asset_id),
        });
    }, [asset, form, isOneItemToLease, selectedEquipmentSet]);
    const equipmentOrMineSelectButton = isOneItemToLease ? (
        <div className={styles.flexSection}>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setIsInventoryOpen(true);
                    if (equipmentType === 'Mine') {
                        return setSelectedEquipmentForFilter('Mine');
                    }
                    setSelectedEquipmentForFilter(equipmentType);
                }}
                ghost
            >
                {asset
                    ? `${asset.name}`
                    : t('pages.serviceMarket.createOrder.selectItem')}
            </Button>
            {asset && (
                <Button
                    onClick={handleDeleteAsset(asset)}
                    icon={<DeleteOutlined />}
                    style={{ maxWidth: 32 }}
                />
            )}
        </div>
    ) : (
        equipmentType.map((typeName) => {
            return (
                <>
                    <div className={styles.flexSection}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setSelectedEquipmentForFilter(typeName);
                                setIsInventoryOpen(true);
                            }}
                            ghost
                        >
                            {`Select ${typeName}`}
                        </Button>
                        {
                            // @ts-ignore
                            selectedEquipmentSet[typeName] && (
                                <Button
                                    onClick={handleDeleteAsset(
                                        // @ts-ignore
                                        selectedEquipmentSet[typeName]
                                    )}
                                    icon={<DeleteOutlined />}
                                    style={{ maxWidth: 32 }}
                                />
                            )
                        }
                    </div>
                    <br />
                </>
            );
        })
    );
    const inventoryTab = isAreaSelected
        ? InventoryTab.areas
        : InventoryTab.equipment;
    return (
        <>
            <LeaseTypeFormItem
                setSelectedEquipmentSet={setSelectedEquipmentSet}
                form={form}
                setAsset={setAsset}
            />
            {hasValue && (
                <Form.Item name={rentOrderField.asset_ids}>
                    {equipmentOrMineSelectButton}
                </Form.Item>
            )}
            <br />
            <div className={styles.flexSection}>
                <Button
                    disabled={!hasAllValues}
                    onClick={goToNextStep}
                    type="primary"
                >
                    {t('components.common.button.next')}
                </Button>
            </div>
            <Inventory
                onOpenCard={setSelectedInventoryCard}
                onSelect={handleItemSelect}
                userInventory={userInventory as any}
                open={isInventoryOpen}
                onCancel={() => setIsInventoryOpen(false)}
                selectedTab={
                    equipmentType === 'Mine' ? InventoryTab.mines : inventoryTab
                }
                equipmentTypeFilter={
                    isAreaSelected
                        ? [
                              'Space Debris',
                              'DME Springs',
                              'Lava',
                              'Glaciers',
                              'Rock Fields',
                          ]
                        : selectedEquipmentForFilter
                }
            />
            {selectedInventoryCard && (
                <InventoryCardModal
                    onSelect={handleItemSelect}
                    card={
                        selectedInventoryCard as MergedInventoryWithAtomicAssets[number]
                    }
                    open={!!selectedInventoryCard}
                    onCancel={() => setSelectedInventoryCard(undefined)}
                    onOk={() => handleItemSelect(selectedInventoryCard)}
                />
            )}
        </>
    );
};
