import { FC } from 'react';
import { useStore, useGate } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Empty, Space } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import {
    Button,
    desktopS,
    Tabs,
    Title,
    Tooltip,
    useMediaQuery,
    useUserRoles,
} from 'shared';
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
    const userRoles = useUserRoles(roles);

    const userLine = smartContractUserData && (
        <div className={styles.userLine}>
            <Space>
                <AvatarWithLvl smartContractUserData={smartContractUserData} />
                <Title level={5}>{smartContractUserData?.owner}</Title>
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
                    tab: t('roles.citizen'),
                    key: UserRoles.citizen,
                    children: (
                        <>
                            {userLine}
                            <CitizenInfo accountName={accountName} />
                        </>
                    ),
                },
                {
                    tab: t('roles.landlord'),
                    key: UserRoles.landlord,
                    disabled: !userRoles.isLandlord,
                    children: (
                        <>
                            {userLine}
                            <LandlordInfo />
                        </>
                    ),
                },
                {
                    tab: t('roles.mineOwner'),
                    key: UserRoles.mine_owner,
                    disabled: !userRoles.isMineOwner,
                    children: (
                        <>
                            {userLine}
                            <MineOwnerInfo accountName={accountName} />
                        </>
                    ),
                },
                {
                    tab: t('roles.contractor'),
                    key: UserRoles.contractor,
                    disabled: !userRoles.isContractor,
                    children: (
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
