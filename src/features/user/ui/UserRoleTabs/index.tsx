import React, { FC } from 'react';
import { useStore, useGate } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Empty, Space, Tooltip } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { Button, desktopS, Tabs, Title, useMediaQuery } from 'shared';
import {
    rolesStore,
    smartContractUserStore,
    UserRoles,
} from 'entities/smartcontract';
import { AvatarWithLvl, UserGate } from 'entities/user';

import { CitizenInfo } from '../../citizen';
import { LandlordInfo } from '../../landlord';
import { MineOwnerInfo } from '../../mineOwner';
import { Contractor } from '../../contractor';
import styles from './styles.module.scss';

type Props = {
    accountName: string;
};

export const UserRoleTabs: FC<Props> = ({ accountName }) => {
    useGate(UserGate, { searchParam: accountName });
    const smartContractUsers = useStore(smartContractUserStore);
    const smartContractUserData = smartContractUsers?.[0];
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();
    const roles = useStore(rolesStore) || [];
    const hasLandlordRole = roles.some(
        ({ role }) => role === UserRoles.landlord
    );
    const hasMineOwnerRole = roles.some(
        ({ role }) => role === UserRoles.mine_owner
    );
    const hasContractorRole = roles.some(
        ({ role }) => role === UserRoles.contractor
    );

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
    return accountName ? (
        <Tabs
            tabPosition={isDesktop ? 'right' : 'top'}
            config={[
                {
                    tabName: t('roles.citizen'),
                    tabContent: (
                        <>
                            {userLine}
                            <CitizenInfo accountName={accountName} />
                        </>
                    ),
                },
                {
                    tabName: t('roles.landlord'),
                    disabled: !hasLandlordRole,
                    tabContent: (
                        <>
                            {userLine}
                            <LandlordInfo />
                        </>
                    ),
                },
                {
                    tabName: t('roles.mineOwner'),
                    disabled: !hasMineOwnerRole,
                    tabContent: (
                        <>
                            {userLine}
                            <MineOwnerInfo accountName={accountName} />
                        </>
                    ),
                },
                {
                    tabName: t('roles.contractor'),
                    disabled: !hasContractorRole,
                    tabContent: (
                        <>
                            {userLine}
                            <Contractor accountName={accountName} />
                        </>
                    ),
                },
            ]}
        />
    ) : (
        <Empty />
    );
};
