import { FC, useMemo } from 'react';
import { serviceMarket } from 'app/router/paths';
import { t } from 'i18next';
import { ContractState } from 'features';
import {
    ContractDto,
    contractName,
    getContractStatus,
} from 'entities/smartcontract';
import { getUserRoleInContract } from 'shared/lib/utils';
import { Link, Table, Tag } from '../../ui-kit';
import { toLocaleDate } from '../../utils';

type Props = { contracts: ContractDto[]; account: string };

export const ContractsTable: FC<Props> = ({ contracts, account }) => {
    const dataSource = useMemo(
        () =>
            contracts.map((contract) => {
                const partnerNickname =
                    contract.client === account
                        ? contract.executor
                        : contract.client;
                const role = !partnerNickname
                    ? null
                    : getUserRoleInContract(contract, partnerNickname);
                const contractStatus = getContractStatus(contract, account);

                return {
                    nickName: (
                        <>
                            <Link
                                to={`${serviceMarket}/contract/${contract.id}`}
                            >
                                {partnerNickname || '-'}
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
                    status: <ContractState contractStatus={contractStatus} />,
                };
            }),
        [account, contracts]
    );

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
                    sorter: (a, b) => a.reputation - b.reputation,
                },
                {
                    title: 'Contract type',
                    dataIndex: 'type',
                    key: 'type',
                    sorter: (a, b) => a.type.length - b.type.length,
                },
                {
                    title: 'Completion date',
                    dataIndex: 'date',
                    key: 'date',
                    sorter: (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                },
                {
                    title: 'Penalty, DME',
                    dataIndex: 'penalty',
                    key: 'penalty',
                    sorter: (a, b) => a.penalty - b.penalty,
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    sorter: (a, b) =>
                        a.status.props.contractStatus.value.length -
                        b.status.props.contractStatus.value.length,
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'], pageSize: 5 }}
        />
    );
};
