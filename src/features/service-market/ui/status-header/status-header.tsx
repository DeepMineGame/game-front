import React from 'react';
import { PageHeader, PageHeaderProps, Tag } from 'antd';
import {
    ContractDto,
    OrderState,
    OrderSubState,
    stateMap,
} from 'entities/smartcontract';

const stateColorMap = {
    [OrderState.undefined]: 'initial',
    [OrderState.OpenOrder]: '#F5C913', // primary6
    [OrderState.Terminated]: '#5A5A5A', // netural6,
    [OrderState.ValidContract]: '#5A5A5A', // netural6,
    [OrderState.Completed]: '#47FF40', // green6,
    [OrderState.WaitingForAction]: '#F5C913', // primary6,
};

export const orderSubStateMap = {
    [OrderSubState.undefined]: '',
    [OrderSubState.Unsigned]: 'Unsigned',
    [OrderSubState.Active]: 'Active',
    [OrderSubState.ViolateTerms]: 'Violate terms',
    [OrderSubState.PrematureTerminated]: 'Premature terminate',
    [OrderSubState.Terminated]: 'Terminated',
    [OrderSubState.TerminatedWithPenalty]: 'Terminate with penalty',
    [OrderSubState.TerminatedWithoutPenalty]: 'Terminate without penalty',
    [OrderSubState.Completed]: 'Completed',
    [OrderSubState.CompletedWithoutPenalty]: 'Completed without penalty',
    [OrderSubState.CompletedWithPenalty]: 'Completed with penalty',
    [OrderSubState.Closed]: 'Closed',
};
export const StatusHeader = ({
    contract,
    ...props
}: {
    contract: ContractDto;
} & PageHeaderProps) => {
    const stateColor =
        stateColorMap[contract.computed?.status || OrderState.undefined];
    const isSubStateEqualStateText =
        orderSubStateMap[
            contract.computed?.sub_status || OrderSubState.undefined
        ] === stateMap[contract.computed?.status || OrderState.undefined];
    const tag =
        contract.computed?.sub_status && !isSubStateEqualStateText ? (
            <Tag>{orderSubStateMap[contract.computed?.sub_status]}</Tag>
        ) : undefined;

    return (
        <PageHeader
            style={{
                marginBottom: '20px',
                border: `2px solid ${stateColor}`,
            }}
            ghost={false}
            tags={tag}
            title={
                <span
                    style={{
                        color: stateColor,
                    }}
                >
                    {
                        stateMap[
                            contract.computed?.status || OrderState.undefined
                        ]
                    }
                </span>
            }
            {...props}
        />
    );
};
