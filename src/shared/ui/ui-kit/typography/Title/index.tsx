import { FC, memo } from 'react';
import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = TitleProps & React.RefAttributes<HTMLHeadingElement>;

export const Title: FC<Props> = memo(({ className, ...props }) => (
    <Typography.Title className={cn(className, styles.root)} {...props}>
        {props.children}
    </Typography.Title>
));
