import { Button, Modal, Progress, Space } from 'antd';
import { FC, useEffect, useState } from 'react';
import {
    EliteDangerousLoader,
    neutral3Color,
    primary6,
    useReloadPage,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import {
    $somethingInProgressCountDown,
    $thingInProgressName,
    setSomethingCountDownEvent,
} from '../model';
import { ProgressNotification } from '../../action-indicator';
import styles from './styles.module.scss';

export const DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME = 10;
export const SomethingInProgress: FC = () => {
    const { t } = useTranslation();
    const thingInProgressName = useStore($thingInProgressName);
    const somethingCountDown = useStore($somethingInProgressCountDown);
    const reloadPage = useReloadPage();
    const [isModalMinimized, setIsModalMinimized] = useState(false);
    const timeToPercents =
        (Number(somethingCountDown) / DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME) *
        100;

    useEffect(() => {
        if (
            !isModalMinimized &&
            somethingCountDown === 0 &&
            thingInProgressName
        ) {
            setSomethingCountDownEvent(null);
            return reloadPage();
        }
    }, [isModalMinimized, reloadPage, somethingCountDown, thingInProgressName]);
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
                        <div className={styles.timerAndProgress}>
                            <Progress
                                percent={100 - timeToPercents}
                                showInfo={false}
                                strokeColor={primary6}
                                trailColor={neutral3Color}
                            />
                            {somethingCountDown}
                        </div>

                        {t(
                            'Awaiting the blockchain response. Page will be reloaded automatically when finished.'
                        )}
                    </Space>
                </Modal>
            )}
            {thingInProgressName && isModalMinimized && (
                <ProgressNotification
                    className={styles.minifiedProgress}
                    actionName={thingInProgressName}
                    finished={!somethingCountDown}
                    finishText={t('components.actionModal.isComplete')}
                    onHideClick={reloadPage}
                    onOkClick={reloadPage}
                    timeLeft={String(somethingCountDown)}
                    timeToPercentage={timeToPercents}
                />
            )}
        </>
    );
};
