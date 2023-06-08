import { t } from 'i18next';
import React from 'react';
import styles from '../styles.module.scss';
import { rarityColorMap } from '../contractor-mine-owner-table';

export const rarityColumnWithSorterProps = {
    title: 'Area rarity',
    dataIndex: 'rarity',
    key: 'rarity',
    render: (rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary') =>
        rarity ? (
            <div
                className={styles.rarityMarker}
                style={{ background: rarityColorMap[rarity] }}
            />
        ) : (
            t('N/A')
        ),
    filters: [
        {
            text: 'Common',
            value: 'Common',
        },
        {
            text: 'Uncommon',
            value: 'Uncommon',
        },
        {
            text: 'Rare',
            value: 'Rare',
        },
        {
            text: 'Epic',
            value: 'Epic',
        },
        {
            text: 'Legendary',
            value: 'Legendary',
        },
    ],
    onFilter: (value: string | number | boolean, record: any) =>
        record.rarity === value,
};
