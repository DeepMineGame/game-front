import classNames from "classnames";
import styles from './index.module.scss'
import {ReactNode} from "react";

export function MainActionButton({children, onClick}: {children: ReactNode, onClick: () => void}) {
    return <div className={classNames(styles.button)} onClick={onClick}><span className={styles.text}>{children}</span></div>
}