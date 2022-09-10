import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui';
import { State } from '../state';

const UpgradeCompleted: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.upgradeCompleted')}
            content="Delaminator" // todo: dynamic
            bottom={
                <Button type="primary" ghost>
                    {t('pages.engineer.getReport')}
                </Button>
            }
        />
    );
};

export { UpgradeCompleted };
