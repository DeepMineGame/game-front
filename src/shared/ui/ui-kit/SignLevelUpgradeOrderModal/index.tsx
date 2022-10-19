import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'antd';
import { useSmartContractAction } from 'features';
import {
    getUpgradeRarity,
    getUpgradeType,
    Inventory,
    InventoryCardModal,
    Text,
} from 'shared';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';
import {
    $mergedInventoryWithAtomicAssets,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import { signOrder, ContractDto } from 'entities/smartcontract';
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

    const [selectedInventoryCard, setSelectedInventoryCard] = useState<
        MergedInventoryWithAtomicAssets[number] | undefined
    >();
    const [selectedAsset, setSelectedAsset] = useState<
        MergedInventoryWithAtomicAssets[number] | undefined
    >();
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);

    const signContractAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            contractId: contract.id,
            assetId: selectedAsset?.asset_id,
        }),
        onSignSuccess,
    });

    const handleAssetSelect = (
        asset: MergedInventoryWithAtomicAssets[number]
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
                    <Button onClick={() => setSelectedAsset(undefined)}>
                        <DeleteOutlined />
                    </Button>
                </div>
            )}
            <Inventory
                onOpenCard={setSelectedInventoryCard}
                onSelect={handleAssetSelect}
                userInventory={userInventory}
                visible={isInventoryOpen}
                onCancel={() => setIsInventoryOpen(false)}
            />
            {selectedInventoryCard && (
                <InventoryCardModal
                    onSelect={handleAssetSelect}
                    card={
                        selectedInventoryCard as MergedInventoryWithAtomicAssets[number]
                    }
                    visible={!!selectedInventoryCard}
                    onCancel={() => setSelectedInventoryCard(undefined)}
                />
            )}
        </Modal>
    );
};
