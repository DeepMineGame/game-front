import { FC } from 'react';
import { DropdownProps, Dropdown as DropdownAnt, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import styles from './styles.module.scss';

type Props = {
    items?: ItemType[];
    overlay?: DropdownProps['overlay'];
} & Omit<DropdownProps, 'overlay'>;

function enrichItemsWithDefaultCssSelector(items: ItemType[]): ItemType[] {
    return items.map(
        (item) =>
            ({
                ...item,
                className: styles.dropdownItem,
            } as ItemType)
    );
}

export const Dropdown: FC<Props> = ({ children, items = [], ...props }) => {
    const menu = (
        <Menu
            items={enrichItemsWithDefaultCssSelector(items)}
            className={styles.dropdown}
        />
    );
    return (
        <DropdownAnt {...props} overlay={props?.overlay || menu}>
            {children}
        </DropdownAnt>
    );
};
