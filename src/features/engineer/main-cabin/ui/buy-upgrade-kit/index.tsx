import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { State } from '../state';

const BuyUpgradeKit: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.buyAnUpgradeKit')}
            content={t('pages.engineer.youNeedAnUpgradeKit')}
        />
    );
};

export { BuyUpgradeKit };
