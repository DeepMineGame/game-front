import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { ModalProps } from 'antd';
import { getKitImage } from 'shared/lib/utils';
import { Modal, Text } from 'shared/ui/ui-kit';
import { getTimeModifier } from '../../lib';
import { UpgradeKitType } from '../../model/upgrade-kit';
import styles from './styles.module.scss';

type Props = ModalProps & {
    onSelect: (value: UpgradeKitType) => void;
    value: string;
};

type KitProps = {
    title: string;
    name: UpgradeKitType;
    selected: string;
    onClick: (name: UpgradeKitType) => void;
    bottom: ReactNode;
};

const KitCard: FC<KitProps> = ({ title, name, selected, bottom, onClick }) => {
    return (
        <div
            className={cn(styles.card, {
                [styles.selected]: selected === name,
            })}
            onClick={() => {
                onClick(name);
            }}
        >
            <img
                className={styles.image}
                src={getKitImage(name)}
                alt={`upgrade kit ${name}`}
            />
            <Text>{title}</Text>
            {bottom}
        </div>
    );
};

const UpgradeKitModal: FC<Props> = ({ onSelect, value, ...props }) => {
    const { t } = useTranslation();

    return (
        <Modal
            {...props}
            title={t('pages.engineer.selectUpgradeKit')}
            className={styles.modal}
        >
            <div className={styles.container}>
                <KitCard
                    selected={value}
                    name={UpgradeKitType.common}
                    title={t('pages.engineer.CommonKit')}
                    onClick={onSelect}
                    bottom={
                        <>
                            <Text strong>{t('components.common.free')}</Text>
                            <Text>{t('pages.engineer.noTimeReduction')}</Text>
                        </>
                    }
                />

                <KitCard
                    selected={value}
                    name={UpgradeKitType.uncommon}
                    title={t('pages.engineer.UncommonKit')}
                    onClick={onSelect}
                    bottom={
                        <>
                            {/* todo! */}
                            <Text strong>200 DME</Text>
                            <Text>
                                {`Time reduction -${
                                    100 -
                                    getTimeModifier(UpgradeKitType.uncommon)
                                }%`}
                            </Text>
                        </>
                    }
                />
            </div>
        </Modal>
    );
};

export { UpgradeKitModal };
