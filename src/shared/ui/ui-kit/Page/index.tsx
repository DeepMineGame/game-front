import { FC } from 'react';
import { Header } from 'shared';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = {
    headerTitle?: string;
    removeContentPadding?: boolean;
    className?: string;
};

export const Page: FC<Props> = ({
    headerTitle,
    children,
    removeContentPadding,
    className,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            <Header title={headerTitle} />

            <div
                className={cn(styles.content, {
                    [styles.contentWithPaddings]: !removeContentPadding,
                })}
            >
                {children}
            </div>
        </div>
    );
};
