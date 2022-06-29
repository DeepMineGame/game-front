import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { AddItem, DiscoverItem, SearchingItem } from 'shared';
import { AreaManagementTableContent } from '../AreaManagementTableContent';
import { AddMineOwnerModal } from '../AddMineOwnerModal';
import { MineCrewDataType } from '../../types';
import styles from './styles.module.scss';

const emptySlotsCount = 5;
const discoverSlotsCount = 2;

type Props = {
    data?: MineCrewDataType[];
    disabled?: boolean;
};

export const AreaManagementTable: FC<Props> = ({ data, disabled }) => {
    const { t } = useTranslation();
    // TODO: implement it after creating orders for mine owner
    const [searchingSlotsCount, setSearchingSlotsCount] = useState(0);
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
