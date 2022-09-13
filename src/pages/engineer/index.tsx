import { Layout, Row } from 'antd';
import { useAccountName } from 'shared/lib/hooks';
import { Header, Loader } from 'shared/ui';
import { CabinPage } from './cabin';
import { EngineerMenu } from './ui';
import styles from './styles.module.scss';

const { Header: HeaderAnt, Content, Footer } = Layout;

const EngineerPage = () => {
    const accountName = useAccountName();

    return (
        <Layout className={styles.root}>
            <HeaderAnt className={styles.header}>
                <Header withBackButton />
            </HeaderAnt>
            <Content className={styles.content}>
                {accountName ? (
                    <CabinPage accountName={accountName} />
                ) : (
                    <Loader centered />
                )}
            </Content>
            <Footer className={styles.footer}>
                <Row justify="center">
                    <EngineerMenu />
                </Row>
            </Footer>
        </Layout>
    );
};

export { EngineerPage };
