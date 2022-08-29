import { Select as SelectA, SelectProps } from 'antd';
import { FC } from 'react';
import styles from './styles.module.scss';

export const Select: FC<SelectProps> = ({ bordered = true, ...props }) => {
    return (
        <div className={bordered ? styles.select : styles.selectBorderless}>
            <SelectA
                dropdownClassName={styles.dropDownSelect}
                bordered={bordered}
                {...props}
            />
        </div>
    );
};
