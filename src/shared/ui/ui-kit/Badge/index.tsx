import { Badge as BadgeAnt, BadgeProps } from 'antd';
import { FC, memo } from 'react';
import './styles.module.scss';

export const Badge: FC<BadgeProps> = memo((props) => <BadgeAnt {...props} />);
