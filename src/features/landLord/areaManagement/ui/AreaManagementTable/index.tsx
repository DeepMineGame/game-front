import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { AddItem, DiscoverItem, SearchingItem } from 'shared';
import { useGate, useStore } from 'effector-react';
import { MineDto } from 'entities/smartcontract';
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
};
const getMineCrewContractors = (mine: MineDto) =>
    mine.contractor_slots.filter((v) => v.contractor.length > 0).length;

export const AreaManagementTable: FC<Props> = ({ disabled, accountName }) => {
    const { t } = useTranslation();
    useGate(AreaGate, { searchParam: accountName });
    const [searchingSlotsCount, setSearchingSlotsCount] = useState(0);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const mines = useStore(minesForAreaSlots);
    const data = mines?.map(
        (mine) =>
            ({
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
    const searchingSlots = new Array(searchingSlotsCount).fill(
        <SearchingItem
            onClick={() => setSearchingSlotsCount(0)}
            text={t('pages.areaManagement.search')}
        />
    );
    const emptySlots = new Array(emptySlotsCount).fill(
        <AddItem
            className={styles.emptySlot}
            onClick={() => setIsAddModalVisible(true)}
            text={t('areaManagement.addMineOwner')}
        />
    );
    const discoverSlots = new Array(discoverSlotsCount).fill(
        <DiscoverItem className={styles.discoverSlot} />
    );

    return (
        <div className={cn({ [styles.disabled]: disabled })}>
            <AreaManagementTableContent disabled={disabled} data={data} />
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
