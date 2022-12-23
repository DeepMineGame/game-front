import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';

import { MineCrewTable, useAccountName, AddItem, SearchingItem } from 'shared';
import { createOrder } from 'app/router/paths';
import { orderFields } from 'entities/order';
import { ContractRole, ContractType } from 'entities/smartcontract';
import {
    getActiveOrderByType,
    getActiveSelfSignedContract,
    getNotSignedSelfContract,
} from 'entities/contract';
import {
    MineConsumerGate,
    $userMine,
    $MiningContracts,
    MiningContractsGate,
    getMiningContractsFx,
} from '../../models';
import PlaceAsContractor from './PlaceAsContractor';

const getSlot = (id: number, contractor: string, status: number) => ({
    key: id,
    discord: '-',
    contractor,
    status,
    ejection: 0,
    activity: 0,
});

export const MineOwnerCrew: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(MiningContractsGate, { searchParam: accountName });
    useGate(MineConsumerGate, { searchParam: accountName });
    const userMine = useStore($userMine);

    const activeContractors =
        userMine?.contractor_slots.filter((slot) => slot?.contractor) ?? [];

    const contracts = useStore($MiningContracts);

    const isContractsLoading = useStore(getMiningContractsFx.pending);

    const selfContractsToSign = contracts.filter(getNotSignedSelfContract);
    const selfSignedContracts = contracts.filter(getActiveSelfSignedContract);
    const miningOrders = contracts.filter(getActiveOrderByType);

    const selfSigned = selfSignedContracts
        .filter(
            ({ client }) =>
                !activeContractors.some(
                    ({ contractor }) => contractor === client
                )
        )
        .map(({ id, client }) => getSlot(id, client, 1));

    const activeSlots = activeContractors
        .map(({ contractor }, idx) => getSlot(idx, contractor, 2))
        .concat(selfSigned);

    const selfSlots = selfContractsToSign.map((contract) => (
        <SearchingItem
            key={contract.id}
            text={t('features.mineOwner.PlaceAsContractor')}
            contract={contract}
            accountName={accountName}
        />
    ));

    const searchingSlots = miningOrders.map((contract) => (
        <SearchingItem
            key={contract.id}
            text={t('features.mineOwner.searchContractor')}
            contract={contract}
            accountName={accountName}
        />
    ));

    const emptySlots = [
        ...new Array(activeContractors.length - searchingSlots.length),
    ].map((_, idx) => (
        <AddItem
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            text={t('components.common.table.addNewContractor')}
            link={`${createOrder}?${orderFields.contractType}=${ContractType.mineowner_contractor}&${orderFields.isClient}=${ContractRole.client}`}
        />
    ));

    return (
        <>
            <PlaceAsContractor
                contract={selfContractsToSign[0]}
                accountName={accountName}
                isDisabled={!!selfSignedContracts.length || isContractsLoading}
            />
            {!!activeContractors?.length && (
                <MineCrewTable data={activeSlots} />
            )}
            {selfSlots}
            {searchingSlots}
            {emptySlots}
        </>
    );
};
