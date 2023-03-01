/* eslint-disable react/no-array-index-key */
import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { AddItem, DiscoverItem, SearchingItem, useAccountName } from 'shared';
import { useGate, useStore } from 'effector-react';
import {
    AreasDto,
    ContractDto,
    MineDto,
    MineState,
    RarityType,
} from 'entities/smartcontract';
import { AreaManagementTableContent } from '../AreaManagementTableContent';
import { AddMineOwnerModal } from '../AddMineOwnerModal';
import { Activity, MineCrewDataType } from '../../types';
import { AreaGate, minesForAreaSlots } from '../../model';
import styles from './styles.module.scss';

type Props = {
    disabled?: boolean;
    ownContracts: ContractDto[];
    selfSignedContracts: ContractDto[];
    area: AreasDto;
};
const getMineCrewContractors = (mine: MineDto) =>
    mine.contractor_slots.filter((v) => v.contractor.length > 0).length;

const rarityDiscoverSlotsAmount = {
    [RarityType.undefined]: 0,
    [RarityType.uncommon]: 3,
    [RarityType.common]: 3,
    [RarityType.rare]: 3,
    [RarityType.epic]: 4,
    [RarityType.legendary]: 5,
};

export const AreaManagementTable: FC<Props> = ({
    disabled,
    ownContracts,
    selfSignedContracts,
    area,
}) => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    useGate(AreaGate, { searchParam: accountName });
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const mines = useStore(minesForAreaSlots);

    const contracts = mines?.map(
        (mine) =>
            ({
                key: mine.id,
                discord: 'https://discord.com/',
                mine: `ID ${mine.id}`,
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
                    mine: `ID ${contract.executor_asset_id}`,
                    status: MineState.deactivated,
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
    const calculateEmptySlotsByRarity =
        Number(area?.mine_slots?.length) -
        rarityDiscoverSlotsAmount[area?.rarity] -
        Number(ownContracts?.length);
    const emptySlots = [
        ...new Array(
            calculateEmptySlotsByRarity > 0 ? calculateEmptySlotsByRarity : 0
        ),
    ].map((_, idx) => (
        <AddItem
            key={idx}
            className={styles.emptySlot}
            onClick={() => setIsAddModalVisible(true)}
            text={t('pages.areaManagement.add')}
        />
    ));
    const discoverSlots = [
        ...new Array(rarityDiscoverSlotsAmount[area.rarity]),
    ].map((_, idx) => (
        <DiscoverItem key={idx} className={styles.discoverSlot} />
    ));

    return (
        <div className={cn({ [styles.disabled]: disabled })}>
            <AreaManagementTableContent
                disabled={disabled}
                data={contracts?.concat(ownSignedContract)}
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
