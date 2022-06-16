import React, { useEffect, useState } from 'react';

import {
    LightBlueBg,
    LightGrayBg,
    LightGreenBg,
    LightYellowBg,
    LightVioletBg,
    DarkYellowBg,
    DarkVioletBg,
    DarkBlueBg,
    DarkGrayBg,
    DarkGreenBg,
    useTableData,
} from 'shared';
import {
    EngageArea,
    LandStats,
    MineIsSet,
    NoArea,
    Searching,
    Setup,
    Travel,
} from 'features';
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
            return isLight ? LightYellowBg : DarkYellowBg;
        case 'epic':
            return isLight ? LightVioletBg : DarkVioletBg;
        case 'rare':
            return isLight ? LightBlueBg : DarkBlueBg;
        case 'uncommon':
            return isLight ? LightGreenBg : DarkGreenBg;
        case 'common':
        default:
            return isLight ? LightGrayBg : DarkGrayBg;
    }
};

export const LandLordCabin = () => {
    const [needShiftBadge, setNeedShiftBadge] = useState(false);
    const [status, setStatus] = useState<CABIN_STATUS>(CABIN_STATUS.no_area);

    const userInfo = useTableData<UserInfoType>(getUserConfig);

    const hasPhysicalShift =
        userInfo?.[0]?.location === LOCATION_TO_ID.landlords_reception;

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

    return (
        <div className={styles.cabin}>
            <img
                className={styles.cabinBackground}
                src={getBackground(status, 'uncommon', hasPhysicalShift)}
                alt=""
            />
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
