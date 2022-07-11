import React from 'react';

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
    CABIN_STATUS,
    useLandLordStatus,
} from 'features';
import { useNavigate } from 'react-router-dom';
import {
    getUserConfig,
    LOCATION_TO_ID,
    UserInfoType,
} from 'entities/smartcontract';
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
    const { status } = useLandLordStatus();
    const navigate = useNavigate();
    const reloadPage = () => navigate(0);
    const { data: userInfo } = useTableData<UserInfoType>(getUserConfig);

    const inUserInLandlordLocation =
        userInfo?.[0]?.location === LOCATION_TO_ID.landlords_reception;
    return (
        <div className={styles.cabin}>
            <img
                className={styles.cabinBackground}
                src={getBackground(
                    status,
                    'uncommon',
                    inUserInLandlordLocation
                )}
                alt=""
            />
            <div className={styles.monitor}>
                {status === CABIN_STATUS.no_area && <NoArea />}
                {status === CABIN_STATUS.engage && (
                    <EngageArea disabled={!inUserInLandlordLocation} />
                )}
                {status === CABIN_STATUS.setup && <Setup />}
                {status === CABIN_STATUS.mine_is_set && <MineIsSet />}
                {status === CABIN_STATUS.searching && (
                    <Searching msUntil={1000 * 60 * 60 * 24} />
                )}
                {status === CABIN_STATUS.stats && <LandStats />}
            </div>
            {userInfo?.length && !inUserInLandlordLocation && (
                <Travel
                    toLocationId={LOCATION_TO_ID.landlords_reception}
                    onSuccess={reloadPage}
                />
            )}
        </div>
    );
};
