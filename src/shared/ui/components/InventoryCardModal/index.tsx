import { Modal } from 'shared';
import React, { FC } from 'react';
import { ModalProps } from 'antd';
import { useTranslation } from 'react-i18next';

import { getImagePath, TemplateIdType } from 'features';
import { UserInventoryType } from 'entities/smartcontract';
import styles from './styles.module.scss';

type InventoryCardModalProps = ModalProps & {
    card: UserInventoryType;
    onSelect: (card: UserInventoryType) => void;
};

export const InventoryCardModal: FC<InventoryCardModalProps> = ({
    card,
    onSelect,
    ...props
}) => {
    const { t } = useTranslation();

    const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
        onSelect(card);
        if (props.onCancel) {
            props.onCancel(e);
        }
    };

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
                        width={144}
                        src={getImagePath(
                            +card.asset_template_id as TemplateIdType
                        )}
                        alt="nft-equipment-card"
                    />
                    <div className={styles.select} onClick={handleSelect}>
                        {t('pages.inventoryCardModal.select')}
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.title}>Mine Educational Module</div>
                    <div className={styles.description}>
                        Generates energy (DME token) through processing the
                        irradiated matter extracted by the mining equipment.
                    </div>
                    <div className={styles.info}>
                        <div className={styles.infoLine}>
                            <div className={styles.key}>
                                {t('pages.inventoryCardModal.rarity')}
                            </div>
                            <div className={styles.value}>Epic</div>
                            <div className={styles.action}>
                                {t('pages.inventoryCardModal.upgrade')}
                            </div>
                        </div>
                        <div className={styles.infoLine}>
                            <div className={styles.key}>
                                {t('pages.inventoryCardModal.level')}
                            </div>
                            <div className={styles.value}>1</div>
                            <div className={styles.action}>30/120</div>
                        </div>
                        <div className={styles.infoLine}>
                            <div className={styles.key}>
                                {t('pages.inventoryCardModal.depreciation')}
                            </div>
                            <div className={styles.value}>1</div>
                            <div className={styles.action}>
                                {t('pages.inventoryCardModal.repair')}
                            </div>
                        </div>
                        <div className={styles.infoLine}>
                            <div className={styles.key}>
                                {t(
                                    'pages.inventoryCardModal.breakageProbability'
                                )}
                            </div>
                            <div className={styles.value}>1</div>
                            <div className={styles.action}>
                                {t('pages.inventoryCardModal.refurbish')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
