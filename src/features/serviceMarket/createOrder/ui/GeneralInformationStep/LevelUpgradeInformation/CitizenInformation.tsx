import { Button, Inventory, InventoryCardModal } from 'shared';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useStore } from 'effector-react';
import {
    EngineerSchema,
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
import localStyles from '../styles.module.scss';
import {
    UpgradeTypeFormItem,
    useWatchUpgradeType,
} from '../../UpgradeTypeFormItem';
import { inventoriesTypeMap } from './constants';

export const CitizenInformation: FC<GeneralInformationStepProps> = ({
    goToPreviousStep,
    goToNextStep,
    form,
}) => {
    const { t } = useTranslation();
    const { hasValue, type } = useWatchUpgradeType(form);
    const equipmentType =
        type === EngineerSchema.mine ? ('Mine' as const) : miningEquipmentNames;
    const [asset, setAsset] = useState<
        MergedInventoryWithAtomicAssets[number] | undefined
    >();

    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [selectedInventoryCard, setSelectedInventoryCard] = useState<
        MergedInventoryWithAtomicAssets[number] | undefined
    >();
    const userInventory = useStore($mergedInventoryWithAtomicAssets);

    const hasAllValues = hasValue && !!asset;

    const handleItemSelect = (
        item: MergedInventoryWithAtomicAssets[number]
    ) => {
        setAsset(item);
        setIsInventoryOpen(false);
        setSelectedInventoryCard(undefined);
    };

    const handleDeleteAsset = () => {
        setAsset(undefined);
    };

    useEffect(() => {
        form.setFieldsValue({
            [orderFields.assetId]: asset?.asset_id,
        });
    }, [asset]);

    return (
        <>
            <UpgradeTypeFormItem />
            {hasValue && (
                <Form.Item
                    name={orderFields.assetId}
                    className={localStyles.flexSection}
                    style={{ marginBottom: 24 }}
                >
                    <div className={localStyles.flexSection}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsInventoryOpen(true)}
                            ghost
                        >
                            {asset
                                ? `${t(
                                      `components.common.inventoryTypes.${
                                          inventoriesTypeMap[asset.inv_type]
                                      }`
                                  )}, ${t(
                                      raritiesTranslationMap[asset.rarity]
                                  )}, Level ${asset.level}`
                                : t(
                                      'pages.serviceMarket.createOrder.selectItem'
                                  )}
                        </Button>
                        {asset && (
                            <Button
                                onClick={handleDeleteAsset}
                                icon={<DeleteOutlined />}
                                style={{ maxWidth: 32 }}
                                ghost
                            />
                        )}
                    </div>
                </Form.Item>
            )}
            <div className={localStyles.flexSection}>
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
                equipmentTypeFilter={equipmentType}
            />
            {selectedInventoryCard && (
                <InventoryCardModal
                    onSelect={handleItemSelect}
                    card={
                        selectedInventoryCard as MergedInventoryWithAtomicAssets[number]
                    }
                    visible={!!selectedInventoryCard}
                    onCancel={() => setSelectedInventoryCard(undefined)}
                />
            )}
        </>
    );
};
