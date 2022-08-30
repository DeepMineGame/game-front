import { DMECoinIcon, Modal, getImagePath } from 'shared';
import React, { FC, useState, useEffect, useCallback } from 'react';
import { ModalProps, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { AssetDataType, getAtomicAssetsDataById } from 'entities/atomicassets';
import { UserInventoryType } from 'entities/smartcontract';
import { Line, NftProgressBar, RepairModal } from 'shared/ui/ui-kit';
import styles from './styles.module.scss';

type InventoryCardModalProps = ModalProps & {
    card: UserInventoryType;
    onSelect?: (card: UserInventoryType) => void;
};

export const InventoryCardModal: FC<InventoryCardModalProps> = ({
    card,
    onSelect,
    ...props
}) => {
    const [cardData, setCardData] = useState<AssetDataType | undefined>(
        undefined
    );
    const [repairModal, setRepairModal] = useState<{
        visible?: boolean;
        type?: 'repair' | 'refurbish';
        costs?: {
            timeSeconds: number;
            coinAmount: number;
            energy: number;
        };
    }>({ costs: { timeSeconds: 0, coinAmount: 0, energy: 0 } });
    const { t } = useTranslation();

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

    return (
        <Modal
            wideOnMobile
            {...props}
            title="Active inventory"
            className={styles.modal}
            removeFooter
        >
            <div className={styles.container}>
                <div>
                    <img
                        height={200}
                        style={{
                            aspectRatio: '5/7',
                        }}
                        src={getImagePath(card.template_id)}
                        alt="nft-equipment-card"
                    />
                    {onSelect && (
                        <div className={styles.select} onClick={handleSelect}>
                            {t('pages.equipmentSet.cardModal.select')}
                        </div>
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
                            <div className={styles.action}>
                                <Tooltip
                                    overlay={t('components.common.comingSoon')}
                                    mouseEnterDelay={0}
                                    mouseLeaveDelay={0}
                                >
                                    {t('pages.equipmentSet.cardModal.upgrade')}
                                </Tooltip>
                            </div>
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
                                <NftProgressBar
                                    initial={1}
                                    current={1}
                                    remained={20}
                                    rightContent={<DMECoinIcon />}
                                />
                            </div>
                            <div
                                onClick={() =>
                                    setRepairModal({
                                        type: 'repair',
                                        visible: true,
                                        costs: {
                                            timeSeconds: 1,
                                            coinAmount: 1,
                                            energy: 150,
                                        },
                                    })
                                }
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
                                onClick={() =>
                                    setRepairModal({
                                        type: 'refurbish',
                                        visible: true,
                                        costs: {
                                            timeSeconds: 120,
                                            coinAmount: 1,
                                            energy: 150,
                                        },
                                    })
                                }
                                className={styles.action}
                            >
                                {t('pages.equipmentSet.cardModal.refurbish')}
                            </div>
                        </Line>
                    </div>
                </div>
            </div>
            <RepairModal
                visible={repairModal?.visible}
                actionText={t(`features.actions.${repairModal?.type}`)}
                onSubmit={() =>
                    setRepairModal({ ...repairModal, visible: false })
                }
                onCancel={() =>
                    setRepairModal({ ...repairModal, visible: false })
                }
                costs={repairModal?.costs!}
            />
        </Modal>
    );
};
