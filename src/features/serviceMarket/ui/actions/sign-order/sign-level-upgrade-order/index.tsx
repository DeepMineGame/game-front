import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Inventory, useTableData } from 'shared';
import { useSmartContractAction } from 'features/hooks';
import {
    ContractDto,
    getInventoryConfig,
    UserInventoryType,
    signOrder,
} from 'entities/smartcontract';
import { useContractState } from 'entities/contract';

type Props = {
    contract: ContractDto;
    accountName: string;
};

export const SignLevelUpgradeOrder: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const { isClient, isExecutor } = useContractState(contract, accountName);

    const [selectedInventoryCard, setSelectedInventoryCard] = useState<
        UserInventoryType | undefined
    >();
    const [selectedAssetId, setSelectedAssetId] = useState(
        contract.client_asset_id
    );
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const { data: userInventory } =
        useTableData<UserInventoryType>(getInventoryConfig);

    const signContractAction = useSmartContractAction(
        signOrder({
            waxUser: accountName,
            contractId: contract.id,
            assetId: selectedAssetId,
        })
    );

    const handleItemSelect = async (item: UserInventoryType) => {
        setSelectedAssetId(item.asset_id);
        setIsInventoryOpen(false);
        await signContractAction();

        // setSelectedInventoryCard(undefined);
    };

    const onSign = async () => {
        if (isClient) {
            setIsInventoryOpen(true);
        }

        if (isExecutor) {
            await signContractAction();
        }
    };

    return (
        <>
            <Button onClick={onSign} type="primary" size="large" block>
                {t('pages.serviceMarket.order.signOrder')}
            </Button>
            <Inventory
                onOpenCard={setSelectedInventoryCard}
                onSelect={(item) => {
                    handleItemSelect(item);
                }}
                userInventory={userInventory}
                visible={isInventoryOpen}
                onCancel={() => setIsInventoryOpen(false)}
                // selectedTab={inventoriesTabMap[type]}
            />
        </>
    );
};
