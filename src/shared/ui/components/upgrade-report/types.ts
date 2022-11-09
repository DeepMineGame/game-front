import { AttrStatus } from 'entities/smartcontract';

export type StatusTypes = Record<AttrStatus, 'success' | 'warning' | 'error'>;
export type AlertTextMap = Record<AttrStatus, string[]>;
