import React, { FC } from 'react';
import { Button, Page, Title } from 'shared';
import { useNavigate } from 'react-router-dom';
import { city } from 'app/router/paths';
import { Space } from 'antd';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import noConnection from './images/noConnection.png';
import hourGlass from './images/hourGlass.png';
import styles from './styles.module.scss';

type Props = {
    title?: string;
    type?: 'wip' | 'lost';
};
export const PageNotFound: FC<Props> = ({ title = '404', type = 'lost' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const titleFromStateOrDefault =
        (location?.state as { title: string } | null)?.title || title;
    return (
        <Page headerTitle={titleFromStateOrDefault}>
            <Space className={styles.content} direction="vertical" size="large">
                {type === 'lost' ? (
                    <Space direction="vertical" size="large">
                        <img src={noConnection} alt="no-connection" />
                        <Title fontFamily="orbitron" level={3}>
                            {t('pages.pageNotFound.weLost')}
                        </Title>
                        <div>{t('pages.pageNotFound.itSeem')}</div>
                    </Space>
                ) : (
                    <Space direction="vertical" size="large">
                        <img src={hourGlass} alt="cooming soon" />
                        <Title fontFamily="orbitron" level={3}>
                            {t('pages.pageNotFound.soon')}
                        </Title>
                        <div>{t('pages.pageNotFound.weWork')}</div>
                    </Space>
                )}
                <Button
                    size="large"
                    ghost
                    type="primary"
                    onClick={() => navigate(city)}
                >
                    {t('pages.pageNotFound.goToCity')}
                </Button>
            </Space>
        </Page>
    );
};
