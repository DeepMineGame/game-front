import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import {
    LevelUpgradeContract,
    MineOperationContract,
    MiningContract,
} from 'features/serviceMarket';
import { ContractDto, ContractType } from 'entities/smartcontract';

type Props = { contract: ContractDto; accountName: string };

const contracts = {
    [ContractType.level_upgrade]: LevelUpgradeContract,
    [ContractType.landlord_mineowner]: MineOperationContract,
    [ContractType.mineowner_contractor]: MiningContract,
    [ContractType.undefined]: MiningContract,
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

    const Contract = contracts[contract.type];

    return (
        <Page headerTitle={t(pageTitle[contract.type]).toUpperCase()}>
            <Contract contract={contract} accountName={accountName} />
        </Page>
    );
};
