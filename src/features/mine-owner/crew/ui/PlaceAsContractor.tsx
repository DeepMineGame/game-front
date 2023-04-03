import { FC, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    useSmartContractAction,
    useSmartContractActionDynamic,
} from 'features/hooks';

import {
    ContractDto,
    ContractType,
    signOrder,
    createMineOrder,
} from 'entities/smartcontract';
import { MinesGate, minesStore } from 'entities/contract';
import { confirm, Select, Text, Modal, Button } from 'shared/ui/ui-kit';
import { neutral9 } from 'shared/ui/variables';
import { useReloadPage } from 'shared/lib/hooks';
import styles from './styles.module.scss';

type Props = {
    contract?: ContractDto;
    accountName: string;
    isDisabled: boolean;
};

const PlaceAsContractor: FC<Props> = ({
    contract,
    accountName,
    isDisabled,
}) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const callAction = useSmartContractActionDynamic();

    useGate(MinesGate, { searchParam: accountName });
    const [isVisible, setIsVisible] = useState(false);
    const [mineId, setMineId] = useState('');

    const mines = useStore(minesStore);

    // 1. create
    const handleCreate = async () => {
        await callAction(
            createMineOrder({
                contract_duration: 21,
                contract_type: ContractType.mineowner_contractor,
                fee_percent: 10,
                is_client: 1,
                opt_asset_id: +mineId || 0,
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

        setIsVisible(false);

        setTimeout(() => reloadPage(), 2000);
    };

    // 2. sign
    const signContractAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            assetId: contract?.client_asset_id,
            contractId: contract?.id!,
            isClient: 0,
        }),
    });

    const handleClick = () => {
        // 1. create order as mine owner
        if (!contract) {
            return confirm({
                title: t('features.mineOwner.PlaceAsContractor'),
                content: t('features.mineOwner.creatingSelfMiningContract'),
                icon: <ExclamationCircleOutlined style={{ color: neutral9 }} />,

                onOk: () => {
                    setIsVisible(true);
                },
            });
        }

        // 2. sign mine owner contract as contractor
        confirm({
            title: t('features.mineOwner.PlaceAsContractor'),
            content: t('pages.areaManagement.youNeedSecond'),
            icon: <ExclamationCircleOutlined style={{ color: neutral9 }} />,
            onOk: () => {
                signContractAction();
            },
        });
    };

    return (
        <div>
            <Button
                type="ghost"
                onClick={handleClick}
                className={styles.button}
                disabled={isDisabled}
            >
                {t('features.mineOwner.PlaceAsContractor')}
            </Button>
            <Modal
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                onOk={handleCreate}
                okButtonProps={{ disabled: !mineId }}
            >
                <div className={styles.selectWrapper}>
                    <Text className={styles.selectTitle}>
                        {t('components.common.mine.title')}
                    </Text>
                    <Select
                        onChange={setMineId}
                        className={styles.select}
                        placeholder={t('pages.serviceMarket.order.selectMine')}
                        options={mines.map(({ id }) => ({
                            value: id,
                            label: `ID${id}`,
                        }))}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default PlaceAsContractor;
