import { DragEventHandler, FC, useState } from 'react';
import { Col, Row, Tooltip } from 'antd';
import cn from 'classnames';
import { Button, primary5, Title, useReloadPage } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { isUserInHive } from 'features/hive';
import { Travel } from 'features/physicalShift';
import {
    IN_GAME_NFT_IDS,
    LOCATION_TO_ID,
    withdrawAssets,
} from 'entities/smartcontract';
import { atomicTransfer, InventoriedAssets } from 'entities/atomicassets';
import {
    $inventoriedUserAssets,
    $userInventory,
    WarehouseGate,
} from '../../model';
import { useSmartContractAction } from '../../../hooks';
import styles from './styles.module.scss';
import { useRenderCards } from './utils/useRenderCards';
import { removeDraggedElementFromState } from './utils/removeDraggedElementFromState';

export const ActiveInventoryAndStorageSwapper: FC<{ accountName: string }> = ({
    accountName,
}) => {
    const { t } = useTranslation();
    useGate(WarehouseGate, { searchParam: accountName });
    const isInHive = useStore(isUserInHive);
    const renderCards = useRenderCards();
    const userAtomicAssets = useStore($inventoriedUserAssets);
    const userInventory = useStore($userInventory);
    const userInventoryNotUse = userInventory.filter(({ in_use }) => !in_use);

    const gameAssets = userAtomicAssets.filter((item) =>
        IN_GAME_NFT_IDS.includes(item.template_id!)
    );

    const [draggedElement, setDraggedElement] = useState<
        null | InventoriedAssets[number]
    >(null);
    const reloadPage = useReloadPage();
    const [draggedElements, setDraggedElements] = useState(
        new Set<InventoriedAssets[number]>()
    );
    const isAtomicIncludesDragged =
        gameAssets.filter((item) => draggedElements.has(item))?.length > 0;

    const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e?.preventDefault();

        if (draggedElement && draggedElements.has(draggedElement)) {
            return setDraggedElements(
                removeDraggedElementFromState(draggedElement)
            );
        }
        if (draggedElement) {
            return setDraggedElements(
                (state) => new Set([...state, draggedElement])
            );
        }
        return null;
    };

    const draggedElementsIds = Array.from(draggedElements).map(
        ({ asset_id }) => asset_id
    );
    const transferFromAtomicStorageToDeepMineInventory = useSmartContractAction(
        {
            action: atomicTransfer({
                accountName,
                ids: draggedElementsIds,
            }),
        }
    );
    const transferFromDeepMineInventoryToAtomicStorage = useSmartContractAction(
        {
            action: withdrawAssets(accountName, draggedElementsIds),
        }
    );
    const onTransferClick = async () => {
        if (!isAtomicIncludesDragged) {
            await transferFromDeepMineInventoryToAtomicStorage();
        } else {
            await transferFromAtomicStorageToDeepMineInventory();
        }
        return reloadPage();
    };

    const handleDragCard = (element: InventoriedAssets[number]) => {
        if (isInHive) {
            setDraggedElement(element);
        }
    };

    return (
        <Row>
            {!isInHive && (
                <Travel
                    toLocationId={LOCATION_TO_ID.hive}
                    onSuccess={reloadPage}
                />
            )}
            <Tooltip
                overlayClassName={styles.cardColumnTooltip}
                visible={!isInHive}
                color={primary5}
                overlay={t(
                    'components.hive.YouHaveToPhysicalToManageInventory'
                )}
            >
                <Col
                    span={11}
                    className={cn(styles.cardColumn, {
                        [styles.cardColumnDisabled]: !isInHive,
                    })}
                    onDrop={onDrop}
                    // https://stackoverflow.com/questions/32084053/why-is-ondrop-not-working
                    onDragOver={(e) => e.preventDefault()}
                >
                    <Title className={styles.title} level={5}>
                        {t('components.hive.activeInventory')}
                    </Title>
                    <div>
                        {isAtomicIncludesDragged && draggedElements.size ? (
                            <div className={styles.draggedElements}>
                                {renderCards(draggedElements, handleDragCard)}
                            </div>
                        ) : (
                            <div className={styles.cardsWrapper}>
                                {renderCards(
                                    userInventoryNotUse,
                                    handleDragCard
                                )}
                            </div>
                        )}
                    </div>
                </Col>
            </Tooltip>
            <Col
                offset={1}
                span={11}
                className={styles.cardColumn}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <Title level={5} className={styles.title}>
                    <span>{t('components.hive.storage')}</span>
                    <Button
                        type="primary"
                        disabled={!draggedElements?.size || !isInHive}
                        size="large"
                        onClick={onTransferClick}
                    >
                        {t('components.hive.confirmTransfer')}
                    </Button>
                </Title>
                <div className={styles.cardsWrapper}>
                    {!isAtomicIncludesDragged && draggedElements?.size ? (
                        <div className={styles.draggedElements}>
                            {renderCards(draggedElements, handleDragCard)}
                        </div>
                    ) : (
                        renderCards(gameAssets, handleDragCard)
                    )}
                </div>
            </Col>
        </Row>
    );
};
