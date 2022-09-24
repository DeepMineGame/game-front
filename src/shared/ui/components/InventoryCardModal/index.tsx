import {
    DMECoinIcon,
    Modal,
    useAccountName,
    useReloadPage,
    useRepair,
} from 'shared';
import React, { FC, useState, useEffect, useCallback } from 'react';
import { ModalProps, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { serviceMarket } from 'app/router/paths';
import { ServiceMarketTabIds } from 'app/router/constants';
import { useSmartContractAction } from 'features';
import { AssetDataType, getAtomicAssetsDataById } from 'entities/atomicassets';
import { repairEquipment, UserInventoryType } from 'entities/smartcontract';
import {
    ActionModal,
    Button,
    Card,
    DepreciationProgressBar,
    getCardStatus,
    Line,
    Link,
    NftProgressBar,
} from 'shared/ui/ui-kit';
import styles from './styles.module.scss';

type InventoryCardModalProps = ModalProps & {
    card: UserInventoryType;
    onSelect?: (card: UserInventoryType) => void;
};

enum ModalType {
    repair = 'repair',
    refurbish = 'refurbish',
}

export const InventoryCardModal: FC<InventoryCardModalProps> = ({
    card,
    onSelect,
    ...props
}) => {
    const reload = useReloadPage();
    const { getFinishesAtTime } = useRepair();
    const [cardData, setCardData] = useState<AssetDataType | undefined>(
        undefined
    );
    const [modalData, setModalData] = useState<{
        type?: ModalType;
        costs: {
            timeSeconds: number;
            coinAmount: number;
            energy: number;
        };
    }>({ costs: { timeSeconds: 0, coinAmount: 0, energy: 0 } });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { t } = useTranslation();

    const accountName = useAccountName();

    const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
        onSelect?.(card);
        if (props.onCancel) {
            props.onCancel(e);
        }
    };

    const updateData = useCallback(async () => {
        if (card?.asset_id) {
            setCardData(await getAtomicAssetsDataById(card.asset_id));
        }
    }, [card]);

    useEffect(() => {
        updateData();
    }, [updateData]);

    const repairAction = useSmartContractAction(
        repairEquipment(accountName, Number(cardData?.asset_id))
    );

    const refurbishAction = useSmartContractAction(
        repairEquipment(accountName, Number(cardData?.asset_id), true)
    );

    return (
        <Modal
            wideOnMobile
            {...props}
            title="Active inventory"
            className={styles.modal}
        >
            <div className={styles.container}>
                <div>
                    <Card
                        inventory={card}
                        onRepairFinish={reload}
                        repairFinishesAt={getFinishesAtTime(card)}
                        withStatus={getCardStatus(card) === 'broken'}
                        withDepreciationBar={false}
                    />
                    {onSelect && (
                        <Button
                            disabled={!!card.available_from}
                            onClick={handleSelect}
                            block
                            type="primary"
                        >
                            {t('pages.equipmentSet.cardModal.select')}
                        </Button>
                    )}
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.title}>{cardData?.data.name}</div>
                    <div className={styles.description}>
                        {cardData?.data.description}
                    </div>
                    <div className={styles.info}>
                        <Line className={styles.infoLine}>
                            <div className={styles.key}>
                                {t('pages.equipmentSet.cardModal.rarity')}
                            </div>
                            <div className={styles.value}>
                                {cardData?.data.rarity}
                            </div>
                            <Link
                                to={`${serviceMarket}?tabId=${ServiceMarketTabIds.levelUpgrade}`}
                            >
                                {t('pages.equipmentSet.cardModal.upgrade')}
                            </Link>
                        </Line>
                        <Line className={styles.infoLine}>
                            <div className={styles.key}>
                                {t('pages.equipmentSet.cardModal.level')}
                            </div>
                            <div className={styles.value}>
                                {cardData?.data.level}
                            </div>
                            <div className={styles.action}>
                                <Tooltip
                                    overlay={t('components.common.comingSoon')}
                                    mouseEnterDelay={0}
                                    mouseLeaveDelay={0}
                                >
                                    <span />
                                    <NftProgressBar
                                        initial={30}
                                        current={30}
                                        remained={120}
                                        rightContent={<DMECoinIcon />}
                                    />
                                </Tooltip>
                            </div>
                        </Line>
                        <Line className={styles.infoLine}>
                            <div className={styles.key}>
                                {t('pages.equipmentSet.cardModal.depreciation')}
                            </div>
                            <div className={styles.value}>
                                <DepreciationProgressBar
                                    completedMining={
                                        cardData?.data.depreciation
                                    }
                                    serviceLife={
                                        cardData?.data['current capacity']
                                    }
                                    totalServiceLife={
                                        cardData?.data['maximal capacity']
                                    }
                                />
                            </div>
                            <div
                                onClick={() => {
                                    setModalData({
                                        type: ModalType.repair,
                                        costs: {
                                            timeSeconds: 1,
                                            coinAmount: 1,
                                            energy: 150,
                                        },
                                    });
                                    setIsModalVisible(true);
                                }}
                                className={styles.action}
                            >
                                {t('pages.equipmentSet.cardModal.repair')}
                            </div>
                        </Line>
                        <Line className={styles.infoLine}>
                            <div className={styles.key}>
                                {t(
                                    'pages.equipmentSet.cardModal.breakageProbability'
                                )}
                            </div>
                            <div className={styles.value}>1</div>
                            <div
                                onClick={() => {
                                    setModalData({
                                        type: ModalType.refurbish,
                                        costs: {
                                            timeSeconds: 120,
                                            coinAmount: 1,
                                            energy: 150,
                                        },
                                    });
                                    setIsModalVisible(true);
                                }}
                                className={styles.action}
                            >
                                {t('pages.equipmentSet.cardModal.refurbish')}
                            </div>
                        </Line>
                    </div>
                </div>
            </div>
            <ActionModal
                visible={isModalVisible}
                texts={{
                    title:
                        modalData?.type === ModalType.repair
                            ? t('features.actions.equipmentRepair')
                            : t('features.actions.equipmentRefurbish'),
                    onOk: t(`pages.equipmentSet.cardModal.${modalData?.type}`),
                }}
                onSubmit={() => {
                    if (modalData?.type === ModalType.repair) repairAction();
                    if (modalData?.type === ModalType.refurbish)
                        refurbishAction();
                }}
                onCancel={() => setIsModalVisible(false)}
                costs={modalData?.costs}
            />
        </Modal>
    );
};
