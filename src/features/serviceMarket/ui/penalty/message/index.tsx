import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'shared';

type Props = {
    amount: number;
    isClientDemandPenalty: boolean;
    isClientDoesntDemandPenalty: boolean;
    isExecutorAndClientDemandPenalty: boolean;
    isExecutorAndClientDoesntDemandPenalty: boolean;
};

export const PenaltyMessage: FC<Props> = ({
    amount,
    ...penaltyMessageConditions
}) => {
    const { t } = useTranslation();

    const message = useMemo(() => {
        const currentCondition = Object.entries(penaltyMessageConditions).find(
            ([, value]) => value
        )?.[0];

        const messageByCurrentCondition = t(
            `pages.serviceMarket.contract.${currentCondition}`,
            {
                amount,
            }
        );

        return messageByCurrentCondition;
    }, [amount, penaltyMessageConditions, t]);

    return <Alert message={message} type="info" showIcon />;
};
