import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { AddItem, DiscoverItem, SearchingItem } from 'shared';
import {
    Activity,
    AreaManagementTableContent,
    MineCrewDataType,
    Status,
} from '../AreaManagementTableContent';
import { AddMineOwnerModal } from '../AddMineOwnerModal';
import styles from './styles.module.scss';

const data: MineCrewDataType[] = [
    {
        discord: 'https://discord.com/',
        mine: 'ID34653485',
        status: Status.idle,
        crew: [5, 10],
        ejection: 346,
        activity: Activity.high,
    },
];

const emptySlotsCount = 5;
const discoverSlotsCount = 2;

type Props = {
    disabled?: boolean;
};

export const AreaManagementTable: FC<Props> = ({ disabled }) => {
    const { t } = useTranslation();
    const [searchingSlotsCount, setSearchingSlotsCount] = useState(1);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

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
