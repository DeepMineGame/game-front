import { useTranslation } from 'react-i18next';
import { CreateRentOrder } from 'features';
import { Page } from 'shared';
import styles from '../service-market/order/create/styles.module.scss';

export const CreateRentOrderPage = () => {
    const { t } = useTranslation();

    return (
        <Page
            className={styles.page}
            headerTitle={t('Create order').toUpperCase()}
        >
            <CreateRentOrder />
        </Page>
    );
};
