import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared';
import { TrainingNftFull, TrainingNftStatus } from '../../model/types';
import { AvailableContent } from './AvailableContent';
import { LearnedContent } from './LearnedContent';
import { NotAvailableContent } from './NotAvailableContent';

export type Props = {
    onCancel?: () => void;
    nftData: TrainingNftFull | null;
};

const contentMap: Record<
    TrainingNftStatus,
    React.FC<{ nftData: TrainingNftFull }>
> = {
    [TrainingNftStatus.notAvailable]: NotAvailableContent,
    [TrainingNftStatus.available]: AvailableContent,
    [TrainingNftStatus.learning]: () => null,
    [TrainingNftStatus.learned]: LearnedContent,
};

const modalWidth = 440;

export const TrainingModal = ({ onCancel, nftData }: Props) => {
    const { t } = useTranslation();
    const isVisible = nftData !== null;

    return (
        <Modal
            title={
                <Text fontFamily="orbitron">
                    {t(
                        'pages.engineersTraining.trainingSlotName'
                    ).toUpperCase()}
                </Text>
            }
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            width={modalWidth}
            centered
        >
            {isVisible &&
                React.createElement(contentMap[nftData.status], {
                    nftData,
                })}
        </Modal>
    );
};
