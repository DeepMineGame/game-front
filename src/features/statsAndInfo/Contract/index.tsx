import React, { FC } from 'react';

import { KeyValueTable, Title } from 'shared';
import { useTranslation } from 'react-i18next';
import { ContractDto } from 'entities/smartcontract';

type Props = {
    contract: ContractDto;
};
export const Contract: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();

    return (
        <>
            <div>
                <Title level={5} fontFamily="orbitron">
                    {t('components.common.statsAndInfo.contractInfo')}
                </Title>
            </div>
            <KeyValueTable
                items={{
                    Area: contract.client_asset_id,
                    Landlord: contract.client,
                    Fee: contract.fee,
                }}
            />
        </>
    );
};
