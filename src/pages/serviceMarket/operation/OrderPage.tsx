import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import { LevelUpgradeOrder, MiningOrder, MineOperationOrder } from 'features';
import { ContractDto, ContractType } from 'entities/smartcontract';

type Props = { contract: ContractDto; accountName: string };

const orders = {
    [ContractType.citizen_engineer]: LevelUpgradeOrder,
    [ContractType.mineowner_contractor]: MiningOrder,
    [ContractType.landlord_mineowner]: MineOperationOrder,
    [ContractType.undefined]: MiningOrder,
};

const pageTitle = {
    [ContractType.citizen_engineer]: 'pages.serviceMarket.levelUpgradeOrder',
    [ContractType.mineowner_contractor]: 'pages.serviceMarket.miningOrder',
    [ContractType.landlord_mineowner]: 'pages.serviceMarket.mineOperationOrder',
    [ContractType.undefined]: '',
};

export const OrderPage: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const Order = orders[contract.type];

    return (
        <Page headerTitle={t(pageTitle[contract.type]).toUpperCase()}>
            <Order contract={contract} accountName={accountName} />
        </Page>
    );
};
