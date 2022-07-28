import React, { FC } from 'react';
import { serviceMarket } from 'app/router/paths';
import { t } from 'i18next';
import { ContractDto, contractName, statusMap } from 'entities/smartcontract';
import { getUserRoleInContract } from 'shared/lib/utils';
import { Link, Table, Tag } from '../../ui-kit';
import { toLocaleDate } from '../../utils';

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
                const role = getUserRoleInContract(contract, account);

                return {
                    nickName: (
                        <>
                            <Link
                                to={`${serviceMarket}/contract/${contract.id}`}
                            >
                                {contract.executor || contract.client}
                            </Link>
                            {role && (
                                <Tag kind="secondary">
                                    {t(
                                        `roles.${
                                            role === 'mineOwnerContractor' ||
                                            role === 'mineOwnerLandlord'
                                                ? 'mineOwner'
                                                : role
                                        }`
                                    )}
                                </Tag>
                            )}
                        </>
                    ),
                    key: contract.id,
                    reputation: '-',
                    type: contractName[contract.type],
                    date:
                        contract.finishes_at === 0
                            ? '-'
                            : toLocaleDate(contract.finishes_at * 1000),
                    penalty: contract.penalty_amount,
                    status: statusMap[contract.status],
                };
            })}
            pagination={{ position: ['bottomCenter'], pageSize: 5 }}
        />
    );
};
