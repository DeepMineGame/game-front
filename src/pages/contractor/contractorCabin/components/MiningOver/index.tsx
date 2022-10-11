import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { mining } from 'app/router/paths';
import { useEvent } from 'effector-react';
import { setContractorStatusEvent } from 'features/contractor';
import contractorStyles from '../../styles.module.scss';
import { CABIN_STATUS } from '../../constants';
import styles from './styles.module.scss';

export const MiningOver: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const setContractorStatus = useEvent(setContractorStatusEvent);

    useEffect(() => {
        setContractorStatus(CABIN_STATUS.mining_over);
    }, [setContractorStatus]);

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                <CheckOutlined style={{ color: '#47FF40' }} />
                <div>{t('pages.contractor.miningOver.title')}</div>
            </div>
            <div
                className={cn(contractorStyles.description, styles.description)}
            >
                {t('pages.contractor.miningOver.description')}
            </div>
            <div className={styles.center}>
                <Button onClick={() => navigate(mining)}>
                    {t('components.common.button.miningDeck')}
                </Button>
            </div>
        </div>
    );
};
