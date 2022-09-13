import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
    src: string;
    alt?: string;
};

const FullScreenBackground: FC<Props> = ({ src, alt }) => {
    return <img className={styles.root} src={src} alt={alt || 'background'} />;
};

export { FullScreenBackground };
