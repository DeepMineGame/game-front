import {
    DMECoinIcon,
    GetCostParams,
    isAssetAvailable,
    useAccountName,
    useReloadPage,
    useRepair,
} from 'shared';
import React, { FC, useState, useEffect, useCallback } from 'react';
import { Col, message, Modal, ModalProps, Row, Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { createOrder } from 'app/router/paths';
import { useSmartContractAction } from 'features';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';
import {
    AssetDataType,
    getAssets,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import {
    ContractType,
    getMalfunctionProbability,
    getMalfunctionProbabilityTranslation,
    repairEquipment,
} from 'entities/smartcontract';
import { balancesStore } from 'entities/user';
import { orderFields } from 'entities/order';
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
    getAssetStatus,
    Card,
} from 'shared/ui/ui-kit';
import styles from './styles.module.scss';

type InventoryCardModalProps = ModalProps & {
    card: MergedInventoryWithAtomicAssets[number];
    onSelect?: (card: MergedInventoryWithAtomicAssets[number]) => void;
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
    const { t } = useTranslation();
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

    const accountName = useAccountName();

    const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
        onSelect?.(card);
        if (props.onCancel) {
            props.onCancel(e as any);
        }
    };

    const updateData = useCallback(async () => {
        if (card?.asset_id) {
            setCardData(await getAssets(card.asset_id));
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

    const assetIsBroken = getAssetStatus(card) === Status.broken;

    const dmeToLevelUpgrade = card?.data?.['DME to Upgrade'] || 0;
    const dmeMined = card?.data?.['DME Mined'] || 0;

    const numericMalfunctionProbability = getMalfunctionProbability(card);

    const malfunctionProbabilityTranslation = numericMalfunctionProbability
        ? t(getMalfunctionProbabilityTranslation(numericMalfunctionProbability))
        : '-';

    const isAssetPlacedInOurInventoryTable =
        card.rarity !== undefined &&
        card.level !== undefined &&
        // @ts-ignore
        (card.in_use !== undefined || card.inRentStorage);

    return (
        <Modal
            {...props}
            title="Active inventory"
            className={styles.modal}
            onOk={handleSelect}
        >
            <div className={styles.container}>
                <div>
                    <Card
                        inventory={card}
                        onRepairFinish={reload}
                        showCardBadgeStatus={assetIsBroken}
                        withDepreciationBar={false}
                    />
                    {onSelect && (
                        <Button
                            disabled={assetIsBroken || !isAssetAvailable(card)}
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
                                <Space>
                                    <Link
                                        to={`${createOrder}?${orderFields.contractType}=${ContractType.level_upgrade}`}
                                    >
                                        {t(
                                            'pages.equipmentSet.cardModal.levelUpgrade'
                                        )}
                                    </Link>
                                    <Tooltip
                                        overlay={t(
                                            'pages.equipmentSet.cardModal.levelUpgradeTooltip'
                                        )}
                                    >
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </Space>
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
                                <Space>
                                    {dmeMined === dmeToLevelUpgrade ? (
                                        <a href="https://wax.atomichub.io/tradeup/deepmineupgr/11equip+12equip+13equip+14equip+21equip+22equip+23equip+24equip+31equip+32equip+33equip+34equip+41equip+42equip+43equip+44equip+51equip+52equip+53equip+54equip">
                                            {t(
                                                'pages.equipmentSet.cardModal.rarityUpgrade'
                                            )}
                                        </a>
                                    ) : (
                                        <NftProgressBar
                                            className={
                                                styles.upgradeProgressBarWidth
                                            }
                                            current={dmeMined}
                                            remained={dmeToLevelUpgrade}
                                            rightContent={<DMECoinIcon />}
                                        />
                                    )}
                                    <Tooltip
                                        overlay={t(
                                            'pages.equipmentSet.cardModal.rarityUpgradeTooltip'
                                        )}
                                    >
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </Space>
                            </Col>
                        </Row>
                        <Divider verticalMargin={Margin.small} />
                        <Row align="middle">
                            <Col span={7}>
                                <Tooltip
                                    overlay={t(
                                        'pages.equipmentSet.cardModal.depreciationTooltip'
                                    )}
                                >
                                    <Text>
                                        {t(
                                            'pages.equipmentSet.cardModal.depreciation'
                                        )}
                                    </Text>
                                </Tooltip>
                            </Col>
                            <Col span={7}>
                                <DepreciationProgressBar
                                    className={
                                        styles.depreciationProgressBarWidth
                                    }
                                    depreciation={cardData?.data.depreciation}
                                    currentCapacity={
                                        cardData?.data['current capacity']
                                    }
                                    maximalCapacity={
                                        cardData?.data['maximal capacity']
                                    }
                                    rarity={cardData?.data.rarity}
                                />
                            </Col>
                            {isAssetPlacedInOurInventoryTable && (
                                <Col span={10}>
                                    <Space>
                                        <Button
                                            size="large"
                                            type="link"
                                            onClick={() => {
                                                setModalData({
                                                    type: ModalType.repair,
                                                    costs: {
                                                        timeSeconds: 1,
                                                        coinAmount: Number(
                                                            getCost({
                                                                level: 1,
                                                                rarity: 'Common',
                                                                isRefurbish:
                                                                    false,
                                                            })
                                                        ),
                                                        energy: 0,
                                                    },
                                                });
                                                setIsModalVisible(true);
                                            }}
                                            className={styles.button}
                                        >
                                            {t(
                                                'pages.equipmentSet.cardModal.repair'
                                            )}
                                        </Button>
                                        <Tooltip
                                            overlay={t(
                                                'pages.equipmentSet.cardModal.repairTooltip'
                                            )}
                                        >
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    </Space>
                                </Col>
                            )}
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
                                <Text>{malfunctionProbabilityTranslation}</Text>
                            </Col>
                            {isAssetPlacedInOurInventoryTable && (
                                <Col span={10}>
                                    <Space>
                                        <Button
                                            type="link"
                                            size="large"
                                            onClick={() => {
                                                setModalData({
                                                    type: ModalType.refurbish,
                                                    costs: {
                                                        timeSeconds: 120,
                                                        coinAmount: Number(
                                                            getCost({
                                                                level: card.level as GetCostParams['level'],
                                                                rarity: 'Common',
                                                                isRefurbish:
                                                                    true,
                                                            })
                                                        ),
                                                        energy: 0,
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
                                        <Tooltip
                                            overlay={t(
                                                'pages.equipmentSet.cardModal.refurbishTooltip'
                                            )}
                                        >
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    </Space>
                                </Col>
                            )}
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
