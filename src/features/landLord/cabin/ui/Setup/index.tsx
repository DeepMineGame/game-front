import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Button } from 'shared';
import { areaManagement } from 'app/router/paths';
import { useNavigate } from 'react-router';
import commonStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    className?: string;
}

export const Setup: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={className}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.setupTitle')}
            </div>
            <div className={cn(commonStyles.description, styles.description)}>
                {t('pages.landLord.cabin.setupDescription')}
            </div>
            <div className={styles.actionButton}>
                <Button type="primary" onClick={() => navigate(areaManagement)}>
                    {t('pages.areaManagement.title')}
                </Button>
            </div>
        </div>
    );
};
