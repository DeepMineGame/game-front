import React, { FC, useCallback, useState } from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ATOMICHUB_URL } from 'app/constants';
import {
    Button,
    Result,
    Text,
    Select,
    useReloadPage,
    useTableData,
    success,
} from 'shared';
import { useSmartContractAction } from 'features/hooks';
import {
    ContractDto,
    getInventoryConfig,
    InUseType,
    signOrder,
    StructType,
    UserInventoryType,
} from 'entities/smartcontract';
import { MinesGate, minesStore } from '../../../operation/model';
import { SignModal } from '../SignModal';
import styles from './styles.module.scss';

type Props = {
    contract: ContractDto;
    accountName: string;
};

const SignLandlordOrder: FC<Props> = ({ contract, accountName }) => {
    useGate(MinesGate, { searchParam: accountName });

    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mineId, setMineId] = useState('');
    const userMine = useStore(minesStore);
    const { data: userInventory } =
        useTableData<UserInventoryType>(getInventoryConfig);

    const allowedMine = userInventory.filter(
        (inventory) =>
            inventory.struct_type === StructType.mine &&
            inventory.in_use === InUseType.notInUse
    );

    const signContractAction = useSmartContractAction(
        signOrder({
            waxUser: accountName,
            assetId: mineId,
            contractId: contract.id,
        })
    );

    const handleSignOrder = useCallback(async () => {
        await signContractAction();
        success({
            title: t('pages.serviceMarket.order.signOrder'),
            content: t('pages.serviceMarket.order.orderCreated'),
            onOk: reloadPage,
        });
    }, [reloadPage, signContractAction, t]);

    console.log(userMine);
    const handleSign = () => {
        if (!allowedMine.length && !userMine?.length) {
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
                    title={t('pages.serviceMarket.order.doNotHaveMine')}
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
            </SignModal>
        </>
    );
};

export { SignLandlordOrder };
