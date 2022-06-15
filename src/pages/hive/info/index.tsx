import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { Button, desktopS, Page, Tabs, Title, useMediaQuery } from 'shared';
import { ShareAltOutlined } from '@ant-design/icons';
import { Col, Row, Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { AvatarWithLvl } from 'entities/user';
import { smartContractUserStore } from 'entities/smartcontract';
import styles from './styles.module.scss';

export const InfoPage: FC = () => {
    const smartContractUsers = useStore(smartContractUserStore);
    const smartContractUserData = smartContractUsers?.[0];
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();

    const userLine = smartContractUserData && (
        <div className={styles.userLine}>
            <Space>
                <AvatarWithLvl smartContractUserData={smartContractUserData} />
                <Title className={styles.title} level={5} fontFamily="orbitron">
                    {smartContractUserData?.owner}
                </Title>
            </Space>
            <div>
                <Tooltip trigger="click" overlay={t('pages.info.copied')}>
                    <Button
                        onClick={() =>
                            navigator.clipboard.writeText(window.location.href)
                        }
                        ghost
                        type="primary"
                        icon={<ShareAltOutlined />}
                    >
                        {t('pages.info.share')}
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
    const tabs = (
        <Tabs
            tabPosition={isDesktop ? 'right' : 'top'}
            config={[
                { tabName: 'Citizen', tabContent: <div>{userLine}</div> },
                { tabName: 'Landlord', tabContent: <div>{userLine}</div> },
            ]}
        />
    );
    return (
        <Page headerTitle="INFO">
            <Row>
                <Col span={24}>{tabs}</Col>
            </Row>
        </Page>
    );
};
