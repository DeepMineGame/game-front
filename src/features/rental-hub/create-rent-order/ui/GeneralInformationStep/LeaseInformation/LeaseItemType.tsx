import { Button, Inventory, InventoryCardModal, useAccountName } from 'shared';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useGate, useStore } from 'effector-react';
import { Form } from 'antd';
import {
    InventoryNameType,
    miningEquipmentNames,
    raritiesTranslationMap,
    rentOrderField,
} from 'entities/smartcontract';
import {
    $mergedInventoryWithAtomicAssets,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import { inventoriesTabMap } from 'entities/engineer';
import { GeneralInformationStepProps } from '../interface';
import styles from '../styles.module.scss';
import {
    EquipmentType,
    LeaseTypeFormItem,
    useWatchUpgradeType,
} from '../../LeaseTypeFormItem';
import { $rentInventoryAtomicAssets, rentInventoryGate } from '../../../models';

export const LeaseItemType: FC<GeneralInformationStepProps> = ({
    goToNextStep,
    form,
}) => {
    const { t } = useTranslation();
    const { hasValue, type } = useWatchUpgradeType(form);
    const equipmentType =
        type === EquipmentType.mine ? ('Mine' as const) : miningEquipmentNames;

    const [selectedEquipmentForFilter, setSelectedEquipmentForFilter] =
        useState<InventoryNameType | InventoryNameType[] | 'Mine'>(
            equipmentType
        );
    const [asset, setAsset] = useState<
        MergedInventoryWithAtomicAssets[number] | undefined
    >();

    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [selectedInventoryCard, setSelectedInventoryCard] = useState<
        MergedInventoryWithAtomicAssets[number] | undefined
    >();
    useGate(rentInventoryGate, { searchParam: useAccountName() });
    const userInventory = useStore($rentInventoryAtomicAssets);
    const isOneItemToLease =
        equipmentType === 'Mine' || type === EquipmentType.equipment;
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
        item: MergedInventoryWithAtomicAssets[number]
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
        (deletedAsset?: MergedInventoryWithAtomicAssets[number]) => () => {
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
            form.setFieldsValue({
                [rentOrderField.asset_ids]: [asset?.asset_id],
            });
        }
    }, [asset, form, isOneItemToLease, selectedEquipmentSet]);

    return (
        <>
            <LeaseTypeFormItem />
            {hasValue && (
                <Form.Item name={rentOrderField.asset_ids}>
                    {isOneItemToLease ? (
                        <div className={styles.flexSection}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    setIsInventoryOpen(true);
                                    if (equipmentType === 'Mine') {
                                        setSelectedEquipmentForFilter('Mine');
                                    }
                                }}
                                ghost
                            >
                                {asset
                                    ? `${asset.name}, ${t(
                                          raritiesTranslationMap[asset.rarity]
                                      )}, Level ${asset.level}`
                                    : t(
                                          'pages.serviceMarket.createOrder.selectItem'
                                      )}
                            </Button>
                            {asset && (
                                <Button
                                    onClick={handleDeleteAsset(asset)}
                                    icon={<DeleteOutlined />}
                                    style={{ maxWidth: 32 }}
                                    ghost
                                />
                            )}
                        </div>
                    ) : (
                        equipmentType.map((typeName, key) => (
                            <>
                                <div className={styles.flexSection}>
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => {
                                            setIsInventoryOpen(true);
                                            setSelectedEquipmentForFilter(
                                                typeName
                                            );
                                        }}
                                        ghost
                                    >
                                        {selectedEquipmentSet[typeName]
                                            ? `${typeName}, ${t(
                                                  raritiesTranslationMap[
                                                      selectedEquipmentSet[
                                                          typeName
                                                      ]?.rarity || 0
                                                  ]
                                              )}, Level ${
                                                  selectedEquipmentSet[typeName]
                                                      ?.level
                                              }`
                                            : `Select ${typeName}`}
                                    </Button>
                                    {selectedEquipmentSet[typeName] && (
                                        <Button
                                            onClick={handleDeleteAsset(
                                                selectedEquipmentSet[typeName]
                                            )}
                                            icon={<DeleteOutlined />}
                                            style={{ maxWidth: 32 }}
                                        />
                                    )}
                                </div>
                                <br />
                            </>
                        ))
                    )}
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
                selectedTab={inventoriesTabMap[type]}
                equipmentTypeFilter={selectedEquipmentForFilter}
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
