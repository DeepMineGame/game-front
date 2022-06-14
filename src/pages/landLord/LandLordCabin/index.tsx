import React, { useEffect, useState } from 'react';

import {
    EngageArea,
    LandStats,
    MineIsSet,
    NoArea,
    Searching,
    Setup,
    Travel,
} from 'features';
import { useTableData } from 'shared';
import {
    getUserConfig,
    LOCATION_TO_ID,
    UserInfoType,
} from 'entities/smartcontract';
import styles from './styles.module.scss';
import { CABIN_STATUS } from './constants';

const getStatus = () => {
    return CABIN_STATUS.no_area;
};

const getBackground = (
    status: CABIN_STATUS,
    rarity: string,
    hasPhysicalShift: boolean
) => {
    const isLight = hasPhysicalShift && status >= CABIN_STATUS.engage;

    switch (rarity) {
        case 'legendary':
            return `Yellow_${isLight ? 'Light' : 'Dark'}.png`;
        case 'epic':
            return `Violet_${isLight ? 'Light' : 'Dark'}.png`;
        case 'rare':
            return `Blue_${isLight ? 'Light' : 'Dark'}.png`;
        case 'uncommon':
            return `Green_${isLight ? 'Light' : 'Dark'}.png`;
        case 'common':
        default:
            return `Gray_${isLight ? 'Light' : 'Dark'}.png`;
    }
};

export const LandLordCabin = () => {
    const [needShiftBadge, setNeedShiftBadge] = useState(false);
    const [status, setStatus] = useState<CABIN_STATUS>(CABIN_STATUS.no_area);

    const userInfo = useTableData<UserInfoType>(getUserConfig);

    const hasPhysicalShift =
        userInfo.length > 0 &&
        userInfo[0].location === LOCATION_TO_ID.landlords_reception;

    const openShiftBadge = () => {
        setNeedShiftBadge(true);
    };
    const closeShiftBadge = () => {
        setNeedShiftBadge(false);
    };

    useEffect(() => {
        if (
            status >= CABIN_STATUS.setup &&
            !hasPhysicalShift &&
            !needShiftBadge
        ) {
            openShiftBadge();
        } else if (needShiftBadge) {
            closeShiftBadge();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, hasPhysicalShift]);

    useEffect(() => {
        setStatus(getStatus());
    }, []);

    const backgroundName = getBackground(status, 'uncommon', hasPhysicalShift);

    return (
        <div
            style={{
                backgroundImage: `url("img/area/${backgroundName}")`,
            }}
            className={styles.cabinBackground}
        >
            <div className={styles.monitor}>
                {status === CABIN_STATUS.no_area && <NoArea />}
                {status === CABIN_STATUS.engage && (
                    <EngageArea disabled={!hasPhysicalShift} />
                )}
                {status === CABIN_STATUS.setup && <Setup />}
                {status === CABIN_STATUS.mine_is_set && <MineIsSet />}
                {status === CABIN_STATUS.searching && (
                    <Searching msUntil={1000 * 60 * 60 * 24} />
                )}
                {status === CABIN_STATUS.stats && <LandStats />}
            </div>
            {needShiftBadge && (
                <Travel
                    onBadgeCrossClick={closeShiftBadge}
                    toLocationId={LOCATION_TO_ID.cabinet}
                    onSuccess={closeShiftBadge}
                />
            )}
        </div>
    );
};
