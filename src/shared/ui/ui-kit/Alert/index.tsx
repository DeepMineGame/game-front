import { FC, memo } from 'react';
import cn from 'classnames';
import { Alert as AlertAnt, AlertProps } from 'antd';
import styles from './styles.module.scss';

type Direction = 'horizontal' | 'vertical';

type Props = AlertProps & {
    direction?: Direction;
};

export const Alert: FC<Props> = memo(
    ({ className, direction = 'vertical', ...props }) => (
        <AlertAnt
            className={cn(
                { [styles.vertical]: direction === 'vertical' },
                styles.alert,
                className
            )}
            {...props}
        />
    )
);
