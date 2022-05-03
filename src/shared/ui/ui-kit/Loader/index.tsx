import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { FC } from 'react';
import styles from './styles.module.scss';

export enum LoaderSize {
    small = 16,
    default = 32,
    large = 64,
}

type Props = {
    size?: 'small' | 'default' | 'large';
};

export const Loader: FC<Props> = ({ size = 'default' }) => {
    const antIcon = (
        <LoadingOutlined style={{ fontSize: LoaderSize[size] }} spin />
    );

    return <Spin className={styles.loader} indicator={antIcon} />;
};
