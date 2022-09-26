import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import { LevelUpgradeOrder, MiningOrder, MineOperationOrder } from 'features';
import { ContractDto, ContractType } from 'entities/smartcontract';
import { useContractState, useContractType } from 'entities/contract';
import { DeletedOrderStub } from './components';

type Props = { contract: ContractDto; accountName: string };

const orders = {
    [ContractType.level_upgrade]: LevelUpgradeOrder,
    [ContractType.mineowner_contractor]: MiningOrder,
    [ContractType.landlord_mineowner]: MineOperationOrder,
    [ContractType.undefined]: MiningOrder,
};

const pageTitle = {
    [ContractType.level_upgrade]: 'pages.serviceMarket.levelUpgradeOrder',
    [ContractType.mineowner_contractor]: 'pages.serviceMarket.miningOrder',
    [ContractType.landlord_mineowner]: 'pages.serviceMarket.mineOperationOrder',
    [ContractType.undefined]: '',
};

export const OrderPage: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const { isDeleted } = useContractState(contract, accountName);
    const { isOrder } = useContractType(contract);

    const orderWasDeleted = isDeleted && isOrder;

    const Order = orders[contract.type];

    return (
        <Page headerTitle={t(pageTitle[contract.type]).toUpperCase()}>
            {orderWasDeleted ? (
                <DeletedOrderStub contract={contract} />
            ) : (
                <Order contract={contract} accountName={accountName} />
            )}
        </Page>
    );
};
