import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'shared';

type Props = {
    amount: number;
    isCurrentUserDemandPenalty: boolean;
    isCurrentUserDoesntDemandPenalty: boolean;
    isSomebodyDemandPenalty: boolean;
    isSomebodyDoesntDemandPenalty: boolean;
};

export const PenaltyMessage: FC<Props> = ({
    amount,
    isCurrentUserDemandPenalty,
    isCurrentUserDoesntDemandPenalty,
    isSomebodyDemandPenalty,
    isSomebodyDoesntDemandPenalty,
}) => {
    const { t } = useTranslation();

    const message =
        (isCurrentUserDemandPenalty &&
            t('pages.serviceMarket.contract.isCurrentUserDemandPenalty', {
                amount,
            })) ||
        (isCurrentUserDoesntDemandPenalty &&
            t(
                'pages.serviceMarket.contract.isCurrentUserDoesntDemandPenalty'
            )) ||
        (isSomebodyDemandPenalty &&
            t('pages.serviceMarket.contract.isSomebodyDemandPenalty', {
                amount,
            })) ||
        (isSomebodyDoesntDemandPenalty &&
            t('pages.serviceMarket.contract.isSomebodyDoesntDemandPenalty'));

    return <Alert message={message} type="info" showIcon />;
};
