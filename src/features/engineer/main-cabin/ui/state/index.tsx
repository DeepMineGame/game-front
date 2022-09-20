import { FC } from 'react';
import { Title } from 'shared/ui';
import styles from './styles.module.scss';

type Props = {
    title: string;
    content?: React.ReactNode;
    bottom?: React.ReactNode;
};

const State: FC<Props> = ({ title, content, bottom }) => {
    return (
        <div className={styles.state}>
            <Title fontFamily="orbitron" level={3} className={styles.title}>
                {title}
            </Title>
            {content && <div className={styles.content}>{content}</div>}
            {bottom && <div className={styles.bottom}>{bottom}</div>}
        </div>
    );
};

export { State };
