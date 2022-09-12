import React, { FC } from 'react';
import { useStore, useGate } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Empty, Space, Tooltip } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import {
    Button,
    desktopS,
    Tabs,
    Title,
    useMediaQuery,
    useUserRoles,
} from 'shared';
import { rolesStore, smartContractUserStore } from 'entities/smartcontract';
import { AvatarWithLvl, UserGate } from 'entities/user';

import styles from './styles.module.scss';
import { CitizenInfo } from './citizenInfo';
import { LandlordInfo } from './landlordInfo';
import { MineOwnerInfo } from './mineOwnerInfo';
import { ContractorInfo } from './contractorInfo';

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
    const userRoles = useUserRoles(roles);

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
                    disabled: !userRoles.isLandlord,
                    tabContent: (
                        <>
                            {userLine}
                            <LandlordInfo />
                        </>
                    ),
                },
                {
                    tabName: t('roles.mineOwner'),
                    disabled: !userRoles.isMineOwner,
                    tabContent: (
                        <>
                            {userLine}
                            <MineOwnerInfo accountName={accountName} />
                        </>
                    ),
                },
                {
                    tabName: t('roles.contractor'),
                    disabled: !userRoles.isContractor,
                    tabContent: (
                        <>
                            {userLine}
                            <ContractorInfo accountName={accountName} />
                        </>
                    ),
                },
            ]}
        />
    ) : (
        <Empty />
    );
};
