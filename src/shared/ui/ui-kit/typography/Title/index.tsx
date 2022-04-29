import React, { FC } from 'react';
import classNames from 'classnames';
import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
import styles from '../styles.module.scss';

type Props = TitleProps &
    React.RefAttributes<HTMLHeadingElement> & {
        fontFamily: 'bai' | 'orbitron';
    };

export const Title: FC<Props> = ({ className, ...props }) => {
    return (
        <Typography.Title
            className={classNames(className, {
                [styles.fontFamilyBai]: props.fontFamily === 'bai',
                [styles.fontFamilyOrbitron]: props.fontFamily === 'orbitron',
            })}
            {...props}
        >
            {props.children}
        </Typography.Title>
    );
};
