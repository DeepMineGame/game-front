import { DragEventHandler, FC, useState } from 'react';
import { Col, Row } from 'antd';
import cn from 'classnames';
import { Button, Title, useReloadPage, useTravelConfirm } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { isUserInHive } from 'features/hive';
import { CallToTravelNotification } from 'features/physicalShift';
import { LOCATION_TO_ID, withdrawAssets } from 'entities/smartcontract';
import {
    atomicTransfer,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import { $mergedStorageWithAtomicAssets, WarehouseGate } from '../../model';
import { useSmartContractAction } from '../../../hooks';
import { TypeFilter } from '../filters/TypeFilter';
import { NameFilter } from '../filters/NameFilter';
import {
    $activeInventoryAssetName,
    $assetType,
    $filteredActiveInventoryAssets,
    $filteredActiveInventoryAssetsByType,
    $filteredStorageAssets,
    $filteredStorageAssetsByType,
    $storageAssetName,
    changeActiveInventoryAssetName,
    changeStorageAssetName,
    changeType,
    DraggableAssetsGate,
} from '../../model/filter';
import styles from './styles.module.scss';
import { useRenderCards } from './utils/useRenderCards';
import { removeDraggedElementFromState } from './utils/removeDraggedElementFromState';

export const ActiveInventoryAndStorageSwapper: FC<{ accountName: string }> = ({
    accountName,
}) => {
    const { t } = useTranslation();
    useGate(WarehouseGate, { searchParam: accountName });
    const isInHive = useStore(isUserInHive);
    const { travelConfirm } = useTravelConfirm(LOCATION_TO_ID.hive);
    const renderCards = useRenderCards();
    const mergedStorageWithAtomicAssets = useStore(
        $mergedStorageWithAtomicAssets
    );

    const assetTypeFilter = useStore($assetType);
    const activeInventoryAssetNameFilter = useStore($activeInventoryAssetName);
    const storageAssetNameFilter = useStore($storageAssetName);
    const filteredActiveInventoryAssetsByType = useStore(
        $filteredActiveInventoryAssetsByType
    );
    const filteredStorageAssetsByType = useStore($filteredStorageAssetsByType);
    const filteredActiveInventoryAssets = useStore(
        $filteredActiveInventoryAssets
    );
    const filteredStorageAssets = useStore($filteredStorageAssets);

    const [draggedElement, setDraggedElement] = useState<
        null | MergedInventoryWithAtomicAssets[number]
    >(null);

    const reloadPage = useReloadPage();
    const [draggedElements, setDraggedElements] = useState(
        new Set<MergedInventoryWithAtomicAssets[number]>()
    );

    useGate(DraggableAssetsGate, { assets: draggedElements });

    const isAtomicIncludesDragged =
        mergedStorageWithAtomicAssets.filter((item) =>
            draggedElements.has(item)
        )?.length > 0;

    const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e?.preventDefault();

        if (!isInHive) {
            return travelConfirm();
        }

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

    const handleDragCard = (
        element: MergedInventoryWithAtomicAssets[number]
    ) => {
        if (isInHive) {
            setDraggedElement(element);
        }
    };

    const hasDraggingElement = !!draggedElements.size;
    const isActiveInventoryAssetDragging =
        !isAtomicIncludesDragged && hasDraggingElement;

    const isStorageAssetDragging =
        isAtomicIncludesDragged && hasDraggingElement;

    return (
        <Row>
            {!isInHive && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.hive}
                    onSuccess={reloadPage}
                />
            )}
            <Col
                span={11}
                className={cn(styles.cardColumn, {
                    [styles.cardColumnDisabled]: !isInHive,
                })}
                onDrop={onDrop}
                // https://stackoverflow.com/questions/32084053/why-is-ondrop-not-working
                onDragOver={(e) => e.preventDefault()}
            >
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={4}>
                            {t('components.hive.activeInventory')}
                        </Title>
                    </Col>
                    <Col style={{ height: 40 }} />
                </Row>
                {!isStorageAssetDragging && (
                    <>
                        <TypeFilter
                            className={styles.filter}
                            activeTab={assetTypeFilter}
                            onChange={changeType}
                        />
                        <NameFilter
                            items={filteredActiveInventoryAssetsByType}
                            value={activeInventoryAssetNameFilter}
                            onChange={changeActiveInventoryAssetName}
                        />
                    </>
                )}
                <div>
                    {isStorageAssetDragging ? (
                        <div className={styles.draggedElements}>
                            {renderCards(draggedElements, handleDragCard)}
                        </div>
                    ) : (
                        <div className={styles.cardsWrapper}>
                            {renderCards(
                                filteredActiveInventoryAssets,
                                handleDragCard
                            )}
                        </div>
                    )}
                </div>
            </Col>
            <Col
                offset={1}
                span={11}
                className={styles.cardColumn}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={4}>{t('components.hive.storage')}</Title>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            disabled={!draggedElements?.size || !isInHive}
                            size="large"
                            onClick={onTransferClick}
                        >
                            {t('components.hive.confirmTransfer')}
                        </Button>
                    </Col>
                </Row>
                {!isActiveInventoryAssetDragging && (
                    <>
                        <TypeFilter
                            className={styles.filter}
                            onChange={changeType}
                            activeTab={assetTypeFilter}
                        />
                        <NameFilter
                            items={filteredStorageAssetsByType}
                            value={storageAssetNameFilter}
                            onChange={changeStorageAssetName}
                        />
                    </>
                )}
                <div className={styles.cardsWrapper}>
                    {isActiveInventoryAssetDragging ? (
                        <div className={styles.draggedElements}>
                            {renderCards(draggedElements, handleDragCard, true)}
                        </div>
                    ) : (
                        renderCards(filteredStorageAssets, handleDragCard, true)
                    )}
                </div>
            </Col>
        </Row>
    );
};
