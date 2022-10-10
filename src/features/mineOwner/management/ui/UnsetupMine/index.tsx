import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { useReloadPage } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { mineOwner } from 'app/router/paths';
import { Dropdown, Menu, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import {
    ContractDto,
    terminateContract,
    abandonMine,
} from 'entities/smartcontract';
import styles from '../MineControlPanel/styles.module.scss';
import {
    activeContractorsContractsStore,
    UnsetupMineGate,
    userMineStore,
} from '../../../models/unsetupMineModel';
import { useSmartContractAction } from '../../../../hooks';

export const UnsetupMine: FC<{
    accountName: string;
    isMineActive: boolean;
    activeContract: ContractDto | null;
}> = ({ accountName, isMineActive, activeContract }) => {
    useGate(UnsetupMineGate, { searchParams: accountName });
    const contractorsContracts = useStore(activeContractorsContractsStore);
    const userMine = useStore(userMineStore);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const reloadPage = useReloadPage();
    const isDisabled = Boolean(contractorsContracts?.length);
    const terminateContractAction = useSmartContractAction({
        action: terminateContract(accountName, activeContract?.id!, 0),
    });
    const abandonMineAction = useSmartContractAction({
        action: abandonMine(accountName, userMine?.id!),
    });
    const onAbandonClick = async () => {
        await abandonMineAction();
        return navigate(mineOwner);
    };
    const onClick = async () => {
        await terminateContractAction();
        reloadPage();
    };

    return (
        <Dropdown
            overlay={
                <Menu
                    items={[
                        {
                            key: 'button',
                            onClick: activeContract ? onClick : onAbandonClick,
                            disabled: activeContract
                                ? isMineActive
                                : isDisabled,
                            label: activeContract ? (
                                t('features.mineOwner.management.unsetup')
                            ) : (
                                <Tooltip
                                    overlay={
                                        isDisabled
                                            ? t(
                                                  'features.mineOwner.management.terminateContractorsContract'
                                              )
                                            : ''
                                    }
                                >
                                    {t('features.mineOwner.management.abandon')}
                                </Tooltip>
                            ),
                        },
                    ]}
                />
            }
        >
            <div>
                <SettingOutlined className={styles.dropDownIcon} />
            </div>
        </Dropdown>
    );
};
