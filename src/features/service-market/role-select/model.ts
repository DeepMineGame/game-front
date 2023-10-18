import { createEvent, createStore } from 'effector';

export const enum RadioButtonContractTypeNames {
    'All contracts',
    'My contracts',
    'Contract offers',
}

export const changeContractTypeRadioButtonEvent =
    createEvent<RadioButtonContractTypeNames>(
        'changeContractTypeRadioButtonEvent'
    );

export const activeRadioButton$ = createStore(
    RadioButtonContractTypeNames['All contracts']
).on(changeContractTypeRadioButtonEvent, (state, payload) => payload);
