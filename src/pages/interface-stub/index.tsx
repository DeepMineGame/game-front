import { FC } from 'react';
import { shutdownStubMp4, shutdownStubWebm, StubPageMessage } from 'shared';
import { Trans } from 'react-i18next';
import styles from './styles.module.scss';

export const InterfaceStubPage: FC = () => (
    <>
        <video autoPlay loop muted aria-hidden="true" className={styles.video}>
            <source src={shutdownStubWebm} type="video/webm" />
            <source src={shutdownStubMp4} type="video/mp4" />
        </video>
        <StubPageMessage
            className={styles.message}
            title={<Trans i18nKey="pages.interfaceStub.title" />}
            message={<Trans i18nKey="pages.interfaceStub.message" />}
        />
    </>
);
