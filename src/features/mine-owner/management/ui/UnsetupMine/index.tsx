import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { useAccountName, useReloadPage } from 'shared';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { mineOwner } from 'app/router/paths';
import { Dropdown, Menu, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import {
    ContractDto,
    terminateContract,
    abandonMine,
    deactmine,
} from 'entities/smartcontract';
import { useSmartContractAction } from '../../../../hooks';
import { $mineOwnerManagementData } from '../../../models/mineOwnerManagement';

export const UnsetupMine: FC<{
    isMineActive: boolean;
    activeContract: ContractDto | null;
}> = ({ isMineActive, activeContract }) => {
    const accountName = useAccountName();
    const mineOwnerManagementData = useStore($mineOwnerManagementData);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const reloadPage = useReloadPage();
    const isDisabled =
        mineOwnerManagementData?.mine_has_active_contractors_contracts;
    const terminateContractAction = useSmartContractAction({
        action: terminateContract(accountName, activeContract?.id!),
    });
    const abandonMineAction = useSmartContractAction({
        action: abandonMine(
            accountName,
            mineOwnerManagementData?.mine_asset?.asset_id!
        ),
    });
    const onAbandonClick = async () => {
        await abandonMineAction();
        return navigate(mineOwner);
    };
    const onClick = async () => {
        await terminateContractAction();
        reloadPage();
    };
    const deactivateMine = useSmartContractAction({
        action: deactmine({
            waxUser: accountName,
            mineId: activeContract?.executor_asset_id,
        }),
        onSignSuccess: reloadPage,
    });

    return (
        <Dropdown
            overlay={
                <Menu
                    items={[
                        activeContract
                            ? {
                                  key: 'unsetup',
                                  onClick,
                                  disabled: isMineActive,
                                  label: t('Uninstall'),
                              }
                            : {
                                  key: 'abandon',
                                  onClick: onAbandonClick,
                                  disabled: isDisabled,
                                  label: (
                                      <Tooltip
                                          overlay={
                                              isDisabled
                                                  ? t(
                                                        'features.mineOwner.management.terminateContractorsContract'
                                                    )
                                                  : ''
                                          }
                                      >
                                          {t(
                                              'features.mineOwner.management.abandon'
                                          )}
                                      </Tooltip>
                                  ),
                              },
                        {
                            key: 'deactivate',
                            onClick: deactivateMine,
                            disabled: !isMineActive,
                            label: t('components.common.button.deactivate'),
                        },
                    ]}
                />
            }
        >
            <div>
                <SettingOutlined style={{ fontSize: '20px' }} />
            </div>
        </Dropdown>
    );
};
