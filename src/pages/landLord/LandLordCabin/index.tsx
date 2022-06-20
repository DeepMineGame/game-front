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
} from 'shared';
import {
    EngageArea,
    LandStats,
    MineIsSet,
    NoArea,
    Searching,
    Setup,
    Travel,
    CABIN_STATUS,
    useLandLordStatus,
} from 'features';
import { LOCATION_TO_ID } from 'entities/smartcontract';
import styles from './styles.module.scss';

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
    const { status, hasPhysicalShift } = useLandLordStatus();

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
                    toLocationId={LOCATION_TO_ID.landlords_reception}
                    onSuccess={closeShiftBadge}
                />
            )}
        </div>
    );
};
