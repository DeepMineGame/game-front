import { Button, Inventory, InventoryCardModal } from 'shared';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useStore } from 'effector-react';
import {
    EngineerSchema,
    InventoryNameType,
    miningEquipmentNames,
    raritiesTranslationMap,
} from 'entities/smartcontract';
import {
    $mergedInventoryWithAtomicAssets,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import { orderFields } from 'entities/order';
import { inventoriesTabMap } from 'entities/engineer';
import { GeneralInformationStepProps } from '../interface';
import styles from '../styles.module.scss';
import {
    UpgradeTypeFormItem,
    useWatchUpgradeType,
} from '../../UpgradeTypeFormItem';

export const CitizenInformation: FC<GeneralInformationStepProps> = ({
    goToPreviousStep,
    goToNextStep,
    form,
}) => {
    const { t } = useTranslation();
    const { hasValue, type } = useWatchUpgradeType(form);
    const equipmentType =
        type === EngineerSchema.mine ? ('Mine' as const) : miningEquipmentNames;

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
    const userInventory = useStore($mergedInventoryWithAtomicAssets);
    const isOneItemToUpgrade =
        equipmentType === 'Mine' || type === EngineerSchema.equipment;
    const hasAllValues = isOneItemToUpgrade
        ? !!asset
        : form.getFieldValue(orderFields.assetId1);
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
        if (isOneItemToUpgrade) {
            return form.setFieldsValue({
                [orderFields.assetId1]: asset?.asset_id,
            });
        }
        form.setFieldsValue({
            [orderFields.assetId1]: selectedEquipmentSet.Сutter?.asset_id,
            [orderFields.assetId2]:
                selectedEquipmentSet['Wandering Reactor']?.asset_id,
            [orderFields.assetId3]: selectedEquipmentSet.Delaminator?.asset_id,
            [orderFields.assetId4]:
                selectedEquipmentSet['Plunging Blocks']?.asset_id,
            [orderFields.assetId5]: selectedEquipmentSet['DME Wire']?.asset_id,
        });
    }, [asset, form, isOneItemToUpgrade, selectedEquipmentSet]);

    return (
        <>
            <UpgradeTypeFormItem />
            {hasValue && (
                <div>
                    {isOneItemToUpgrade ? (
                        <Form.Item name={orderFields.assetId1}>
                            <div className={styles.flexSection}>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        setIsInventoryOpen(true);
                                        if (equipmentType === 'Mine') {
                                            setSelectedEquipmentForFilter(
                                                'Mine'
                                            );
                                        }
                                    }}
                                    ghost
                                >
                                    {asset
                                        ? `${asset.name}, ${t(
                                              raritiesTranslationMap[
                                                  asset.rarity
                                              ]
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
                        </Form.Item>
                    ) : (
                        equipmentType.map((typeName, key) => (
                            <Form.Item
                                key={typeName}
                                name={orderFields.assetId + ++key}
                                style={{ margin: 0 }}
                            >
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
                                            ghost
                                        />
                                    )}
                                </div>
                                <br />
                            </Form.Item>
                        ))
                    )}
                </div>
            )}
            <div className={styles.flexSection}>
                <Button onClick={goToPreviousStep} ghost>
                    {t('kit.back')}
                </Button>
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
                userInventory={userInventory}
                visible={isInventoryOpen}
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
                />
            )}
        </>
    );
};
