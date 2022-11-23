import { FC } from 'react';
import { Page, StubPageMessage } from 'shared';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const NotFoundPage: FC = () => {
    const { t } = useTranslation();

    return (
        <Page className={styles.content}>
            <StubPageMessage
                className={styles.message}
                title={t('pages.notFound.title')}
                message={t('pages.notFound.message')}
            />
        </Page>
    );
};
