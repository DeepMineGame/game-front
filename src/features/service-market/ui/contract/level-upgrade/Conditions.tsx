import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { toLocaleDate } from 'shared';
import {
    ContractDto,
    ID_TO_INVENTORY,
    normalizeAttrs,
    rarityMap,
} from 'entities/smartcontract';
import { TableWithTitle } from '../..';

type Props = {
    contract: ContractDto;
};

const Conditions: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();
    const { asset_template_ids, asset_ids } = normalizeAttrs(contract.attrs);
    const equipmentNames = asset_template_ids?.map(
        (id) => ID_TO_INVENTORY[Number(id)]
    );
    const conditionData = {
        Upgrade: equipmentNames?.join(', '),

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

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.conditions')}
            data={conditionData}
        />
    );
};

export { Conditions };
