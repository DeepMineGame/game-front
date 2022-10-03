import { FC } from 'react';
import cn from 'classnames';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

type Props = {
    className?: string;
    size?: 'sm' | 'md' | 'xl';
};

const LoadingSpin: FC<Props> = ({ className, size = 'sm' }) => {
    return (
        <Loading3QuartersOutlined
            className={cn(styles.loader, styles[size], className)}
            spin
        />
    );
};

export { LoadingSpin };
