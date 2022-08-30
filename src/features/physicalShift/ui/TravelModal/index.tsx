import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { CostBlock } from 'shared';
import { LOCATION_TO_ID } from 'entities/smartcontract';

import styles from './styles.module.scss';

interface SignContractProps {
    locationId: LOCATION_TO_ID;
    onClose: () => void;
    onClick: () => void;
    visible: boolean;
}

const titlesMap: Record<number, string> = {
    [LOCATION_TO_ID.mine]: 'contractor',
    [LOCATION_TO_ID.hive]: 'hive',
    [LOCATION_TO_ID.landlords_reception]: 'landlord',
    [LOCATION_TO_ID.mine_deck]: 'mineOwner',
};

export const TravelModal = ({
    onClick,
    onClose,
    visible,
    locationId,
}: SignContractProps) => {
    const { t } = useTranslation();
    const titleLocalesKey = titlesMap[locationId];

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            wrapClassName={styles.wrapper}
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        {t(
                            titleLocalesKey
                                ? `pages.contractor.travel.to.${titleLocalesKey}`
                                : 'pages.contractor.travel.title'
                        )}
                    </div>
                    <CloseOutlined className={styles.close} />
                </div>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>
                        {t('pages.contractor.travel.contentTitle')}
                    </div>
                    <CostBlock timeSeconds={1} />
                    <CostBlock energy={0} />
                </div>
                <div className={styles.actions}>
                    <div className={styles.buttons}>
                        <div className={styles.cancelButton} onClick={onClose}>
                            {t('components.common.button.cancel')}
                        </div>
                        <div className={styles.travelButton} onClick={onClick}>
                            {t('pages.contractor.travel.travel')}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
