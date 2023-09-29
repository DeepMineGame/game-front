import { Button, Modal, Space } from 'antd';
import { FC, useState } from 'react';
import { EliteDangerousLoader, useReloadPage } from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { $somethingInProgressCountDown, $thingInProgressName } from '../model';
import { ProgressNotification } from '../../action-indicator';
import styles from './styles.module.scss';

export const SomethingInProgress: FC = () => {
    const { t } = useTranslation();
    const thingInProgressName = useStore($thingInProgressName);
    const somethingCountDown = useStore($somethingInProgressCountDown);
    const reloadPage = useReloadPage();
    const [isModalMinimized, setIsModalMinimized] = useState(false);

    return (
        <>
            {!isModalMinimized && (
                <Modal
                    title={thingInProgressName}
                    open={Boolean(somethingCountDown)}
                    footer={
                        <Button
                            onClick={() => {
                                setIsModalMinimized(true);
                            }}
                        >
                            {t('Minimize')}
                        </Button>
                    }
                >
                    <Space direction="vertical" size="large">
                        <EliteDangerousLoader size="big" />
                        {t(
                            'We are waiting to receive a response from the blockchain. Please refresh the page after the loading is complete.'
                        )}
                    </Space>
                </Modal>
            )}
            {thingInProgressName && isModalMinimized && (
                <ProgressNotification
                    className={styles.minifiedProgress}
                    actionName={thingInProgressName}
                    finished={somethingCountDown === 0}
                    finishText={t('components.actionModal.isComplete')}
                    onHideClick={reloadPage}
                    onOkClick={reloadPage}
                    timeLeft={String(somethingCountDown)}
                    timeToPercentage={(somethingCountDown / 30) * 100}
                />
            )}
        </>
    );
};
