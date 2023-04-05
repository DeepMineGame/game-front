import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    getUpgradeType,
    getUpgradeRarity,
    parseAttrs,
    toLocaleDate,
} from 'shared';
import { ContractDto } from 'entities/smartcontract';
import { TableWithTitle } from '../..';

type Props = {
    contract: ContractDto;
};

const Conditions: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();
    const assets = contract?.attrs.find(
        ({ key }) => key === 'asset_ids'
    )?.value;
    const isMoreThanOneAssets = assets?.length && assets?.length > 1;

    const conditionData = {
        [t('pages.serviceMarket.upgrade')]: `${t(
            `pages.serviceMarket.levelUpgradeTab.type.${getUpgradeType({
                contract,
            })}`
        )}, ${getUpgradeRarity({ contract })}, level ${
            parseAttrs(contract)?.level
        }`,
        ...(!!contract.deadline_time && {
            [t('pages.serviceMarket.startOperations')]: toLocaleDate(
                contract.deadline_time * 1000
            ),
        }),
        [t('pages.serviceMarket.costOfExecution')]: `${
            contract.cost_of_execution
        } ${t('components.common.button.dme')}`,
        [isMoreThanOneAssets ? 'Assets' : 'Asset']: contract?.attrs.find(
            ({ key }) => key === 'asset_ids'
        )?.value,
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.conditions')}
            data={conditionData}
        />
    );
};

export { Conditions };
