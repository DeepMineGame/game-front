import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

export enum LoaderSize {
    small = 16,
    semiSmall = 24,
    default = 32,
    large = 64,
}

type Props = {
    size?: 'small' | 'semiSmall' | 'default' | 'large';
    centered?: boolean;
    className?: string;
};

export const Loader: FC<Props> = ({
    size = 'default',
    centered,
    className,
}) => {
    const antIcon = (
        <LoadingOutlined style={{ fontSize: LoaderSize[size] }} spin />
    );

    return (
        <Spin
            className={classNames(styles.loader, className, {
                [styles.centered]: centered,
            })}
            indicator={antIcon}
        />
    );
};
