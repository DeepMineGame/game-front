import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    getUpgradeType,
    getUpgradeRarity,
    parseAttrs,
    toLocaleDate,
    secondsToDays,
} from 'shared';
import { ContractDto } from 'entities/smartcontract';
import { TableWithTitle } from '../..';

type Props = {
    contract: ContractDto;
};

const Conditions: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();

    const isCitizen = !!contract.client && !contract.executor;

    const conditionData = {
        [t('pages.serviceMarket.upgrade')]: `${t(
            `pages.serviceMarket.levelUpgradeTab.type.${getUpgradeType({
                contract,
            })}`
        )}, ${getUpgradeRarity({ contract })}, level ${
            parseAttrs(contract)?.level
        }`,
        [t('pages.serviceMarket.startOperations')]: toLocaleDate(
            contract.start_time * 1000
        ),
        [t('pages.serviceMarket.costOfExecution')]: `${
            contract.cost_of_execution
        } ${t('components.common.button.dme')}`,
        [t('pages.serviceMarket.contract.penalty')]: `${
            contract.penalty_amount
        } ${t('components.common.button.dme')}`,
        ...(isCitizen && {
            [t('pages.serviceMarket.duration')]: `${secondsToDays(
                contract.contract_duration
            )} ${t('components.common.days').toLowerCase()}`,
        }),
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.conditions')}
            data={conditionData}
        />
    );
};

export { Conditions };
