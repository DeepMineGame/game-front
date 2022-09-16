import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { ATOMICHUB_URL } from 'app/constants';
import { warehouse } from 'app/router/paths';
import { tablet, useMediaQuery } from 'shared/lib/hooks';
import { Button } from 'shared/ui';
import { State } from '../state';

export const NoCertificate: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isTablet = useMediaQuery(tablet);

    return (
        <State
            title={t('pages.engineer.noCertificateDetected')}
            content={isTablet ? t('pages.engineer.youNeedCertificate') : ''}
            bottom={
                <Space size={20}>
                    <Button
                        type="primary"
                        ghost
                        size={isTablet ? 'middle' : 'small'}
                        onClick={() => navigate(warehouse)}
                    >
                        {t(
                            isTablet
                                ? 'pages.engineer.pickFromStorage'
                                : 'components.common.storage'
                        )}
                    </Button>
                    <Button
                        type="primary"
                        ghost
                        size={isTablet ? 'middle' : 'small'}
                        onClick={() => window.open(ATOMICHUB_URL, '_blank')}
                    >
                        {t(
                            isTablet
                                ? 'components.common.goToMarket'
                                : 'components.common.market'
                        )}
                    </Button>
                </Space>
            }
        />
    );
};
