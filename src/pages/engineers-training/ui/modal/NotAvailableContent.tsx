import { useTranslation } from 'react-i18next';
import { TrainingNft, TrainingNftMeta } from '../../model/types';
import { MainInformation } from './shared';

type Props = {
    nftData: TrainingNft & TrainingNftMeta;
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
