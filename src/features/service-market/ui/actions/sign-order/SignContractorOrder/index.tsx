import { FC, useCallback, useState } from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
    AtomicHubMarketSections,
    getAtomicHubUrlToSection,
} from 'app/constants';
import {
    Button,
    Result,
    Text,
    Select,
    useReloadPage,
    showSuccessModal,
    isEmptyContractorSlot,
} from 'shared';
import { useSmartContractAction } from 'features/hooks';
import {
    $isActiveInventoryHasMineAsset,
    $mineInActiveInventory,
    MinesGate,
    minesStore,
} from 'entities/contract';
import {
    ContractorSlots,
    ContractDto,
    signOrder,
} from 'entities/smartcontract';
import { SignModal } from '../SignModal';
import styles from './styles.module.scss';

type Props = {
    contract: ContractDto;
    accountName: string;
    isClient?: 1 | 0;
};

const getEmptySlot = (slots: ContractorSlots) =>
    slots.findIndex(isEmptyContractorSlot) ?? -1;

const SignAsMineOwner: FC<Props> = ({ contract, accountName, isClient }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mineId, setMineId] = useState('');
    useGate(MinesGate, { searchParam: accountName });
    const minesFromBlockChainTable = useStore(minesStore);
    const mineInActiveInventory = useStore($mineInActiveInventory);

    const mines = minesFromBlockChainTable.length
        ? minesFromBlockChainTable
        : mineInActiveInventory;
    const emptySlot = getEmptySlot(
        minesFromBlockChainTable[0]?.contractor_slots ?? []
    );
    const isActiveInventoryHasMineAsset = useStore(
        $isActiveInventoryHasMineAsset
    );
    const signContractAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            assetId: mineId,
            contractId: contract.id,
            ...((isClient === 1 || isClient === 0) && { isClient }),
        }),
    });

    const handleSignOrder = useCallback(async () => {
        await signContractAction();
        showSuccessModal({
            title: t('pages.serviceMarket.order.signOrder'),
            content: t('pages.serviceMarket.order.orderCreated'),
            onOk: reloadPage,
        });
    }, [reloadPage, signContractAction, t]);

    const handleSign = () => {
        if (!isActiveInventoryHasMineAsset) {
            setIsWarningModalVisible(true);
        } else {
            setIsModalVisible(true);
        }
    };

    return (
        <>
            <Button onClick={handleSign} type="primary" block>
                {t('pages.serviceMarket.order.selectMineAndSign')}
            </Button>

            <SignModal
                isVisible={isWarningModalVisible}
                onCancel={() => setIsWarningModalVisible(false)}
                onOk={() =>
                    window.open(
                        getAtomicHubUrlToSection(
                            AtomicHubMarketSections.structures
                        ),
                        '_blank'
                    )
                }
                okText={t('components.common.button.visitMarketplace')}
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
                        options={mines.map((props) => ({
                            value: 'id' in props ? props.id : props.asset_id,
                            label: `ID ${
                                'id' in props ? props.id : props.asset_id
                            }`,
                        }))}
                    />
                </div>
            </SignModal>
        </>
    );
};

export { SignAsMineOwner };
