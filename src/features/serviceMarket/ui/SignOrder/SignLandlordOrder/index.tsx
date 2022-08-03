import React, { FC, useState } from 'react';
import { useGate } from 'effector-react';
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
import { MinesGate } from '../../../operation/model';
import { SignModal } from '../SignModal';
import styles from './styles.module.scss';

type Props = {
    contract: ContractDto;
    accountName: string;
};

const SignLandlordOrder: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mineId, setMineId] = useState('');

    const { data: userInventory } =
        useTableData<UserInventoryType>(getInventoryConfig);

    const allowedMine = userInventory.filter(
        (inventory) =>
            inventory.struct_type === StructType.mine &&
            inventory.in_use === InUseType.notInUse
    );

    useGate(MinesGate, { searchParam: accountName });

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
        if (!allowedMine.length) {
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
                        options={allowedMine.map(({ asset_id }) => ({
                            value: asset_id,
                            label: `ID${asset_id}`,
                        }))}
                    />
                </div>
            </SignModal>
        </>
    );
};

export { SignLandlordOrder };
