import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Space, Alert } from 'antd';
import { serviceMarket } from 'app/router/paths';
import { EngineerStateBadge } from 'features/engineer';
import { CabinState, CabinStatus } from 'entities/engineer';
import { ContractDto } from 'entities/smartcontract';
import { Button, LoadingSpin, Text, Title } from 'shared/ui/ui-kit';
import { CountDown } from 'shared/ui';
import { useReloadPage } from 'shared/lib/hooks';
import { EngineerSettings } from '../settings';
import styles from './styles.module.scss';

type Props = {
    state: CabinState;
    status: CabinStatus;
    contract?: ContractDto;
};

const StatusInfo: FC<Props> = ({ state, status, contract }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const reloadPage = useReloadPage();

    return (
        <div className={styles.statusInfo}>
            {status === CabinStatus.UpgradeInProgress && (
                <Text
                    type="primary"
                    fontFamily="orbitron"
                    className={styles.statusTitle}
                >
                    {t('pages.engineer.equipmentHall.upgradeInProgress')}{' '}
                    <CountDown
                        onFinish={reloadPage}
                        finishesAt={contract?.finishes_at}
                    />
                </Text>
            )}

            {status === CabinStatus.UpgradeCompleted && (
                <Text
                    type="white"
                    fontFamily="orbitron"
                    className={styles.statusTitle}
                >
                    {t('pages.engineer.upgradeHasFinished')}
                </Text>
            )}

            <Space className={styles.line}>
                <Space
                    direction="vertical"
                    size={status === CabinStatus.NeedCitizen ? 16 : 0}
                >
                    <Space align="center" size={40}>
                        <Title
                            className={styles.title}
                            fontFamily="orbitron"
                            level={3}
                        >
                            {t('components.common.myStatus')}
                        </Title>
                        <EngineerStateBadge state={state} />
                    </Space>

                    {status === CabinStatus.NeedCitizen && (
                        <Alert
                            banner
                            icon={<LoadingSpin />}
                            message={t(
                                'pages.engineer.equipmentHall.lookingCitizen'
                            )}
                        />
                    )}

                    {!contract && (
                        <Space direction="vertical" size={12}>
                            <Text>
                                {t(
                                    'pages.engineer.upgradesPossibleAfterOrderCreated'
                                )}
                            </Text>
                            <Button
                                size="small"
                                type="primary"
                                onClick={() => navigate(serviceMarket)}
                            >
                                {t('pages.engineer.visitServiceMarket')}
                            </Button>
                        </Space>
                    )}
                </Space>

                <EngineerSettings
                    disabled={
                        state === CabinState.Work ||
                        status === CabinStatus.UpgradeCompleted ||
                        status < CabinStatus.NeedContract
                    }
                />
            </Space>
        </div>
    );
};

export { StatusInfo };
