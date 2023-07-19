import { FC } from 'react';
import { Form } from 'antd';
import { useGate } from 'effector-react';
import { ContractType } from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import { ContractTypeField } from '../ContractTypeField';
import { CreateOrderGate } from '../../models';
import { LandLordMineOwner } from './LandLordMineOwner';
import { MineOwnerContractor } from './MineOwnerContractor';
import { LevelUpgrade } from './LevelUpgrade';
import { TypeStepProps } from './interface';

const { useWatch } = Form;

const ContentMap: Record<ContractType, FC<TypeStepProps>> = {
    [ContractType.undefined]: () => null,
    [ContractType.landlord_mineowner]: LandLordMineOwner,
    [ContractType.mineowner_contractor]: MineOwnerContractor,
    [ContractType.level_upgrade]: LevelUpgrade,
};

export const TypeStep: FC<TypeStepProps> = ({
    form,
    accountName,
    goToNextStep,
}) => {
    useGate(CreateOrderGate, { searchParam: accountName });
    const contractType: ContractType =
        useWatch(orderFields.contractType, form) ?? ContractType.undefined;

    const Content = ContentMap[contractType];

    return (
        <>
            <ContractTypeField form={form} />
            <Content
                form={form}
                accountName={accountName}
                goToNextStep={goToNextStep}
            />
        </>
    );
};
