import React, { FC, useMemo } from 'react';
import { Area, AreaConfig } from '@ant-design/plots';
import { neutral8, neutral2, neutral4, primary6 } from 'shared/ui/variables';
import { mergeDeep } from 'shared/ui/utils';

type BaseConfig = Omit<AreaConfig, 'data' | 'xField' | 'yField'>;
type Props = BaseConfig & Pick<AreaConfig, 'data' | 'xField' | 'yField'>;

const defaultConfig: BaseConfig = {
    autoFit: true,
    height: 335,
    padding: [10, 5, 35, 30],
    xAxis: {
        label: { offsetY: 8, style: { fill: neutral8 } },
        tickLine: {
            length: 8,
            style: {
                stroke: neutral4,
            },
        },
        line: {
            style: {
                stroke: neutral4,
            },
        },
    },
    yAxis: {
        max: 8,
        tickCount: 10,
        grid: {
            line: {
                style: { stroke: neutral4 },
            },
        },
    },
    areaStyle: {
        fill: primary6,
        fillOpacity: 0.25,
    },
    line: {
        color: primary6,
    },
    point: {
        size: 0,
    },
    tooltip: {
        showCrosshairs: false,
        marker: {
            fill: neutral2,
            stroke: primary6,
            lineWidth: 2,
            r: 5,
        },
        domStyles: {
            'g2-tooltip': {
                background: neutral4,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
                color: neutral8,
                opacity: 1,
                padding: '4px 12px',
            },
            'g2-tooltip-marker': {
                borderRadius: 0,
            },
        },
    },
    theme: {
        defaultColor: primary6,
        styleSheet: {
            fontFamily: '"Bai Jamjuree", sans-serif',
        },
    },
};

export const AreaChart: FC<{ options: Props }> = ({ options }) => {
    const config = useMemo(() => mergeDeep(defaultConfig, options), [options]);

    return <Area {...config} />;
};
