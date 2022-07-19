import React, { FC } from 'react';
import { serviceMarket } from 'app/router/paths';
import { t } from 'i18next';
import {
    ContractDto,
    contractName,
    ContractType,
    statusMap,
} from 'entities/smartcontract';
import { Link, Table, Tag } from '../../ui-kit';
import { toLocaleDate } from '../../utils';

const getRole = (contract: ContractDto, account: string): string | null => {
    enum Role {
        contractor = 'contractor',
        mineOwner = 'mineOwner',
        landlord = 'landlord',
    }

    let role: Role | null = null;

    if (contract.type === ContractType.landlord_mineowner) {
        if (contract.client === account) role = Role.landlord;
        else if (contract.executor === account) role = Role.mineOwner;
    } else if (contract.type === ContractType.mineowner_contractor) {
        if (contract.client === account) role = Role.mineOwner;
        else if (contract.executor === account) role = Role.contractor;
    }

    return role;
};

type Props = { contracts: ContractDto[]; account: string };

export const ContractsTable: FC<Props> = ({ contracts, account }) => {
    return (
        <Table
            columns={[
                {
                    title: 'Nickname',
                    dataIndex: 'nickName',
                    key: 'nickName',
                },
                {
                    title: 'Reputation',
                    dataIndex: 'reputation',
                    key: 'reputation',
                },
                {
                    title: 'Contract type',
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: 'Completion date',
                    dataIndex: 'date',
                    key: 'date',
                },
                {
                    title: 'Penalty, DME',
                    dataIndex: 'penalty',
                    key: 'penalty',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                },
            ]}
            dataSource={contracts.map((contract) => {
                const role = getRole(contract, account);

                return {
                    nickName: (
                        <>
                            <Link
                                to={`${serviceMarket}/contract/${contract.id}`}
                            >
                                {contract.executor || contract.client}
                            </Link>
                            {role && (
                                <Tag kind="secondary">{t(`roles.${role}`)}</Tag>
                            )}
                        </>
                    ),
                    key: contract.id,
                    reputation: '-',
                    type: contractName[contract.type],
                    date: toLocaleDate(contract.finishes_at * 1000),
                    penalty: contract.penalty_amount,
                    status: statusMap[contract.status],
                };
            })}
        />
    );
};
