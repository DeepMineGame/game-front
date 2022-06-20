import React, { FC } from 'react';
import cn from 'classnames';

import { AddItem, DiscoverItem } from 'shared';
import {
    Activity,
    AreaManagementTableContent,
    MineCrewDataType,
    Status,
} from '../AreaManagementTableContent';
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
    const emptySlots = new Array(emptySlotsCount).fill(
        <AddItem className={styles.emptySlot} />
    );
    const discoverSlots = new Array(discoverSlotsCount).fill(
        <DiscoverItem className={styles.discoverSlot} />
    );

    return (
        <div className={cn({ [styles.disabled]: disabled })}>
            <AreaManagementTableContent disabled={disabled} data={data} />
            {emptySlots}
            {discoverSlots}
        </div>
    );
};
