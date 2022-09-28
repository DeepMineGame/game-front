import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';

import { MineCrewTable, useAccountName, AddItem } from 'shared';
import { createOrder } from 'app/router/paths';
import { orderFields } from 'entities/order';
import { ContractRole, ContractType } from 'entities/smartcontract';
import { MineConsumerGate, userMineStore } from '../../models';

export const MineOwnerCrew: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(MineConsumerGate, { searchParam: accountName });
    const mines = useStore(userMineStore);
    const activeSlots = mines?.[0]?.contractor_slots.filter(
        (slot) => slot?.contractor
    );
    const mapSlotToTableDate = activeSlots?.map((slot, i) => ({
        key: i,
        discord: '-',
        contractor: slot.contractor,
        status: 2,
        ejection: 0,
        activity: 0,
    }));
    const mapEmptySlotsToAddButton = mines?.[0]?.contractor_slots
        .filter((slot) => !slot?.contractor)
        // eslint-disable-next-line react/no-array-index-key
        .map((_, i) => (
            <AddItem
                key={i}
                text={t('components.common.table.addNewContractor')}
                link={`${createOrder}?${orderFields.contractType}=${ContractType.mineowner_contractor}&${orderFields.isClient}=${ContractRole.client}`}
            />
        ));

    return (
        <>
            {Boolean(activeSlots?.length) && (
                <MineCrewTable data={mapSlotToTableDate} />
            )}
            {mapEmptySlotsToAddButton}
        </>
    );
};
