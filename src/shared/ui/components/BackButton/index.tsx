import {ArrowLeftIcon} from "shared/ui/icons";
import cn from "classnames";
import styles from './index.module.scss'
export function BackButton() {
    return <div className={cn(styles.button)}>
        <ArrowLeftIcon />
        <div>Back</div>
    </div>
}