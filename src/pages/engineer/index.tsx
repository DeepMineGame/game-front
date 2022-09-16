import { Layout } from 'antd';
import { useAccountName } from 'shared/lib/hooks';
import { Header } from 'shared/ui';
import { CabinPage } from './cabin';
import styles from './styles.module.scss';

const { Header: HeaderAnt } = Layout;

const EngineerPage = () => {
    const accountName = useAccountName();

    return (
        <Layout className={styles.root}>
            <HeaderAnt className={styles.header}>
                <Header withBackButton />
            </HeaderAnt>
            <CabinPage accountName={accountName} />
        </Layout>
    );
};

export { EngineerPage };
