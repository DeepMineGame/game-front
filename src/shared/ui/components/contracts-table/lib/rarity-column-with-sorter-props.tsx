import { RarityType } from 'entities/smartcontract';
import styles from '../styles.module.scss';
import { rarityColorMapByEnum } from '..';

export const rarityColumnWithSorterProps = {
    title: 'Rarity',
    dataIndex: 'rarity',
    key: 'rarity',
    render: (rarity: -1 | RarityType) =>
        rarity === -1 ? (
            'N/A'
        ) : (
            <div
                className={styles.rarityMarker}
                style={{
                    background: rarityColorMapByEnum[rarity],
                }}
            />
        ),
    filters: [
        {
            text: 'Common',
            value: RarityType.common,
        },
        {
            text: 'Uncommon',
            value: RarityType.uncommon,
        },
        {
            text: 'Rare',
            value: RarityType.rare,
        },
        {
            text: 'Epic',
            value: RarityType.epic,
        },
        {
            text: 'Legendary',
            value: RarityType.legendary,
        },
    ],
    onFilter: (value: string | number | boolean, record: any) =>
        record.rarity === value,
};
