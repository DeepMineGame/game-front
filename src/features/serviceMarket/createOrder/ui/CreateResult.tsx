import React, { FC } from 'react';
import { Button, Result } from 'shared';
import { useTranslation } from 'react-i18next';
import { ResultProps } from 'antd';
import styles from '../styles.module.scss';

type Props = {
    icon?: React.ReactElement;
    title?: string;
    subTitle?: string;
    status?: ResultProps['status'];
    button?: {
        text?: string;
        callback: () => void;
    };
};
export const CreateResult: FC<Props> = (props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.backPlate}>
            <div className={styles.backPlateInner}>
                <Result
                    icon={props.icon}
                    status={props.status}
                    title={
                        props.title ||
                        t('pages.serviceMarket.createOrder.orderCreated')
                    }
                    subTitle={props.subTitle}
                    extra={[
                        <Button
                            key="toMarket"
                            type="primary"
                            onClick={props.button?.callback}
                        >
                            {props.button?.text ||
                                t(
                                    'pages.serviceMarket.createOrder.goToServiceMarket'
                                )}
                        </Button>,
                    ]}
                />
            </div>
        </div>
    );
};
