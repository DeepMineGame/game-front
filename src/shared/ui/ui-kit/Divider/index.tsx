import { Divider as DividerAnt, DividerProps } from 'antd';
import cn from 'classnames';
import styles from './index.module.scss';

export enum Margin {
    small = 'small',
}

type Props = { verticalMargin?: Margin } & DividerProps;

export const Divider = ({ verticalMargin, ...props }: Props) => (
    <DividerAnt
        className={cn({
            [styles.verticalMarginSmall]: verticalMargin === Margin.small,
        })}
        {...props}
    />
);
