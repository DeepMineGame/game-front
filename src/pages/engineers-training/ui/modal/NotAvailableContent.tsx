import { useTranslation } from 'react-i18next';
import { TrainingNftFull } from '../../model/types';
import { MainInformation } from './shared';

type Props = {
    nftData: TrainingNftFull;
};

export const NotAvailableContent: React.FC<Props> = ({ nftData }) => {
    const { t } = useTranslation();

    return (
        <MainInformation
            nftData={nftData}
            subtitle={t('pages.engineersTraining.willBeAvailableToLearn', {
                level: nftData.level,
            })}
        />
    );
};
