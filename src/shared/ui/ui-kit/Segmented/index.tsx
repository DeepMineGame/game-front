import React, { FC, Ref } from 'react';
import { Segmented as SegmentedAnt, SegmentedProps } from 'antd';

import style from './styles.module.scss';

type Props = SegmentedProps & { ref?: Ref<HTMLDivElement> | undefined };

export const Segmented: FC<Props> = (props) => {
    return <SegmentedAnt className={style.segment} {...props} />;
};
