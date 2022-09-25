import { Tooltip } from 'antd';
import { engineersTraining } from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const Chair = () => {
    const { t } = useTranslation();

    return (
        <Link to={engineersTraining}>
            <Tooltip
                className={styles.tooltip}
                overlay={t('pages.engineer.trainingTooltip')}
            >
                <div className={styles.chair} />
            </Tooltip>
        </Link>
    );
};
