import React from 'react';
import { useStore } from 'effector-react';
import { Empty } from 'antd';
import { Button, KeyValueTable } from 'shared';
import { areasStore, rarityMap } from 'entities/smartcontract';
import styles from './styles.module.scss';
import { areaNftStore } from './model';

export const LandlordInfo = () => {
    const areaNft = useStore(areaNftStore);
    const area = useStore(areasStore);
    const slots = area?.[0]?.mine_slots;
    const activeSlotCount = area?.filter((slot) => slot)?.length;

    return areaNft ? (
        <KeyValueTable
            className={styles.table}
            items={{
                Area: (
                    <Button type="link">{`ID ${areaNft[0].asset_id}`}</Button>
                ),
                'Area rarity': rarityMap[areaNft[0].rarity],
                Slots: `${activeSlotCount}/${slots?.length}`,
                'Area fee': '-',
            }}
        />
    ) : (
        <Empty />
    );
};
