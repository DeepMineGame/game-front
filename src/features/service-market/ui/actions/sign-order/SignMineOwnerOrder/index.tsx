import React, { FC, useCallback, useState } from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Result } from 'shared';
import {
    AtomicHubMarketSections,
    getAtomicHubUrlToSection,
} from 'app/constants';
import { App } from 'antd';
import {
    DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME,
    setSomethingCountDownEvent,
} from 'features';
import { useSmartContractAction } from 'features/hooks';
import {
    ContractDto,
    getAreasEffect,
    MineSlots,
    searchBy,
    signOrder,
    SlotStatus,
} from 'entities/smartcontract';
import { AreasGate, areasStore } from 'entities/contract';
import { SignModal } from '../SignModal';
import styles from '../SignLandlordOrder/styles.module.scss';

type Props = {
    contract: ContractDto;
    accountName: string;
    isSelfContract: boolean;
};

const getEmptySlot = (slots: MineSlots) => {
    return (
        slots.findIndex((slot) => {
            return (
                slot.reserved === SlotStatus.unreserved &&
                slot.mine_id === SlotStatus.unreserved
            );
        }) ?? -1
    );
};

const SignAsLandlord: FC<Props> = React.memo(
    ({ contract, accountName, isSelfContract }) => {
        const { modal } = App.useApp();

        const { t } = useTranslation();

        const [isModalVisible, setIsModalVisible] = useState(false);
        const userAreas = useStore(areasStore) || [];
        const isAreasLoading = useStore(getAreasEffect.pending);
        const activeArea = userAreas.filter(
            (area) => area.owner === accountName
        )[0];
        const emptySlotId = getEmptySlot(activeArea?.mine_slots ?? []);

        useGate(AreasGate, {
            searchParam: accountName,
            searchIdentificationType: searchBy.owner,
        });

        const signContractAction = useSmartContractAction({
            action: signOrder({
                waxUser: accountName,
                assetId: activeArea?.id,
                contractId: contract.id,
                ...(isSelfContract && { isClient: 1 }),
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

        const handleSign = () => {
            if (!activeArea || emptySlotId < 0) {
                setIsModalVisible(true);
            } else {
                handleSignOrder();
            }
        };

        return (
            <>
                <Button
                    onClick={handleSign}
                    type="primary"
                    disabled={isAreasLoading}
                    block
                >
                    {t('pages.serviceMarket.order.signOrder')}
                </Button>
                <SignModal
                    isVisible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    okText={t('components.common.button.visitMarketplace')}
                    onOk={() =>
                        window.open(
                            getAtomicHubUrlToSection(
                                AtomicHubMarketSections.areas
                            ),

                            '_blank'
                        )
                    }
                >
                    <Result
                        className={styles.info}
                        icon={
                            <ExclamationCircleFilled
                                className={styles.infoIcon}
                            />
                        }
                        title={t(
                            !activeArea
                                ? 'pages.serviceMarket.order.doNotHaveArea'
                                : 'pages.serviceMarket.order.doNotHaveAreaSlot'
                        )}
                    />
                </SignModal>
            </>
        );
    }
);

export { SignAsLandlord, getEmptySlot };
