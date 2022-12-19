import { DragEventHandler, FC, useState } from 'react';
import { Col, Row } from 'antd';
import cn from 'classnames';
import {
    Button,
    desktopS,
    Title,
    useMediaQuery,
    useReloadPage,
    useTravelConfirm,
} from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { isUserInHive } from 'features/hive';
import { CallToTravelNotification } from 'features/physicalShift';
import { LOCATION_TO_ID, withdrawAssets } from 'entities/smartcontract';
import {
    atomicTransfer,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import {
    $mergedStorageWithAtomicAssets,
    $mergedInventoryWithAtomicAssets,
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
    const isDesktop = useMediaQuery(desktopS);
    const isInHive = useStore(isUserInHive);
    const { travelConfirm } = useTravelConfirm(LOCATION_TO_ID.hive);
    const renderCards = useRenderCards();
    const mergedStorageWithAtomicAssets = useStore(
        $mergedStorageWithAtomicAssets
    );
    const mergedInventoryWithAtomicAssets = useStore(
        $mergedInventoryWithAtomicAssets
    );

    const [draggedElement, setDraggedElement] = useState<
        null | MergedInventoryWithAtomicAssets[number]
    >(null);

    const reloadPage = useReloadPage();
    const [draggedElements, setDraggedElements] = useState(
        new Set<MergedInventoryWithAtomicAssets[number]>()
    );
    const removeDraggedElements = (
        asset: MergedInventoryWithAtomicAssets[number]
    ) =>
        ![...draggedElements].some(
            (element) => element.asset_id === asset.asset_id
        );
    const isAtomicIncludesDragged =
        mergedStorageWithAtomicAssets.filter((item) =>
            draggedElements.has(item)
        )?.length > 0;

    const toggleDraggedElements = (
        e?: DragEvent,
        element?: MergedInventoryWithAtomicAssets[number]
    ) => {
        e?.preventDefault();
        const selectedElem = element || draggedElement;

        if (!isInHive) {
            return travelConfirm();
        }

        if (selectedElem && draggedElements.has(selectedElem)) {
            return setDraggedElements(
                removeDraggedElementFromState(selectedElem)
            );
        }
        if (selectedElem) {
            return setDraggedElements(
                (state) => new Set([...state, selectedElem])
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
        if (!isInHive) {
            return;
        }
        if (isDesktop) {
            return setDraggedElement(element);
        }
        return toggleDraggedElements(undefined, element);
    };

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
                onDrop={
                    toggleDraggedElements as unknown as DragEventHandler<HTMLDivElement>
                }
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
                                mergedInventoryWithAtomicAssets.filter(
                                    removeDraggedElements
                                ),
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
                onDrop={
                    toggleDraggedElements as unknown as DragEventHandler<HTMLDivElement>
                }
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
                            {renderCards(draggedElements, handleDragCard, true)}
                        </div>
                    ) : (
                        renderCards(
                            mergedStorageWithAtomicAssets.filter(
                                removeDraggedElements
                            ),
                            handleDragCard,
                            true
                        )
                    )}
                </div>
            </Col>
        </Row>
    );
};
