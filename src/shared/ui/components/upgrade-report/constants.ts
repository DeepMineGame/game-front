import { AlertTextMap } from './types';

const engineerOwnAlerts: AlertTextMap = {
    success: ['Equipment', 'wasDeliveredToClientsWarehouse'],
    failed: ['Equipment', 'wasNotDamagedClients'],
    failed_with_broke: ['Equipment', 'wasBroken'],
};

const engineerClientAlerts: AlertTextMap = {
    success: [
        'reportRequestedByClient',
        'Equipment',
        'wasDeliveredToClientsWarehouse',
    ],
    failed: ['reportRequestedByClient', 'Equipment', 'wasNotDamagedClients'],
    failed_with_broke: ['reportRequestedByClient', 'Equipment', 'wasBroken'],
};

const citizenOwnAlerts: AlertTextMap = {
    success: ['Equipment', 'wasDeliveredToYourWarehouse'],
    failed: ['Equipment', 'wasNotDamagedYour'],
    failed_with_broke: ['Equipment', 'wasBroken'],
};

const citizenEngineerAlerts: AlertTextMap = {
    success: [
        'reportRequestedByEngineer',
        'Equipment',
        'wasDeliveredToYourWarehouse',
    ],
    failed: ['reportRequestedByEngineer Equipment', 'wasNotDamagedYour'],
    failed_with_broke: ['reportRequestedByEngineer', 'Equipment', 'wasBroken'],
};

export {
    engineerOwnAlerts,
    engineerClientAlerts,
    citizenOwnAlerts,
    citizenEngineerAlerts,
};
