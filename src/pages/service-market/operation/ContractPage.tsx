import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import { RentalContract } from 'features';
import {
    LevelUpgradeContract,
    MineOperationContract,
    MiningContract,
} from 'features/service-market';
import { ContractDto, ContractType } from 'entities/smartcontract';

type Props = { contract: ContractDto; accountName: string };

const contracts = {
    [ContractType.landlord_mineowner]: MineOperationContract,
    [ContractType.mineowner_contractor]: MiningContract,
    [ContractType.level_upgrade]: LevelUpgradeContract,
    [ContractType.undefined]: RentalContract,
};

const pageTitle = {
    [ContractType.level_upgrade]: 'pages.serviceMarket.levelUpgradeContract',
    [ContractType.landlord_mineowner]:
        'pages.serviceMarket.mineOperationContract',
    [ContractType.mineowner_contractor]: 'pages.serviceMarket.miningContract',
    [ContractType.undefined]: '',
} as const;

export const ContractPage: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const Contract = contracts[contract.type] || RentalContract;

    return (
        <Page
            headerTitle={t(
                contract.type ? pageTitle[contract.type] : 'Rent contract'
            ).toUpperCase()}
        >
            <Contract contract={contract} accountName={accountName} />
        </Page>
    );
};
