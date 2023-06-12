import { AttrStatus } from 'entities/smartcontract';
import { green6, neutral9, red6 } from '../../ui';

export const colorizeUpgradeStatus = (status?: AttrStatus) => {
    if (status === 'success') {
        return <span style={{ color: green6 }}>{status}</span>;
    }
    if (status === 'failed') {
        return <span style={{ color: red6 }}>{status}</span>;
    }
    if (status === 'failed_with_broke') {
        return <span style={{ color: red6 }}>failed with broke</span>;
    }
    if (status === 'failed') {
        return <span style={{ color: neutral9 }}>{status}</span>;
    }
};
