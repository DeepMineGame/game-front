import React, { FC } from 'react';

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
    useReloadPage,
} from 'shared';
import {
    EngageArea,
    LandStats,
    MineIsSet,
    NoArea,
    Searching,
    Setup,
    CallToTravelNotification,
    CABIN_STATUS,
    useLandLordStatus,
    AreaGate,
} from 'features';
import { useGate } from 'effector-react';
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

export const LandLordCabin: FC<{ accountName: string }> = ({ accountName }) => {
    useGate(AreaGate, { searchParam: accountName });
    const { status } = useLandLordStatus();
    const reloadPage = useReloadPage();
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
            {userInfo?.length > 0 && !inUserInLandlordLocation && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.landlords_reception}
                    onSuccess={reloadPage}
                />
            )}
        </div>
    );
};
