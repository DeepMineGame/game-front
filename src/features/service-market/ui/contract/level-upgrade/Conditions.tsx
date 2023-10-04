import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { toLocaleDate } from 'shared';
import { ContractDto, normalizeAttrs, rarityMap } from 'entities/smartcontract';
import { TableWithTitle } from '../..';
import { e_upg_asset_type, equipmentNames } from '../../../constants';

type Props = {
    contract: ContractDto;
};

const Conditions: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();
    const { asset_ids, asset_types } = normalizeAttrs(contract.attrs);
    const isEquipmentSet =
        (asset_types as unknown as string)?.split(',').length === 5;
    const conditionData = {
        Upgrade: asset_ids?.split(',').join(', '),
        ...(!!contract.deadline_time && {
            [t('pages.serviceMarket.startOperations')]: toLocaleDate(
                contract.deadline_time * 1000
            ),
        }),
        'Asset type': isEquipmentSet
            ? 'Equipment set'
            : (asset_types as unknown as string)
                  ?.split(',')
                  .map(
                      (item) =>
                          equipmentNames[item as unknown as e_upg_asset_type]
                  ),

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
