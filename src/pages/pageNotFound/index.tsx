import { FC } from 'react';
import { Page, Title, Text } from 'shared';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const PageNotFound: FC = () => {
    const { t } = useTranslation();

    return (
        <Page className={styles.content}>
            <div className={styles.wrapper}>
                <div className={styles.message}>
                    <Title
                        type="secondary"
                        level={4}
                        fontFamily="orbitron"
                        className={styles.title}
                    >
                        {t('pages.notFound.title')}
                    </Title>
                    <Text type="secondary">{t('pages.notFound.message')}</Text>
                </div>
            </div>
        </Page>
    );
};
