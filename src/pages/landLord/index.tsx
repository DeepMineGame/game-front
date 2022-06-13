import React from 'react';
import { LandLordMenu } from 'features';
import { Header } from 'shared';
import { LandLordCabin } from './LandLordCabin';

export const LandLordPage = () => {
    return (
        <div>
            <Header />
            <LandLordCabin />
            <LandLordMenu />
        </div>
    );
};
