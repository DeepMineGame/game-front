import { Tooltip } from 'antd';
import styles from './styles.module.scss';

export const Chair = () => {
    return (
        <Tooltip
            className={styles.tooltip}
            overlay="YYour training room is located here"
        >
            <div className={styles.chair} />
        </Tooltip>
    );
};
