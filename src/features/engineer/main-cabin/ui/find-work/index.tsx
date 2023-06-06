import { FC } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createOrder, serviceMarket } from 'app/router/paths';
import { Roles } from 'entities/game-stat';
import { Button } from 'shared/ui/ui-kit';
import { tablet, useMediaQuery } from 'shared/lib/hooks';
import { State } from '../state';

const FindWork: FC = () => {
    const { t } = useTranslation();
    const isTablet = useMediaQuery(tablet);
    const navigate = useNavigate();

    return (
        <State
            title={t('pages.engineer.FindWorkToDo')}
            content={t(
                'pages.engineer.youNeedAnActiveEquipmentUpgradeContract'
            )}
            bottom={
                <Space
                    size={isTablet ? 20 : 12}
                    direction={isTablet ? 'horizontal' : 'vertical'}
                >
                    <Button
                        type="primary"
                        ghost
                        size={isTablet ? 'middle' : 'small'}
                        onClick={() => navigate(createOrder)}
                    >
                        {t('components.common.createContract')}
                    </Button>
                    <Button
                        type="primary"
                        ghost
                        size={isTablet ? 'middle' : 'small'}
                        onClick={() =>
                            navigate(
                                `${serviceMarket}?user_role=${Roles.engineer}`
                            )
                        }
                    >
                        {t('Find a contract')}
                    </Button>
                </Space>
            }
        />
    );
};

export { FindWork };
