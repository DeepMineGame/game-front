import { ReactNode } from 'react';
import cn from 'classnames';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import styles from './index.module.scss';

export const StubPageMessage = ({
    title,
    message,
    className,
}: {
    title: ReactNode;
    message: ReactNode;
    className?: string;
}) => (
    <div className={cn(styles.message, className)}>
        <Title
            type="secondary"
            level={4}
            fontFamily="orbitron"
            className={styles.title}
        >
            {title}
        </Title>
        <Text type="secondary">{message}</Text>
    </div>
);
