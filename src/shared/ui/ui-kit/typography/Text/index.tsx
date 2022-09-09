import { FC, memo } from 'react';
import { Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import { BaseType } from 'antd/lib/typography/Base';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = Omit<TextProps, 'type'> &
    React.RefAttributes<HTMLHeadingElement> & { type?: BaseType } & {
        variant?: 'body1';
    };

export const Text: FC<Props> = memo(({ variant, ...props }) => (
    <Typography.Text
        className={cn({
            [styles.body1]: variant === 'body1',
        })}
        {...props}
    >
        {props.children}
    </Typography.Text>
));
