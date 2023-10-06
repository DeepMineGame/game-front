import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    ExclamationCircleOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons';
import { ATOMICHUB_URL } from 'app/constants';
import { App, Modal } from 'antd';
import { getEmptySlot } from 'features/service-market';
import { useSmartContractActionDynamic } from 'features/hooks';

import {
    ContractDto,
    ContractType,
    createMineOrder,
} from 'entities/smartcontract';
import { MinesGate } from 'entities/contract';
import { Button, Result } from 'shared/ui/ui-kit';
import { neutral9 } from 'shared/ui/variables';
import {
    DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME,
    setSomethingCountDownEvent,
} from '../../../../something-in-progess-modal';
import styles from './styles.module.scss';
import { LandlordAreasGate, landlordAreasStore } from './model';

type Props = {
    contract?: ContractDto;
    accountName: string;
    isDisabled: boolean;
};

export const PlaceMyselfMineAsOwner: FC<Props> = ({
    contract,
    accountName,
    isDisabled,
}) => {
    useGate(MinesGate, { searchParam: accountName });
    useGate(LandlordAreasGate, {
        searchParam: accountName,
    });

    const { t } = useTranslation();
    const callAction = useSmartContractActionDynamic();
    const [isWarningVisible, setIsWarningVisible] = useState(false);
    const userAreas = useStore(landlordAreasStore) || [];
    const { modal } = App.useApp();
    const activeArea = userAreas.filter(
        (area) => area.owner === accountName
    )[0];

    const noEmptySlot = getEmptySlot(activeArea?.mine_slots ?? []) === -1;

    const handleCreate = async () => {
        await callAction(
            createMineOrder({
                contract_duration: 21,
                contract_type: ContractType.landlord_mineowner,
                fee_percent: 10,
                is_client: 1,
                opt_asset_id: activeArea?.id! as unknown as number,
                opt_executor: accountName,
                wax_user: accountName,
                deadline_duration_in_days: 1,
                deadline_duration_in_hours: 0,
                opt_level: null,
                opt_rarity: null,
                deposit: 0,
                autorenew_enabled: true,
            })
        );

        setSomethingCountDownEvent(DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME);
    };

    const handleClick = () => {
        if (!activeArea || noEmptySlot) {
            return setIsWarningVisible(true);
        }

        // 1. create order as ll
        if (!contract) {
            return modal.confirm({
                title: t('pages.areaManagement.placeAsMineOwner'),
                content: t('pages.areaManagement.creatingSelfMineContract'),
                icon: <ExclamationCircleOutlined style={{ color: neutral9 }} />,

                onOk: () => {
                    handleCreate();
                },
            });
        }
    };

    return (
        <>
            <Button onClick={handleClick} disabled={isDisabled}>
                {t('pages.areaManagement.placeAsMineOwner')}
            </Button>

            <Modal
                open={isWarningVisible}
                okText={t('components.common.button.visitMarketplace')}
                onCancel={() => setIsWarningVisible(false)}
                onOk={() => window.open(ATOMICHUB_URL, '_blank')}
            >
                <Result
                    className={styles.info}
                    icon={
                        <ExclamationCircleFilled className={styles.infoIcon} />
                    }
                    title={t(
                        !activeArea
                            ? 'pages.serviceMarket.order.doNotHaveArea'
                            : 'pages.serviceMarket.order.doNotHaveAreaSlot'
                    )}
                />
            </Modal>
        </>
    );
};
