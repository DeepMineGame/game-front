import { FC } from 'react';
import styles from './styles.module.scss';

const Monitor: FC = ({ children }) => {
    return <div className={styles.root}>{children}</div>;
};

export { Monitor };
