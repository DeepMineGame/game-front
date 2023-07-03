import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
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

const BackButton = ({ className }: { className: string }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(-1)} className={className}>
            <svg
                onClick={() => navigate(-1)}
                width="67"
                height="42"
                viewBox="0 0 67 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4.5367 0H62.4645C63.6674 0 64.821 0.4757 65.6716 1.32253C66.5221 2.16936 67 3.31791 67 4.51552V37.4843C67 38.6819 66.5221 39.8305 65.6716 40.6773C64.821 41.5242 63.6674 41.9999 62.4645 41.9999H51.5897C50.9966 42.0031 50.4087 41.889 49.8602 41.6644C49.3116 41.4398 48.8133 41.1091 48.3941 40.6914L45.3018 37.6126H4.56233C3.96672 37.616 3.37636 37.5025 2.82478 37.2787C2.27322 37.0549 1.77126 36.7252 1.34771 36.3082C0.924149 35.8913 0.587227 35.3954 0.356171 34.8488C0.125122 34.3023 0.00454712 33.7157 0.00117493 33.1227V4.61817C-0.0125656 4.01659 0.0945969 3.41833 0.316376 2.85858C0.538147 2.29882 0.869957 1.78887 1.2925 1.35863C1.71503 0.928387 2.21971 0.586601 2.77682 0.353283C3.33391 0.119965 3.93231 -0.000156403 4.5367 0ZM62.4645 40.1783C62.8247 40.1967 63.1848 40.1396 63.5214 40.0108C63.8581 39.8819 64.1639 39.6841 64.4189 39.4302C64.674 39.1763 64.8727 38.8719 65.0021 38.5367C65.1316 38.2015 65.1888 37.843 65.1703 37.4843V4.61817C65.1707 4.27017 65.1002 3.92573 64.9627 3.60578C64.8252 3.28583 64.6237 2.99703 64.3706 2.75703C64.1175 2.51702 63.818 2.33085 63.4903 2.20972C63.1626 2.0886 62.8136 2.0351 62.4645 2.0525H4.56233C3.86388 2.05139 3.1916 2.31671 2.68355 2.7939C2.17549 3.2711 1.87026 3.92389 1.83073 4.61817V33.1227C1.87026 33.817 2.17549 34.4698 2.68355 34.947C3.1916 35.4242 3.86388 35.6895 4.56233 35.6883H46.0233L49.6569 39.2803C49.9024 39.5368 50.1985 39.7398 50.5267 39.8767C50.8549 40.0136 51.2081 40.0814 51.5639 40.0757L62.4645 40.1783Z"
                    fill="white"
                />
                <path
                    d="M48.2578 39.3059H27.0023L24.3711 36.7146H45.6266L48.2578 39.3059Z"
                    fill="white"
                />
                <path
                    d="M17.3125 13.4106V12.2028C17.3125 12.0981 17.1922 12.0403 17.111 12.1043L10.0672 17.6059C10.0074 17.6524 9.95894 17.712 9.92563 17.7801C9.89232 17.8482 9.875 17.923 9.875 17.9989C9.875 18.0747 9.89232 18.1495 9.92563 18.2176C9.95894 18.2857 10.0074 18.3453 10.0672 18.3918L17.111 23.8934C17.1938 23.9575 17.3125 23.8996 17.3125 23.795V22.5871C17.3125 22.5106 17.2766 22.4371 17.2172 22.3903L11.5922 17.9996L17.2172 13.6075C17.2766 13.5606 17.3125 13.4871 17.3125 13.4106Z"
                    fill="white"
                />
                <path
                    d="M26.03 23C25.7593 23 25.54 22.916 25.372 22.748C25.204 22.58 25.12 22.3607 25.12 22.09V13.2H29.264C30.0947 13.2 30.762 13.4007 31.266 13.802C31.7793 14.194 32.036 14.7167 32.036 15.37V16.112C32.036 16.4573 31.9567 16.7887 31.798 17.106C31.6393 17.414 31.42 17.6613 31.14 17.848V17.862C31.5973 17.9833 31.9613 18.2213 32.232 18.576C32.512 18.9213 32.652 19.3273 32.652 19.794V20.466C32.652 21.2313 32.4093 21.8473 31.924 22.314C31.4387 22.7713 30.7807 23 29.95 23H26.03ZM29.544 17.624C29.9827 17.624 30.3327 17.4887 30.594 17.218C30.8647 16.938 31 16.5693 31 16.112V15.37C31 14.9967 30.8367 14.698 30.51 14.474C30.1927 14.2407 29.7773 14.124 29.264 14.124H26.156V17.624H29.544ZM29.81 22.076C30.37 22.076 30.8087 21.9313 31.126 21.642C31.4527 21.3433 31.616 20.9513 31.616 20.466V19.794C31.616 19.402 31.476 19.0893 31.196 18.856C30.916 18.6133 30.5473 18.492 30.09 18.492H26.156V22.076H29.81ZM36.3495 23.112C35.6682 23.112 35.1222 22.9347 34.7115 22.58C34.3102 22.2253 34.1095 21.7493 34.1095 21.152V20.704C34.1095 20.116 34.3195 19.6447 34.7395 19.29C35.1595 18.9353 35.7149 18.758 36.4055 18.758H37.3015C37.6095 18.758 37.9269 18.8047 38.2535 18.898C38.5802 18.9913 38.8602 19.1173 39.0935 19.276V18.114C39.0935 17.722 38.9722 17.4047 38.7295 17.162C38.4869 16.91 38.1649 16.784 37.7635 16.784H36.6435C36.2422 16.784 35.9202 16.8773 35.6775 17.064C35.4349 17.2507 35.3135 17.498 35.3135 17.806H34.3055C34.3055 17.2367 34.5202 16.7793 34.9495 16.434C35.3789 16.0793 35.9435 15.902 36.6435 15.902H37.7635C38.4542 15.902 39.0095 16.1073 39.4295 16.518C39.8589 16.9193 40.0735 17.4513 40.0735 18.114V23H39.1215V22.02C38.9069 22.356 38.6222 22.622 38.2675 22.818C37.9222 23.014 37.5629 23.112 37.1895 23.112H36.3495ZM37.2175 22.23C37.6562 22.23 38.0482 22.0947 38.3935 21.824C38.7389 21.5533 38.9722 21.194 39.0935 20.746V20.228C38.9069 20.0507 38.6455 19.9107 38.3095 19.808C37.9829 19.696 37.6469 19.64 37.3015 19.64H36.4055C36.0229 19.64 35.7102 19.738 35.4675 19.934C35.2342 20.13 35.1175 20.3867 35.1175 20.704V21.152C35.1175 21.4787 35.2295 21.74 35.4535 21.936C35.6775 22.132 35.9762 22.23 36.3495 22.23H37.2175ZM44.3808 23.112C43.6155 23.112 42.9995 22.8833 42.5328 22.426C42.0662 21.9593 41.8328 21.3433 41.8328 20.578V18.576C41.8328 17.7733 42.0662 17.1293 42.5328 16.644C42.9995 16.1493 43.6108 15.902 44.3668 15.902H45.5148C46.2335 15.902 46.8122 16.1027 47.2508 16.504C47.6895 16.9053 47.9088 17.4327 47.9088 18.086H46.9288C46.9288 17.7033 46.7982 17.3953 46.5368 17.162C46.2848 16.9193 45.9442 16.798 45.5148 16.798H44.3668C43.9095 16.798 43.5408 16.9613 43.2608 17.288C42.9808 17.6147 42.8408 18.044 42.8408 18.576V20.578C42.8408 21.0727 42.9808 21.4693 43.2608 21.768C43.5502 22.0667 43.9235 22.216 44.3808 22.216H45.5288C45.9675 22.216 46.3175 22.062 46.5788 21.754C46.8495 21.446 46.9848 21.0353 46.9848 20.522H47.9648C47.9648 21.2967 47.7408 21.922 47.2928 22.398C46.8448 22.874 46.2568 23.112 45.5288 23.112H44.3808ZM54.3367 23L51.5927 19.696L50.6267 20.662V23H49.6187V13.2H50.6267V19.43L54.0847 16.014H55.3167L52.2927 19.01L55.5407 23H54.3367Z"
                    fill="white"
                />
            </svg>
        </div>
    );
};
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
                    <BackButton className={styles.backButton} />

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