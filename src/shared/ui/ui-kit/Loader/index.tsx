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
    size?: LoaderSize;
};

export const Loader: FC<Props> = ({ size = LoaderSize.default }) => {
    const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

    return <Spin className={styles.loader} indicator={antIcon} />;
};
