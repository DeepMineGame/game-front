import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { toLocaleDate } from 'shared';
import { ContractDto, normalizeAttrs, rarityMap } from 'entities/smartcontract';
import { TableWithTitle } from '../..';

type Props = {
    contract: ContractDto;
};

const Conditions: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();
    const { asset_ids } = normalizeAttrs(contract.attrs);
    const conditionData = {
        Upgrade: asset_ids?.split(',').join(', '),
        ...(!!contract.deadline_time && {
            [t('pages.serviceMarket.startOperations')]: toLocaleDate(
                contract.deadline_time * 1000
            ),
        }),
        [t('Cost of execution')]: `${contract.cost_of_execution / 10 ** 8} ${t(
            'components.common.button.dme'
        )}`,
        [t('Deposit')]: `${contract.deposit / 10 ** 8} ${t(
            'components.common.button.dme'
        )}`,
        [t('Level')]: contract.level,
        [t('Rarity')]:
            contract.rarity !== -1 ? rarityMap[contract.rarity] : 'unknown',
    };

    return <TableWithTitle title={t('Conditions')} data={conditionData} />;
};

export { Conditions };
