import { FC } from 'react';
import { Header, Title } from 'shared';
import { useNavigate } from 'react-router-dom';
import {
    // contractorCabin,
    hive,
    landLord,
    mineOwner,
    serviceMarket,
} from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import styles from './styles.module.scss';

export const CityPage: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className={styles.homeScreen}>
            <Header />
            <div
                onClick={() => navigate(mineOwner)}
                className={styles.mineOwner}
            >
                <Title level={5} className={styles.mineOwnerTitle}>
                    {t('pages.home.mineOwnerCabin')}
                </Title>
            </div>
            {/* <div */}
            {/*    className={classNames(styles.contractorCabin, styles.enterLink)} */}
            {/*    onClick={() => navigate(contractorCabin)} */}
            {/* > */}
            {/*    <Title level={5}>{t('pages.home.contractorCabin')}</Title> */}
            {/* </div> */}

            <Space>
                <div className={styles.hive} onClick={() => navigate(hive)}>
                    <Title className={styles.enterLink} level={5}>
                        {t('pages.home.hive')}
                    </Title>
                </div>
                <div
                    className={styles.landlordLounge}
                    onClick={() => navigate(landLord)}
                >
                    <Title className={styles.enterLink} level={5}>
                        {t('pages.home.landlordCabin')}
                    </Title>
                </div>
                <div
                    className={styles.serviceMarket}
                    onClick={() => navigate(serviceMarket)}
                >
                    <Title level={5} className={styles.enterLink}>
                        {t('pages.serviceMarket.serviceMarket')}
                    </Title>
                </div>
            </Space>
            <div
                className={styles.engineer}
                onClick={() => navigate('/TODO_LINK_TO_ENGINEER')}
            >
                <Title level={5} className={styles.enterLink}>
                    {t('pages.home.engineers')}
                </Title>
            </div>
        </div>
    );
};
