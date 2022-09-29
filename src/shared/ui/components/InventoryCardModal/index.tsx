import {
    DMECoinIcon,
    GetCostParams,
    Modal,
    useAccountName,
    useReloadPage,
    useRepair,
} from 'shared';
import React, { FC, useState, useEffect, useCallback } from 'react';
import { Col, message, ModalProps, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { serviceMarket } from 'app/router/paths';
import { ServiceMarketTabIds } from 'app/router/constants';
import { AssetCard, getCardStatus, useSmartContractAction } from 'features';
import { useStore } from 'effector-react';
import { AssetDataType, getAtomicAssetsDataById } from 'entities/atomicassets';
import {
    rarityMap,
    repairEquipment,
    UserInventoryType,
} from 'entities/smartcontract';
import { balancesStore } from 'entities/user';
import {
    ActionModal,
    Button,
    DepreciationProgressBar,
    Link,
    NftProgressBar,
    Status,
    Text,
    Divider,
    Margin,
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
    const { getCost } = useRepair();
    const { dmeBalance } = useStore(balancesStore);

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

    const repairAction = useSmartContractAction({
        action: repairEquipment(accountName, Number(cardData?.asset_id)),
        onSignSuccess: reload,
    });

    const refurbishAction = useSmartContractAction({
        action: repairEquipment(accountName, Number(cardData?.asset_id), true),
        onSignSuccess: reload,
    });

    return (
        <Modal
            wideOnMobile
            {...props}
            title="Active inventory"
            className={styles.modal}
        >
            <div className={styles.container}>
                <div>
                    <AssetCard
                        inventory={card}
                        onRepairFinish={reload}
                        repairFinishesAt={getFinishesAtTime(card)}
                        showCardBadgeStatus={
                            getCardStatus(card) === Status.broken
                        }
                        withDepreciationBar={false}
                    />
                    {onSelect && (
                        <Button
                            disabled={!!card?.available_from}
                            onClick={handleSelect}
                            block
                            type="primary"
                        >
                            {t('pages.equipmentSet.cardModal.select')}
                        </Button>
                    )}
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.title}>
                        <Text>{cardData?.data.name}</Text>
                    </div>
                    <div className={styles.description}>
                        <Text>{cardData?.data.description}</Text>
                    </div>
                    <div className={styles.info}>
                        <Row align="middle">
                            <Col span={7}>
                                <Text>
                                    {t('pages.equipmentSet.cardModal.rarity')}
                                </Text>
                            </Col>
                            <Col span={7} className={styles.alignRight}>
                                <Text>{cardData?.data.rarity}</Text>
                            </Col>
                            <Col span={10} className={styles.rightCol}>
                                <Link
                                    to={`${serviceMarket}?tabId=${ServiceMarketTabIds.levelUpgrade}`}
                                >
                                    {t('pages.equipmentSet.cardModal.upgrade')}
                                </Link>
                            </Col>
                        </Row>
                        <Divider verticalMargin={Margin.small} />
                        <Row align="middle">
                            <Col span={7}>
                                <Text>
                                    {t('pages.equipmentSet.cardModal.level')}
                                </Text>
                            </Col>
                            <Col span={7} className={styles.alignRight}>
                                <Text>{cardData?.data.level}</Text>
                            </Col>
                            <Col span={10} className={styles.rightCol}>
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
                            </Col>
                        </Row>
                        <Divider verticalMargin={Margin.small} />
                        <Row align="middle">
                            <Col span={9}>
                                <Text>
                                    {t(
                                        'pages.equipmentSet.cardModal.depreciation'
                                    )}
                                </Text>
                            </Col>
                            <Col span={5}>
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
                            </Col>
                            <Col span={10}>
                                <Button
                                    disabled={
                                        getCardStatus(card) !== Status.broken ||
                                        !!card.available_from
                                    }
                                    size="large"
                                    type="link"
                                    onClick={() => {
                                        setModalData({
                                            type: ModalType.repair,
                                            costs: {
                                                timeSeconds: 1,
                                                coinAmount: getCost({
                                                    level: card.level as GetCostParams['level'],
                                                    rarity: rarityMap[
                                                        card.rarity
                                                    ] as GetCostParams['rarity'],
                                                    isRefurbish: false,
                                                }),
                                                energy: 150,
                                            },
                                        });
                                        setIsModalVisible(true);
                                    }}
                                    className={styles.button}
                                >
                                    {t('pages.equipmentSet.cardModal.repair')}
                                </Button>
                            </Col>
                        </Row>
                        <Divider verticalMargin={Margin.small} />
                        <Row align="middle">
                            <Col span={10}>
                                <Text>
                                    {t(
                                        'pages.equipmentSet.cardModal.breakageProbability'
                                    )}
                                </Text>
                            </Col>
                            <Col span={4} className={styles.alignRight}>
                                <Text>1</Text>
                            </Col>
                            <Col span={10}>
                                <Button
                                    disabled={
                                        getCardStatus(card) !== Status.broken ||
                                        !!card.available_from
                                    }
                                    type="link"
                                    size="large"
                                    onClick={() => {
                                        setModalData({
                                            type: ModalType.refurbish,
                                            costs: {
                                                timeSeconds: 120,
                                                coinAmount: getCost({
                                                    level: card.level as GetCostParams['level'],
                                                    rarity: rarityMap[
                                                        card.rarity
                                                    ] as GetCostParams['rarity'],
                                                    isRefurbish: true,
                                                }),
                                                energy: 150,
                                            },
                                        });
                                        setIsModalVisible(true);
                                    }}
                                    className={styles.button}
                                >
                                    {t(
                                        'pages.equipmentSet.cardModal.refurbish'
                                    )}
                                </Button>
                            </Col>
                        </Row>
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
                    if (Number(dmeBalance) < modalData.costs.coinAmount) {
                        message.warning(
                            t(
                                'pages.equipmentSet.cardModal.insufficientFunds',
                                { action: modalData?.type }
                            )
                        );
                        return;
                    }
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
