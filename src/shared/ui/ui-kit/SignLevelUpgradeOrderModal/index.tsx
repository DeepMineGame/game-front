import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Modal, Row, Space } from 'antd';
import { useSmartContractAction } from 'features';
import {
    getUpgradeRarity,
    getUpgradeType,
    Inventory,
    InventoryCardModal,
    parseAttrs,
    Text,
} from 'shared';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';
import {
    $mergedInventoryWithAtomicAssets,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import { signOrder, ContractDto, EngineerSchema } from 'entities/smartcontract';
import { inventoriesTabMap } from 'entities/engineer';
import { AssetStruct } from 'entities/game-stat';
import { neutral8 } from 'shared/ui/variables';
import { useAccountName } from 'shared/lib/hooks';
import styles from './index.module.scss';

type Props = {
    visible?: boolean;
    onCancel: () => void;
    contract: ContractDto;
    title: string;
    onSignSuccess: () => void;
};

export const SignLevelUpgradeOrderModal: FC<Props> = ({
    visible,
    onCancel,
    title,
    contract,
    onSignSuccess,
}) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const userInventory = useStore($mergedInventoryWithAtomicAssets);
    const inventoryFilteredByRarity = userInventory.filter(
        ({ rarity }) => contract.rarity === rarity
    );

    const [selectedInventoryCard, setSelectedInventoryCard] = useState<
        MergedInventoryWithAtomicAssets[number] | undefined
    >();
    const [selectedAsset, setSelectedAsset] = useState<
        MergedInventoryWithAtomicAssets[number] | AssetStruct | undefined
    >();
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);

    const signContractAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            contractId: contract.id,
            assetId: String(selectedAsset?.asset_id),
            isClient: 1,
        }),
        onSignSuccess,
    });

    const handleAssetSelect = (
        asset: MergedInventoryWithAtomicAssets[number] | AssetStruct
    ) => {
        setSelectedAsset(asset);
        setIsInventoryOpen(false);
    };

    return (
        <Modal
            width={458}
            centered
            visible={visible}
            onCancel={onCancel}
            title={title}
            onOk={signContractAction}
            okButtonProps={{ disabled: !selectedAsset }}
            okText={t('components.common.button.sign')}
        >
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Text block>
                        {t(
                            'pages.serviceMarket.contract.selectItemToLinkToContract'
                        )}
                    </Text>
                </Col>
                <Col span={24}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Text block style={{ color: neutral8 }}>
                            {t('components.common.item')}
                        </Text>
                        {!selectedAsset && (
                            <Button
                                onClick={() => setIsInventoryOpen(true)}
                                type="primary"
                                ghost
                                block
                            >
                                <PlusOutlined />
                                {t('components.common.button.selectItem')}
                            </Button>
                        )}
                        {selectedAsset && (
                            <div className={styles.selectedItemWrapper}>
                                <div className={styles.selectedItem}>
                                    <Text>{`${t(
                                        `pages.serviceMarket.levelUpgradeTab.type.${getUpgradeType(
                                            {
                                                asset: selectedAsset,
                                            }
                                        )}`
                                    )}, ${getUpgradeRarity({
                                        asset: selectedAsset,
                                    })}, level ${selectedAsset?.level}`}</Text>
                                </div>
                                <Button
                                    onClick={() => setSelectedAsset(undefined)}
                                >
                                    <DeleteOutlined />
                                </Button>
                            </div>
                        )}
                    </Space>
                </Col>
            </Row>

            <Inventory
                onOpenCard={setSelectedInventoryCard}
                onSelect={handleAssetSelect}
                userInventory={inventoryFilteredByRarity}
                open={isInventoryOpen}
                onCancel={() => setIsInventoryOpen(false)}
                selectedTab={
                    inventoriesTabMap[
                        parseAttrs(contract)?.schema_type as EngineerSchema
                    ]
                }
            />
            {selectedInventoryCard && (
                <InventoryCardModal
                    onSelect={handleAssetSelect}
                    card={
                        selectedInventoryCard as MergedInventoryWithAtomicAssets[number]
                    }
                    open={!!selectedInventoryCard}
                    onCancel={() => setSelectedInventoryCard(undefined)}
                />
            )}
        </Modal>
    );
};
