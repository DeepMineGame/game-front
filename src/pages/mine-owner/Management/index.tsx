import Lottie from 'lottie-react';
import { CallToTravelNotification, MineOwnerManagementPanel } from 'features';
import { desktopS, useMediaQuery, useReloadPage, useTableData } from 'shared';
import {
    getUserConfig,
    LOCATION_TO_ID,
    UserInfoType,
} from 'entities/smartcontract';
import sphere from './assets/sphere.json';
import bar from './assets/bar.json';
import carousel from './assets/carousel.json';
import vinyl from './assets/vinil.json';

import styles from './styles.module.scss';

export const MineOwnerManagementPage = () => {
    const { data: userInfo } = useTableData<UserInfoType>(getUserConfig);
    const inUserInMineOwnerLocation =
        userInfo?.[0]?.location === LOCATION_TO_ID.mine_deck;
    const reloadPage = useReloadPage();
    const isDesktop = useMediaQuery(desktopS);

    return (
        <>
            <div className={styles.background} />

            {isDesktop && (
                <div className={styles.left}>
                    <Lottie animationData={sphere} className={styles.sphere} />
                    <Lottie animationData={bar} className={styles.bar} />
                </div>
            )}
            <div className={styles.panel}>
                <MineOwnerManagementPanel />
            </div>
            {isDesktop && (
                <div className={styles.right}>
                    <Lottie
                        animationData={carousel}
                        className={styles.carousel}
                    />
                    <Lottie animationData={vinyl} className={styles.vinyl} />
                </div>
            )}
            {userInfo?.length && !inUserInMineOwnerLocation && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.mine_deck}
                    onSuccess={reloadPage}
                />
            )}
        </>
    );
};
