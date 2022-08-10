import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';

import { Button } from '../Button';
import { Title } from '../typography/Title';
import { Timer } from '../Timer';
import { DmpIcon } from '../../icons';
import { Modal } from '../Modal';
import styles from './styles.module.scss';

type Props = {
    visible?: boolean;
    onCancel: () => void;
    onSubmit: (useDmp: boolean) => void;
    submitText?: string;
    title: string;
};

// TODO: remove EquipmentInstallationModal and TravelModal
export const ActionModal: FC<Props> = ({
    visible,
    onCancel,
    onSubmit,
    submitText,
    title,
}) => {
    const { t } = useTranslation();
    const [useDmp, setUseDmp] = useState(false);

    const footer = (
        <div className={styles.modalFooter}>
            <Button
                type="ghost"
                icon={<Icon component={DmpIcon} />}
                className={styles.dmpButton}
                onClick={() => setUseDmp(!useDmp)}
            >
                0
            </Button>
            <div>
                <Button type="ghost" onClick={onCancel}>
                    {t('components.common.button.cancel')}
                </Button>
                <Button type="primary" onClick={() => onSubmit(useDmp)}>
                    {submitText ?? t('components.common.button.uninstall')}
                </Button>
            </div>
        </div>
    );

    return (
        <Modal
            className={styles.modal}
            visible={visible}
            title={
                <Title fontFamily="bai" level={5}>
                    {title}
                </Title>
            }
            onCancel={onCancel}
            footer={footer}
        >
            <Title level={5} fontFamily="bai" thin>
                {t(
                    useDmp
                        ? 'components.common.actionModal.descriptionDMP'
                        : 'components.common.actionModal.descriptionTime'
                )}
            </Title>
            <div>
                {!useDmp && <Timer className={styles.timer} timeSeconds={0} />}
                {useDmp && (
                    <div className={styles.infoCard}>
                        <div className={styles.infoCardText}>
                            <Icon component={DmpIcon} />
                            <div>{t('components.common.button.dmp')}</div>
                        </div>
                        <div className={styles.infoCardValue}>0</div>
                    </div>
                )}
            </div>
        </Modal>
    );
};
