import {
    attach,
    createEffect,
    createEvent,
    createStore,
    forward,
} from 'effector';
import { userStore as $user } from 'entities/user';
import { ContractDto } from 'entities/smartcontract';
import { getContracts, GetContractsParams } from './api';

export enum Tab {
    Contactor,
    Mineowner,
    Landlord,
    Engineer,
}

export const getContractsEffect = createEffect(getContracts);

export const changeFilterEvent = createEvent<Record<Tab, GetContractsParams>>();

export const changeTabEvent = createEvent<Tab>();

export const $contracts = createStore<ContractDto[]>([]).on(
    getContractsEffect.doneData,
    (_, contracts) => contracts
);

export const $filters = createStore<Record<Tab, GetContractsParams>>({
    [Tab.Contactor]: { searchRole: 'mineowner' },
    [Tab.Mineowner]: { searchRole: 'contractor' },
    [Tab.Landlord]: { searchRole: 'mineowner' },
    [Tab.Engineer]: { searchRole: 'contractor' },
}).on(changeFilterEvent, (_, filter) => filter);

export const $tab = createStore(Tab.Contactor).on(
    changeTabEvent,
    (_, tab) => tab
);

forward({
    from: changeFilterEvent,
    to: attach({
        effect: getContractsEffect,
        source: [$user, $tab],
        mapParams: (params, [user, tab]) => ({
            ...params[tab!],
            user: user?.wax_address!,
        }),
    }),
});
