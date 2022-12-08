/* eslint-disable react/no-array-index-key */
import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { AddItem, DiscoverItem, SearchingItem } from 'shared';
import { useGate, useStore } from 'effector-react';
import { ContractDto, MineDto } from 'entities/smartcontract';
import { AreaManagementTableContent } from '../AreaManagementTableContent';
import { AddMineOwnerModal } from '../AddMineOwnerModal';
import { Activity, MineCrewDataType } from '../../types';
import { AreaGate, minesForAreaSlots } from '../../model';
import styles from './styles.module.scss';

const emptySlotsCount = 5;
const discoverSlotsCount = 2;

type Props = {
    disabled?: boolean;
    accountName: string;
    ownContracts: ContractDto[];
    selfSignedContracts: ContractDto[];
};
const getMineCrewContractors = (mine: MineDto) =>
    mine.contractor_slots.filter((v) => v.contractor.length > 0).length;

export const AreaManagementTable: FC<Props> = ({
    disabled,
    accountName,
    ownContracts,
    selfSignedContracts,
}) => {
    const { t } = useTranslation();
    useGate(AreaGate, { searchParam: accountName });
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const mines = useStore(minesForAreaSlots);

    const data = mines?.map(
        (mine) =>
            ({
                key: mine.id,
                discord: 'https://discord.com/',
                mine: `ID${mine.id}`,
                status: mine.state,
                crew: [
                    getMineCrewContractors(mine),
                    mine.contractor_slots.length,
                ],
                ejection: 346,
                activity: Activity.high,
            } as MineCrewDataType)
    );

    const ownSignedContract = selfSignedContracts
        .filter(
            (contract) =>
                !mines?.some((mine) => +mine.id === +contract.executor_asset_id)
        )
        .map(
            (contract) =>
                ({
                    key: contract.id,
                    discord: 'https://discord.com/',
                    mine: `ID${contract.executor_asset_id}`,
                    status: 3,
                    crew: [0, 0],
                    ejection: 346,
                    activity: Activity.high,
                } as MineCrewDataType)
        );

    const searchingSlots = ownContracts.map((contract) => (
        <SearchingItem
            key={contract.id}
            text={t('pages.areaManagement.search')}
            contract={contract}
            accountName={accountName}
        />
    ));

    const emptySlots = [
        ...new Array(emptySlotsCount - ownContracts.length),
    ].map((_, idx) => (
        <AddItem
            key={idx}
            className={styles.emptySlot}
            onClick={() => setIsAddModalVisible(true)}
            text={t('pages.areaManagement.add')}
        />
    ));

    const discoverSlots = [...new Array(discoverSlotsCount)].map((_, idx) => (
        <DiscoverItem key={idx} className={styles.discoverSlot} />
    ));

    return (
        <div className={cn({ [styles.disabled]: disabled })}>
            <AreaManagementTableContent
                disabled={disabled}
                data={data?.concat(ownSignedContract)}
            />
            {searchingSlots}
            {emptySlots}
            {discoverSlots}
            <AddMineOwnerModal
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
            />
        </div>
    );
};
