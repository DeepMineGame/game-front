import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DMECoinIcon, EnergyIcon, TimerIcon } from 'shared/ui/icons';
import { getTimeLeft } from 'shared/ui/utils';
import { ModalWithTableProps, ModalWithTable } from '../modal-with-table';

type Costs = {
    timeSeconds?: number;
    energy?: number;
    coinAmount?: number;
};

export const ActionModal: FC<ModalWithTableProps & { costs: Costs }> = ({
    costs: { timeSeconds, energy, coinAmount },
    texts,
    ...props
}) => {
    const { t } = useTranslation();

    const items = [
        timeSeconds !== undefined && [
            <>
                <TimerIcon />
                <div>{t('kit.timer.time')}</div>
            </>,
            getTimeLeft(timeSeconds, true),
        ],
        energy !== undefined && [
            <>
                <EnergyIcon />
                <div>{t('kit.timer.energy')}</div>
            </>,
            energy,
        ],
        coinAmount !== undefined && [
            <>
                <DMECoinIcon width={24} height={24} />
                <div>{t('components.common.button.dme')}</div>
            </>,
            coinAmount,
        ],
    ].filter(Boolean);

    return (
        <ModalWithTable
            {...props}
            texts={{
                ...texts,
                subtitle: t('components.common.actionModal.descriptionTime'),
            }}
            items={items as React.ReactNode[][]}
        />
    );
};
