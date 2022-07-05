import React, { FC } from 'react';
import { ResultProps, Result as ResultA } from 'antd';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = ResultProps;

export const Result: FC<Props> = (props) => {
    return (
        <ResultA
            {...props}
            className={cn(props.className, styles.result)}
            title={<div className={styles.title}>{props.title}</div>}
            subTitle={<div className={styles.subTitle}>{props.subTitle}</div>}
            status={props?.status || 'success'}
        />
    );
};
