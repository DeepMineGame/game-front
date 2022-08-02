import React, { FC, useState } from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ATOMICHUB_URL } from 'app/constants';
import { Button, Result, Text, Select, useReloadPage } from 'shared';
import { MinesGate, minesStore } from 'features';
import { useSmartContractAction } from 'features/hooks';
import {
    ContractDto,
    ContractorSlots,
    signOrder,
    SlotStatus,
} from 'entities/smartcontract';
import { SignModal } from '../SignModal';
import styles from './styles.module.scss';

type Props = {
    contract: ContractDto;
    accountName: string;
};

const getEmptySlot = (slots: ContractorSlots) => {
    return (
        slots.findIndex((slot) => {
            return (
                slot.reserved === SlotStatus.unreserved &&
                slot.contractor === ''
            );
        }) ?? -1
    );
};

const SignContractorOrder: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mineId, setMineId] = useState('');

    useGate(MinesGate, { searchParam: accountName });
    const mines = useStore(minesStore);

    const emptySlot = getEmptySlot(mines[0]?.contractor_slots ?? []);

    const signContractAction = useSmartContractAction(
        signOrder({
            waxUser: accountName,
            assetId: mineId,
            contractId: contract.id,
        })
    );

    const handleSignOrder = async () => {
        await signContractAction();
        reloadPage();
    };

    const handleSign = () => {
        if (!mines.length) {
            setIsWarningModalVisible(true);
        } else {
            setIsModalVisible(true);
        }
    };

    return (
        <>
            <Button onClick={handleSign} type="primary">
                {t('pages.serviceMarket.order.selectMineAndSign')}
            </Button>

            <SignModal
                isVisible={isWarningModalVisible}
                onCancel={() => setIsWarningModalVisible(false)}
                onSubmit={() => window.open(ATOMICHUB_URL, '_blank')}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => window.open(ATOMICHUB_URL, '_blank')}
                    >
                        {t('components.common.button.visitMarketplace')}
                    </Button>,
                ]}
            >
                <Result
                    className={styles.info}
                    icon={
                        <ExclamationCircleFilled className={styles.infoIcon} />
                    }
                    title={t(
                        emptySlot
                            ? 'pages.serviceMarket.order.doNotHaveMine'
                            : 'pages.serviceMarket.order.doNotHaveMineSlot'
                    )}
                />
            </SignModal>

            <SignModal
                isVisible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSubmit={handleSignOrder}
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
            </SignModal>
        </>
    );
};

export { SignContractorOrder };
