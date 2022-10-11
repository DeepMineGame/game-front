import { Button, Inventory, InventoryCardModal } from 'shared';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useStore } from 'effector-react';
import { $inventoriedAssets, InventoriedAssets } from 'entities/atomicassets';
import { orderFields } from 'entities/order';
import { GeneralInformationStepProps } from '../interface';
import localStyles from '../styles.module.scss';
import {
    UpgradeTypeFormItem,
    useWatchUpgradeType,
} from '../../UpgradeTypeFormItem';
import {
    raritiesTranslationMap,
    inventoriesTypeMap,
    inventoriesTabMap,
} from './constants';

export const CitizenInformation: FC<GeneralInformationStepProps> = ({
    goToPreviousStep,
    goToNextStep,
    form,
}) => {
    const { t } = useTranslation();
    const { hasValue, type } = useWatchUpgradeType(form);
    const [asset, setAsset] = useState<InventoriedAssets[number] | undefined>();

    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [selectedInventoryCard, setSelectedInventoryCard] = useState<
        InventoriedAssets[number] | undefined
    >();
    const userInventory = useStore($inventoriedAssets);

    const hasAllValues = hasValue && !!asset;

    const handleItemSelect = (item: InventoriedAssets[number]) => {
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
                                          inventoriesTypeMap[asset.inv_type!]
                                      }`
                                  )}, ${t(
                                      `components.common.rarities.${
                                          raritiesTranslationMap[asset.rarity!]
                                      }`
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
            />
            {selectedInventoryCard && (
                <InventoryCardModal
                    onSelect={handleItemSelect}
                    card={selectedInventoryCard as InventoriedAssets[number]}
                    visible={!!selectedInventoryCard}
                    onCancel={() => setSelectedInventoryCard(undefined)}
                />
            )}
        </>
    );
};
