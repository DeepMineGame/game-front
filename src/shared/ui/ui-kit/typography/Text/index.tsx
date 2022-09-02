import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { Typography, ConfigProvider } from 'antd';
import { BaseType } from 'antd/lib/typography/Base';
import { TextProps } from 'antd/es/typography/Text';
import styles from '../styles.module.scss';

type Props = Omit<TextProps, 'type'> &
    React.RefAttributes<HTMLHeadingElement> & {
        fontFamily?: 'bai' | 'orbitron';
        type?: BaseType | 'primary' | 'white';
    };

export const Text: FC<Props> = ({ className, type, ...props }) => {
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixCls = getPrefixCls('typography');

    return (
        <Typography.Text
            className={classNames(className, {
                [styles.fontFamilyBai]: props.fontFamily === 'bai',
                [styles.fontFamilyOrbitron]: props.fontFamily === 'orbitron',
                [`${prefixCls}-${type}`]: type,
            })}
            {...props}
        >
            {props.children}
        </Typography.Text>
    );
};
