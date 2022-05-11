import React from 'react';

export const StatusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="10" height="10" viewBox="0 0 10 10" {...props}>
        <circle cx="5" cy="5" r="4.5" stroke="#fff" strokeWidth=".5" />
        <circle cx="5" cy="5" r="3.3" fill="#fff" />
    </svg>
);
