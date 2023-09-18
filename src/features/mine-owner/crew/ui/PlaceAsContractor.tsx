import { FC, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { App, Modal } from 'antd';
import { useSmartContractActionDynamic } from 'features/hooks';

import { ContractType, createMineOrder } from 'entities/smartcontract';
import { MinesGate, minesStore } from 'entities/contract';
import { Select, Text, Button } from 'shared/ui/ui-kit';
import { neutral9 } from 'shared/ui/variables';
import { useReloadPage } from 'shared/lib/hooks';
import styles from './styles.module.scss';

type Props = {
    accountName: string;
    isDisabled: boolean;
};
const IS_ORDER_BY_SELF_CREATED = 'IS_ORDER_BY_SELF_CREATED';

const PlaceAsContractor: FC<Props> = ({ accountName, isDisabled }) => {
    const { t } = useTranslation();
    const { modal } = App.useApp();

    const reloadPage = useReloadPage();
    const callAction = useSmartContractActionDynamic();

    useGate(MinesGate, { searchParam: accountName });
    const [isVisible, setIsVisible] = useState(false);
    const [mineId, setMineId] = useState('');

    const mines = useStore(minesStore);

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
        localStorage.setItem(IS_ORDER_BY_SELF_CREATED, 'true');
        setIsVisible(false);

        setTimeout(() => reloadPage(), 2000);
    };

    const handleClick = () => {
        return modal.confirm({
            title: t('Place myself as a contractor'),
            content: t('features.mineOwner.creatingSelfMiningContract'),
            icon: <ExclamationCircleOutlined style={{ color: neutral9 }} />,

            onOk: () => {
                setIsVisible(true);
            },
        });
    };
    const isSelfContractCreated =
        localStorage.getItem(IS_ORDER_BY_SELF_CREATED) === 'true';
    return (
        <div>
            <Button
                onClick={handleClick}
                className={styles.button}
                disabled={isDisabled || isSelfContractCreated}
            >
                {t('Place myself as a contractor')}
            </Button>
            <Modal
                open={isVisible}
                onCancel={() => setIsVisible(false)}
                onOk={handleCreate}
                okButtonProps={{ disabled: !mineId }}
            >
                <div className={styles.selectWrapper}>
                    <Text>{t('components.common.mine.title')}</Text>
                    <br />
                    <Select
                        onChange={setMineId}
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
