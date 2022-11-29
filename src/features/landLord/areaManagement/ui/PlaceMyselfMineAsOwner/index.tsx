import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createMineOrder } from 'features/serviceMarket';
import {
    useSmartContractAction,
    useSmartContractActionDynamic,
} from 'features/hooks';

import {
    areasStore,
    ContractDto,
    ContractType,
    getInventoryConfig,
    InUseType,
    searchBy,
    signOrder,
    StructType,
    UserInventoryType,
} from 'entities/smartcontract';
import { AreasGate, MinesGate, minesStore } from 'entities/contract';
import { Button, confirm, Modal, Select, Text } from 'shared/ui/ui-kit';
import { useReloadPage, useTableData } from 'shared/lib/hooks';
import { neutral9 } from 'shared/ui/variables';
import styles from './styles.module.scss';

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
    useGate(AreasGate, {
        searchParam: accountName,
        searchIdentificationType: searchBy.owner,
    });
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const callAction = useSmartContractActionDynamic();
    const [isVisible, setIsVisible] = useState(false);
    const [mineId, setMineId] = useState('');
    const userMine = useStore(minesStore);
    const userAreas = useStore(areasStore) || [];

    const { data: userInventory } =
        useTableData<UserInventoryType>(getInventoryConfig);

    const allowedMine = userInventory.filter(
        (inventory) =>
            inventory.struct_type === StructType.mine &&
            inventory.in_use === InUseType.notInUse
    );

    const activeArea = userAreas.filter(
        (area) => area.owner === accountName
    )[0];

    const handleCreate = async () => {
        await callAction(
            createMineOrder({
                contract_duration: 21,
                contract_type: ContractType.landlord_mineowner,
                days_for_penalty: 20,
                fee_daily_min_amount: 0,
                fee_percent: 0,
                is_client: 1,
                opt_asset_id: activeArea?.id! as unknown as number,
                opt_executor: accountName,
                penalty_amount: 0,
                wax_user: accountName,
                deadline_duration_in_days: 1,
                deadline_duration_in_hours: 0,
            })
        );

        setTimeout(() => reloadPage(), 1500);
    };

    const handleClick = () => {
        // 1. create order as ll
        if (!contract) {
            return confirm({
                title: t('pages.areaManagement.placeAsMineOwner'),
                content: t('pages.areaManagement.creatingSelfMineContract'),
                icon: <ExclamationCircleOutlined style={{ color: neutral9 }} />,

                onOk: () => {
                    handleCreate();
                },
            });
        }

        // 2. sign ll contract as mine owner
        confirm({
            title: t('pages.areaManagement.placeAsMineOwner'),
            content: t('pages.areaManagement.youNeedSecond'),
            icon: <ExclamationCircleOutlined style={{ color: neutral9 }} />,
            onOk: () => setIsVisible(true),
        });
    };

    const signContractAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            assetId: mineId,
            contractId: contract?.id!,
            isClient: 0,
        }),
    });

    const handleSignOrder = async () => {
        await signContractAction();
    };

    return (
        <>
            <Button
                type="ghost"
                onClick={handleClick}
                className={styles.button}
                disabled={isDisabled}
            >
                {t('pages.areaManagement.placeAsMineOwner')}
            </Button>

            <Modal
                visible={isVisible}
                title={t('pages.serviceMarket.order.selectMine')}
                okText={t('components.common.button.sign')}
                onCancel={() => setIsVisible(false)}
                onOk={handleSignOrder}
            >
                <div className={styles.selectWrapper}>
                    <Text className={styles.selectTitle}>
                        {t('components.common.mine.title')}
                    </Text>
                    <Select
                        onChange={setMineId}
                        className={styles.select}
                        placeholder={t('pages.serviceMarket.order.selectMine')}
                        options={[
                            ...userMine.map(({ id }) => ({
                                value: id,
                                label: `ID ${id}`,
                            })),
                            ...allowedMine.map(({ asset_id }) => ({
                                value: asset_id,
                                label: `ID ${asset_id}`,
                            })),
                        ]}
                    />
                </div>
            </Modal>
        </>
    );
};
