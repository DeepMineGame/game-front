import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, KeyValueTable } from '../../../ui-kit';

export const Area: FC<{
    area: number | string;
    landlord: string;
    rarity: string;
    slots: string;
}> = ({ area, landlord, rarity, slots }) => {
    const { t } = useTranslation();

    return (
        <KeyValueTable
            items={{
                [t('pages.serviceMarket.contract.area')]: `ID ${area}`,
                [t('roles.landlord')]: (
                    <Button href={`/user/${landlord}`} type="link">
                        {landlord}
                    </Button>
                ),
                [t('pages.contractorStatsAndInfo.mineArea.areaRarity')]: rarity,
                [t('pages.areaManagement.mineSlots')]: slots,
            }}
        />
    );
};
