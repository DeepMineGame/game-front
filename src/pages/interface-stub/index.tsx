import { FC, useEffect } from 'react';
import { shutdownStubMp4, shutdownStubWebm, StubPageMessage } from 'shared';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { city } from 'app/router/paths';
import styles from './styles.module.scss';

export const InterfaceStubPage: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    // useEffect(() => {
    //     if (!window.ENDPOINTS?.maintenance.server) navigate(city);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [window.ENDPOINTS?.maintenance.server]);

    return (
        <>
            <video
                autoPlay
                loop
                muted
                aria-hidden="true"
                className={styles.video}
            >
                <source src={shutdownStubWebm} type="video/webm" />
                <source src={shutdownStubMp4} type="video/mp4" />
            </video>
            <StubPageMessage
                className={styles.message}
                title={t('pages.interfaceStub.title')}
                message={t('pages.interfaceStub.message')}
            />
        </>
    );
};
