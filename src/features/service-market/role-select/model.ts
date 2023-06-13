import { createEvent, createStore, forward } from 'effector';

export const enum RadioButtonContractTypeNames {
    'All contracts',
    'My contracts',
    'Contract offerings',
}

export const changeContractTypeRadioButtonEvent =
    createEvent<RadioButtonContractTypeNames>(
        'changeContractTypeRadioButtonEvent'
    );

export const activeRadioButton$ = createStore(
    RadioButtonContractTypeNames['All contracts']
).on(changeContractTypeRadioButtonEvent, (state, payload) => payload);
