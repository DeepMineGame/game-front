import { FC } from 'react';
import { ResultProps, Result as ResultAnt } from 'antd';
import styles from './styles.module.scss';

export const Result: FC<ResultProps> = (props) => (
    <ResultAnt
        {...props}
        title={<div className={styles.title}>{props.title}</div>}
        subTitle={<div className={styles.subTitle}>{props.subTitle}</div>}
        status={props?.status || 'success'}
    />
);
