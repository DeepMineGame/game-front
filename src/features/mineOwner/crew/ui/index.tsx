import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';

import { MineCrewTable, useAccountName, AddItem, SearchingItem } from 'shared';
import { createOrder } from 'app/router/paths';
import { orderFields } from 'entities/order';
import {
    ContractRole,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';
import {
    MineConsumerGate,
    $userMine,
    $ContractorContracts,
    ContractorContractsGate,
    getContractContractsFx,
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
    useGate(ContractorContractsGate, { searchParam: accountName });
    useGate(MineConsumerGate, { searchParam: accountName });
    const mines = useStore($userMine);

    const activeSlots =
        mines?.contractor_slots.filter((slot) => slot?.contractor) ?? [];

    const contracts = useStore($ContractorContracts);

    const isContractLoading = useStore(getContractContractsFx.pending);

    const contractsToSign = contracts.filter(
        (contract) =>
            contract.type === ContractType.mineowner_contractor &&
            contract.activation_time === 0 &&
            contract.status !== ContractStatus.terminated
    );

    const selfSignedContracts = contracts.filter(
        (contract) =>
            contract.type === ContractType.mineowner_contractor &&
            contract.client === contract.executor &&
            contract.deadline_time * 1000 > Date.now() &&
            contract.activation_time !== 0 &&
            contract.status === ContractStatus.active
    );
    const selfSigned = selfSignedContracts
        .filter(
            ({ client }) =>
                !activeSlots.some(({ contractor }) => contractor === client)
        )
        .map(({ id, client }) => getSlot(id, client, 1));

    const mapSlotToTableDate = activeSlots
        .map(({ contractor }, idx) => getSlot(idx, contractor, 2))
        .concat(selfSigned);

    const searchingSlots = contractsToSign.map((contract) => (
        <SearchingItem
            text={t('features.mineOwner.PlaceAsContractor')}
            contract={contract}
            accountName={accountName}
        />
    ));

    const mapEmptySlotsToAddButton = mines?.contractor_slots
        .filter((slot) => !slot?.contractor)
        .map((_, idx) => (
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
                contract={contractsToSign[0]}
                accountName={accountName}
                isDisabled={!!selfSignedContracts.length || isContractLoading}
            />
            {!!activeSlots?.length && (
                <MineCrewTable data={mapSlotToTableDate} />
            )}
            {searchingSlots}
            {mapEmptySlotsToAddButton}
        </>
    );
};
