import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const Chair = () => {
    const { t } = useTranslation();

    return (
        <Tooltip
            className={styles.tooltip}
            overlay={t('pages.engineer.trainingTooltip')}
        >
            <div className={styles.chair} />
        </Tooltip>
    );
};
