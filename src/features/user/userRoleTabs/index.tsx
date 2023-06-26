import { FC } from 'react';
import { useStore, useGate } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Empty, Space, Tabs, Tooltip } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { Button, desktopS, Title, useMediaQuery, useUserRoles } from 'shared';
import {
    rolesStore,
    smartContractUserStore,
    UserRoles,
} from 'entities/smartcontract';
import { AvatarWithLvl, UserGate } from 'entities/user';

import styles from './styles.module.scss';
import { CitizenInfo } from './citizenInfo';
import { LandlordInfo } from './landlordInfo';
import { MineOwnerInfo } from './mineOwnerInfo';
import { ContractorInfo } from './contractorInfo';
import { EngineerInfo } from './engineerInfo';

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
            items={[
                {
                    label: t('roles.citizen'),
                    key: String(UserRoles.citizen),
                    children: (
                        <>
                            {userLine}
                            <CitizenInfo accountName={accountName} />
                        </>
                    ),
                },
                {
                    label: t('roles.landlord'),
                    key: String(UserRoles.landlord),
                    disabled: !userRoles.isLandlord,
                    children: (
                        <>
                            {userLine}
                            <LandlordInfo />
                        </>
                    ),
                },
                {
                    label: t('roles.mineowner'),
                    key: String(UserRoles.mine_owner),
                    disabled: !userRoles.isMineOwner,
                    children: (
                        <>
                            {userLine}
                            <MineOwnerInfo accountName={accountName} />
                        </>
                    ),
                },
                {
                    label: t('roles.contractor'),
                    key: String(UserRoles.contractor),
                    disabled: !userRoles.isContractor,
                    children: (
                        <>
                            {userLine}
                            <ContractorInfo accountName={accountName} />
                        </>
                    ),
                },
                {
                    label: t('roles.engineer'),
                    key: String(UserRoles.engineer),
                    disabled: !userRoles.isEngineer,
                    children: (
                        <>
                            {userLine}
                            <EngineerInfo />
                        </>
                    ),
                },
            ]}
        />
    ) : (
        <Empty />
    );
};
