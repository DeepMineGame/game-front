import { FC } from 'react';
import {
    BackButton,
    desktopS,
    Title,
    useAccountName,
    useMediaQuery,
    Link,
    CityOutlined,
} from 'shared';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { city } from 'app/router/paths';
import { Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { $isBlockchainConnectionUnstable, BlockchainLoader } from 'features';
import { SettingMenu, UserAvatarAndDrawer } from 'entities/user';
import styles from './styles.module.scss';

type Props = {
    title?: string;
};

export const Header: FC<Props> = ({ title }) => {
    const accountName = useAccountName();
    const navigate = useNavigate();
    const goToBack = () => navigate(-1);
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();
    const isNodeSwitching = useStore($isBlockchainConnectionUnstable);

    return (
        <>
            <div className={styles.header}>
                <Link to={city}>
                    <Space>
                        <CityOutlined
                            width={32}
                            height={32}
                            className={styles.cityIcon}
                        />
                        <Typography.Text strong>
                            {t('components.common.city')}
                        </Typography.Text>
                    </Space>
                </Link>
                {title && !isDesktop && (
                    <div
                        className={styles.iconAndTitleWrapper}
                        onClick={goToBack}
                    >
                        <LeftOutlined className={styles.backArrow} />
                        <Title
                            level={4}
                            className={styles.title}
                            fontFamily="orbitron"
                        >
                            {title}
                        </Title>
                    </div>
                )}
                {accountName ? (
                    <div>
                        <UserAvatarAndDrawer user={accountName} />
                        {isNodeSwitching && <BlockchainLoader />}
                    </div>
                ) : (
                    <div>
                        <SettingMenu />
                    </div>
                )}
            </div>
            {title && (
                <div className={styles.backButtonAndTitleWrapper}>
                    <BackButton onClick={goToBack} />
                    <Title className={styles.title} fontFamily="orbitron">
                        {title}
                    </Title>
                    <div />
                </div>
            )}
        </>
    );
};
