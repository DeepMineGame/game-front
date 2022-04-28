import React, { FC } from 'react';
import classNames from 'classnames';
import { Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import styles from '../styles.module.scss';

type Props = TextProps &
    React.RefAttributes<HTMLHeadingElement> & {
        fontFamily?: 'bai' | 'orbitron';
    };

export const Text: FC<Props> = ({ className, ...props }) => {
    return (
        <Typography.Text
            className={classNames(className, {
                [styles.fontFamilyBai]: props.fontFamily === 'bai',
                [styles.fontFamilyOrbitron]: props.fontFamily === 'orbitron',
            })}
            {...props}
        >
            {props.children}
        </Typography.Text>
    );
};
