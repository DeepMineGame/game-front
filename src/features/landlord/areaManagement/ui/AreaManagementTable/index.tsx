import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SearchingItem, Select, Text, useAccountName } from 'shared';
import { useGate, useStore } from 'effector-react';
import { App, Button, Modal, Result } from 'antd';
import { mineOwner } from 'app/router/paths';
import { useNavigate } from 'react-router';
import { ContractDto, signOrder } from 'entities/smartcontract';
import {
    $mineInActiveInventory,
    MinesGate,
    minesStore,
} from 'entities/contract';
import { AreaManagementTableContent } from '../AreaManagementTableContent';
import {
    $minesOnLand,
    getMinesOnLandEffect,
    LandGate,
} from '../../../models/mines-on-land';
import {
    DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME,
    setSomethingCountDownEvent,
} from '../../../../something-in-progess-modal';
import { useSmartContractAction } from '../../../../hooks';
import styles from '../../../../mine-owner/crew/ui/styles.module.scss';

type Props = {
    ownContracts: ContractDto[];
    areaId: number;
    signedContracts: ContractDto[];
};

export const AreaManagementTable: FC<Props> = ({
    ownContracts,
    areaId,
    signedContracts,
}) => {
    const accountName = useAccountName();
    const navigate = useNavigate();

    useGate(LandGate, { searchParam: areaId });
    useGate(MinesGate, { searchParam: accountName });

    const { modal } = App.useApp();

    const { t } = useTranslation();
    const mines = useStore($minesOnLand);
    const userMine = useStore(minesStore);
    const mineInActiveInventory = useStore($mineInActiveInventory);
    const minesFromTableAndInventory = userMine.length
        ? userMine
        : mineInActiveInventory;

    const idsSetupMineContracts = mines.map(({ id }) => id);
    const isLoading = useStore(getMinesOnLandEffect.pending);
    const unSetupMine = signedContracts.filter(
        ({ id }) => !idsSetupMineContracts.includes(id)
    );
    const selfContract = ownContracts?.find(
        ({ client, executor }) => client === executor
    );
    const [selfMineId, setSelfMineId] = useState('');
    const [selfMineSelectModalVisibility, setSelfMineSelectModalVisibility] =
        useState(false);

    const signContractAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            contractId: selfContract?.id || 0,
            isClient: 0,
            assetId: selfMineId,
        }),
    });
    const handleSignOrder = useCallback(async () => {
        await signContractAction();
        modal.success({
            title: t('pages.serviceMarket.order.signOrder'),
            content: t('pages.serviceMarket.order.orderCreated'),
            onOk: () =>
                setSomethingCountDownEvent(
                    DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME
                ),
        });
    }, [modal, signContractAction, t]);

    const selfContractSlot = selfContract && (
        <SearchingItem
            key={selfContract.id}
            text={t('Searching for Mine owner')}
            contract={selfContract}
            accountName={accountName}
            subText={t('Sign as a mine owner to start working in your mine')}
            actionButton={
                <Button
                    onClick={() => setSelfMineSelectModalVisibility(true)}
                    type="primary"
                    size="small"
                >
                    {t('Sign the order')}
                </Button>
            }
        />
    );

    const searchingSlots = ownContracts
        .filter(({ client, executor }) => client !== executor)
        .map((contract) => (
            <SearchingItem
                key={contract.id}
                text={t('Searching for Mine owner')}
                contract={contract}
                accountName={accountName}
            />
        ));

    const unSetupMinePlug = unSetupMine.map((contract) => (
        <SearchingItem
            key={contract.id}
            text={t('Waiting for Mine set up')}
            contract={contract}
            accountName={accountName}
            actionButton={
                <Button type="link" onClick={() => navigate(mineOwner)}>
                    {t('Go to the mine ')}
                </Button>
            }
        />
    ));
    if (isLoading) {
        return null;
    }

    if (
        mines?.length ||
        searchingSlots.length ||
        unSetupMinePlug.length ||
        selfContractSlot
    ) {
        return (
            <div>
                {Boolean(mines?.length) && (
                    <AreaManagementTableContent data={mines} />
                )}
                {selfContractSlot}
                {searchingSlots}
                {unSetupMinePlug}
                <Modal
                    open={selfMineSelectModalVisibility}
                    onCancel={() => setSelfMineSelectModalVisibility(false)}
                    onOk={handleSignOrder}
                    okButtonProps={{ disabled: !selfMineId }}
                >
                    <div className={styles.selectWrapper}>
                        <Text>{t('components.common.mine.title')}</Text>
                        <br />
                        <Select
                            onChange={setSelfMineId}
                            placeholder={t('Select the mine')}
                            options={minesFromTableAndInventory.map(
                                (props) => ({
                                    value:
                                        'id' in props
                                            ? props.id
                                            : props.asset_id,
                                    label: `ID ${
                                        'id' in props
                                            ? props.id
                                            : props.asset_id
                                    }`,
                                })
                            )}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
    return (
        <Result
            icon={
                <svg
                    width="184"
                    height="117"
                    viewBox="0 0 184 117"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M92 117C142.81 117 184 108.057 184 97.0244C184 85.9922 142.81 77.0488 92 77.0488C41.1898 77.0488 0 85.9922 0 97.0244C0 108.057 41.1898 117 92 117Z"
                        fill="#262626"
                    />
                    <path
                        d="M158.125 39.2662L128.955 6.44342C127.555 4.20615 125.511 2.85352 123.358 2.85352H60.6424C58.489 2.85352 56.4449 4.20615 55.0447 6.44056L25.875 39.2691V65.634H158.125V39.2662Z"
                        stroke="#3B3B3B"
                    />
                    <path
                        d="M119.637 48.3152C119.637 43.7351 122.495 39.954 126.04 39.9512H158.125V91.708C158.125 97.7663 154.33 102.732 149.644 102.732H34.3562C29.67 102.732 25.875 97.7634 25.875 91.708V39.9512H57.96C61.5049 39.9512 64.3626 43.7266 64.3626 48.3067V48.3695C64.3626 52.9496 67.252 56.6479 70.794 56.6479H113.206C116.748 56.6479 119.637 52.9153 119.637 48.3352V48.3152Z"
                        fill="#262626"
                        stroke="#3B3B3B"
                    />
                </svg>
            }
            title={t('There are no mines installed here yet')}
            subTitle={t(
                'You need to create a contract to install the mine or choose from the existing ones on the Service Market. Also, you can become the Mineowner and install the mine on your land.'
            )}
        />
    );
};
