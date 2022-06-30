import React, { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { useAccountName, useTableData } from 'shared';
// eslint-disable-next-line no-restricted-imports
import { getAtomicAssetsEffect, WarehouseGate } from 'features/warehouse/model';
import { getInventoryConfig, UserInventoryType } from 'entities/smartcontract';
import { Button, Loader, Modal, Select } from 'shared/ui';
import styles from './styles.module.scss';

type Props = {
    isVisible: boolean;
    isDisabled: boolean;
    onSelect: (value: string) => void;
    onClick: () => void;
    onCancel: () => void;
};

const OrderSignModal: FC<Props> = ({
    isVisible,
    isDisabled,
    onSelect,
    onClick,
    onCancel,
}) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(WarehouseGate, { accountName });
    const { data: userInventory, isLoading: isInventoryLoading } =
        useTableData<UserInventoryType>(getInventoryConfig);
    const isAssetsLoading = useStore(getAtomicAssetsEffect.pending);

    return (
        <Modal
            visible={isVisible}
            title={t('pages.mineOperationOrder.selectMine')}
            onCancel={onCancel}
            footer={[
                <Button key="back" type="ghost" onClick={onCancel}>
                    {t('components.common.button.cancel')}
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    disabled={isDisabled}
                    onClick={onClick}
                >
                    {t('components.common.button.sign')}
                </Button>,
            ]}
        >
            <div className={styles.modalContent}>
                {isAssetsLoading || isInventoryLoading ? (
                    <Loader className={styles.loader} centered size="large" />
                ) : (
                    <Select
                        onChange={onSelect}
                        className={styles.select}
                        placeholder={t('pages.mineOperationOrder.selectMine')}
                        options={userInventory.map((item) => ({
                            value: item.asset_id,
                            label: `ID${item.asset_id}`,
                        }))}
                    />
                )}
            </div>
        </Modal>
    );
};

export { OrderSignModal };
