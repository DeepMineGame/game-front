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
import {
    signOrder,
    ContractDto,
    UserInventoryType,
    getInventoryConfig,
} from 'entities/smartcontract';
import { useAccountName, useTableData } from 'shared/lib/hooks';
import styles from './index.module.scss';

type Props = {
    visible?: boolean;
    onCancel: () => void;
    contract: ContractDto;
    title: string;
};

export const SignLevelUpgradeOrderModal: FC<Props> = ({
    visible,
    onCancel,
    title,
    contract,
}) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const { data: userInventory } =
        useTableData<UserInventoryType>(getInventoryConfig);

    const [selectedInventoryCard, setSelectedInventoryCard] = useState<
        UserInventoryType | undefined
    >();
    const [selectedAsset, setSelectedAsset] = useState<
        UserInventoryType | undefined
    >();
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);

    const signContractAction = useSmartContractAction(
        signOrder({
            waxUser: accountName,
            contractId: contract.id,
            assetId: selectedAsset?.asset_id,
        })
    );

    const handleItemSelect = async (item: UserInventoryType) => {
        setSelectedAsset(item);
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
                                    item: selectedAsset,
                                }
                            )}`
                        )}, ${getUpgradeRarity({
                            item: selectedAsset,
                        })}, level ${selectedAsset?.level}`}</Text>
                    </div>
                    <Button onClick={() => setSelectedAsset(undefined)}>
                        <DeleteOutlined />
                    </Button>
                </div>
            )}
            <Inventory
                onOpenCard={setSelectedInventoryCard}
                onSelect={handleItemSelect}
                userInventory={userInventory}
                visible={isInventoryOpen}
                onCancel={() => setIsInventoryOpen(false)}
            />
            {selectedInventoryCard && (
                <InventoryCardModal
                    onSelect={handleItemSelect}
                    card={selectedInventoryCard as UserInventoryType}
                    visible={!!selectedInventoryCard}
                    onCancel={() => setSelectedInventoryCard(undefined)}
                />
            )}
        </Modal>
    );
};
