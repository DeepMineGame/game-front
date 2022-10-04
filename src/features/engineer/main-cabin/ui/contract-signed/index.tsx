import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { State } from '../state';

const ContractSigned: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.contractIsSigned')}
            content={t('pages.engineer.goToEquipmentHallToMakeUpgrade')}
        />
    );
};

export { ContractSigned };
