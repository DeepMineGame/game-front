import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { toLocaleDate } from 'shared';
import { ContractDto, rarityMap } from 'entities/smartcontract';
import { TableWithTitle } from '../..';

type Props = {
    contract: ContractDto;
};

const Conditions: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();

    const conditionData = {
        Upgrade: contract?.attrs.find(({ key }) => key === 'asset_ids')?.value,

        ...(!!contract.deadline_time && {
            [t('pages.serviceMarket.startOperations')]: toLocaleDate(
                contract.deadline_time * 1000
            ),
        }),
        [t('Cost of execution')]: `${contract.cost_of_execution} ${t(
            'components.common.button.dme'
        )}`,
        [t('Deposit')]: `${contract.deposit} ${t(
            'components.common.button.dme'
        )}`,
        [t('Level')]: contract.level,
        [t('Rarity')]:
            contract.rarity !== -1 ? rarityMap[contract.rarity] : 'unknown',
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.conditions')}
            data={conditionData}
        />
    );
};

export { Conditions };
